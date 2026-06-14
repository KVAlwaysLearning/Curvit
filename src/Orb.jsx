import { Mesh, Program, Renderer, Geometry, Vec3 } from 'ogl';
import { useEffect, useRef } from 'react';
import './Orb.css';

export default function Orb({
  hue = 0, hoverIntensity = 0.2, rotateOnHover = true, 
  forceHoverState = false, backgroundColor = '#000000'
}) {
  const ctnDom = useRef(null);

  const vert = `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
  `;

  const frag = `
    precision highp float;
    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    uniform vec3 backgroundColor;
    varying vec2 vUv;

    // ... (Keep your helper functions: rgb2yiq, yiq2rgb, adjustHue, hash33, snoise3, extractAlpha, light1, light2, draw)
    // ADDED: Simplified draw function logic for clarity
    
    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord - center) / size * 2.0;
      
      // Rotation
      float s = sin(rot), c = cos(rot);
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
      
      // DISTORTION LOGIC: Applies hover-based warping
      float dist = length(uv);
      uv += uv * hover * hoverIntensity * sin(dist * 8.0 - iTime * 2.0);
      
      return draw(uv); // Ensure your existing draw() is here
    }

    void main() {
      vec4 col = mainImage(vUv * iResolution.xy);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `;

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(1, 1, 1) },
        hue: { value: hue }, hover: { value: 0 }, rot: { value: 0 },
        hoverIntensity: { value: hoverIntensity },
        backgroundColor: { value: hexToVec3(backgroundColor) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const w = container.clientWidth, h = container.clientHeight;
      renderer.setSize(w * window.devicePixelRatio, h * window.devicePixelRatio);
      program.uniforms.iResolution.value.set(w, h, w / h);
    }

    window.addEventListener('resize', resize);
    resize();

    let targetHover = 0, currentRot = 0;
    const handleMove = e => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (Math.min(rect.width, rect.height) / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (Math.min(rect.width, rect.height) / 2);
      targetHover = (Math.sqrt(x * x + y * y) < 0.8) ? 1 : 0;
    };

    container.addEventListener('mousemove', handleMove);
    
    let rafId;
    const update = t => {
      rafId = requestAnimationFrame(update);
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hover.value += ((forceHoverState ? 1 : targetHover) - program.uniforms.hover.value) * 0.1;
      if (rotateOnHover && targetHover > 0.5) currentRot += 0.01;
      program.uniforms.rot.value = currentRot;
      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);

    return () => { 
        cancelAnimationFrame(rafId); 
        window.removeEventListener('resize', resize);
        container.removeChild(gl.canvas); 
    };
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState, backgroundColor]);

  return <div ref={ctnDom} className="orb-container" />;
}

function hexToVec3(c) { return new Vec3(parseInt(c.slice(1,3),16)/255, parseInt(c.slice(3,5),16)/255, parseInt(c.slice(5,7),16)/255); }
