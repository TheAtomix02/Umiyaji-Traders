import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const InteractiveFabric: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene
        const scene = new THREE.Scene();
        
        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 4;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance" 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Geometry: Dense plane for smooth waves
        const geometry = new THREE.PlaneGeometry(12, 12, 128, 128);

        // Shader: Dark Glossy Liquid
        const vertexShader = `
            uniform float uTime;
            uniform vec2 uMouse;
            varying vec2 vUv;
            varying float vElevation;
            varying vec3 vNormal;

            // Simple noise function
            float random (in vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            // 2D Noise
            float noise (in vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);

                // Four corners in 2D of a tile
                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));

                vec2 u = f * f * (3.0 - 2.0 * f);

                return mix(a, b, u.x) +
                        (c - a)* u.y * (1.0 - u.x) +
                        (d - b) * u.x * u.y;
            }

            void main() {
                vUv = uv;
                vec3 pos = position;

                // Large rolling waves
                float bigWave = sin(pos.x * 0.5 + uTime * 0.5) * sin(pos.y * 0.5 + uTime * 0.4) * 1.5;
                
                // Smaller details
                float detailWave = noise(pos.xy * 2.0 + uTime) * 0.2;

                // Mouse interaction (repulsion/ripple)
                float dist = distance(uv, uMouse);
                float mouseEffect = smoothstep(0.4, 0.0, dist) * 1.0;
                
                // Combine
                pos.z += bigWave + detailWave - mouseEffect;

                vElevation = pos.z;
                
                // Approximate normal for lighting in fragment shader
                vNormal = normalize(vec3(pos.x, pos.y, pos.z - 0.1));

                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            varying vec2 vUv;
            varying float vElevation;
            varying vec3 vNormal;

            void main() {
                // Base colors
                vec3 black = vec3(0.02, 0.02, 0.02);
                vec3 darkGrey = vec3(0.1, 0.1, 0.12);
                vec3 highlight = vec3(0.8, 0.8, 0.9); // Cold white specular
                
                // Light source direction
                vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0));
                
                // Fake lighting calculation based on elevation derivative or normal approximation
                // Since we don't have perfect normals from vertex shader without more math, 
                // we use vElevation to fake "slopes"
                
                float mixStrength = (vElevation + 1.5) * 0.3;
                vec3 color = mix(black, darkGrey, mixStrength);
                
                // Specular highlight (fake reflection)
                // We create bands of light based on elevation
                float specular = smoothstep(0.48, 0.52, sin(vElevation * 5.0 + uTime));
                specular += smoothstep(0.4, 0.6, vElevation) * 0.2;
                
                // Rim light effect
                float rim = 1.0 - vUv.y;
                
                color += highlight * specular * 0.15;
                color += vec3(0.0, 0.0, 0.05) * rim; // Subtle blue tint at bottom

                // Vignette
                float dist = distance(vUv, vec2(0.5));
                color *= smoothstep(0.8, 0.2, dist);

                gl_FragColor = vec4(color, 1.0);
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) }
            },
            side: THREE.DoubleSide,
            wireframe: false
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -0.2; // Tilt back slightly
        scene.add(mesh);

        // Interaction
        const mouse = new THREE.Vector2(0.5, 0.5);
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX / window.innerWidth;
            mouse.y = 1.0 - (e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        const clock = new THREE.Clock();
        const animate = () => {
            const t = clock.getElapsedTime();
            material.uniforms.uTime.value = t * 0.5; // Slow, elegant speed
            material.uniforms.uMouse.value.lerp(mouse, 0.05);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if(mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="fixed inset-0 z-0" />;
};