import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Background3D.css';

const Background3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Create particles with different sizes and colors
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 3000;
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);
        const sizeArray = new Float32Array(particlesCount);

        for(let i = 0; i < particlesCount * 3; i += 3) {
            // Position
            posArray[i] = (Math.random() - 0.5) * 5;
            posArray[i + 1] = (Math.random() - 0.5) * 5;
            posArray[i + 2] = (Math.random() - 0.5) * 5;

            // Color
            const color = new THREE.Color();
            color.setHSL(Math.random(), 0.8, 0.6);
            colorArray[i] = color.r;
            colorArray[i + 1] = color.g;
            colorArray[i + 2] = color.b;

            // Size
            sizeArray[i / 3] = Math.random() * 0.02 + 0.01;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
        particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

        // Create material with improved settings
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        // Create mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Camera position
        camera.position.z = 3;

        // Mouse movement effect with smoother response
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            targetRotationX = mouseY * 0.1;
            targetRotationY = mouseX * 0.1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation with smooth transitions
        const animate = () => {
            requestAnimationFrame(animate);

            // Smooth rotation transitions
            particlesMesh.rotation.x += (targetRotationX - particlesMesh.rotation.x) * 0.05;
            particlesMesh.rotation.y += (targetRotationY - particlesMesh.rotation.y) * 0.05;

            // Add subtle automatic rotation
            particlesMesh.rotation.x += 0.0003;
            particlesMesh.rotation.y += 0.0003;

            // Add pulsing effect to particles
            const time = Date.now() * 0.001;
            particlesMaterial.opacity = 0.5 + Math.sin(time) * 0.2;

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize with debounce
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
            scene.remove(particlesMesh);
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return <div ref={mountRef} className="background-3d" />;
};

export default Background3D; 