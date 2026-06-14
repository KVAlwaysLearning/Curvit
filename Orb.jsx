import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Orb = ({ hue = 180, saturation = 0.5, brightness = 1.0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Basic THREE.js Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    // Ensure it fills its container
    const updateSize = () => {
      const { clientWidth, clientHeight } = containerRef.current;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    updateSize();
    containerRef.current.appendChild(renderer.domElement);

    // --- Create the Orb (Sphere) ---
    const geometry = new THREE.IcosahedronGeometry(1, 15); // Adjust for smoothness
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(hue / 360, saturation, brightness),
      wireframe: true, // This gives it the "digital" Orb look
      transparent: true,
      opacity: 0.6,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 2.5;

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.001; // Slower rotation
      sphere.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, [hue, saturation, brightness]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }}
    />
  );
};

export default Orb;
