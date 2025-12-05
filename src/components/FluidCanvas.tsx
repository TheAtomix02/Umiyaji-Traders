import React, { useRef, useEffect } from 'react';

export const FluidCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setSize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    setSize();

    // Configuration
    const cols = width < 768 ? 25 : 45; // Grid density
    const rows = width < 768 ? 25 : 40;
    const spacing = width < 768 ? 40 : 50; // World units spacing
    const fov = 1000;
    
    // State
    let tick = 0;
    const mouse = { x: -1000, y: -1000 };
    
    class Point {
        x: number;
        y: number; // Height
        z: number;
        ox: number; // Original positions
        oz: number;
        vx: number = 0;
        vy: number = 0; // Vertical velocity (ripple effect)
        vz: number = 0;

        constructor(x: number, z: number) {
            this.x = x;
            this.y = 0;
            this.z = z;
            this.ox = x;
            this.oz = z;
        }

        update() {
            // 1. Natural Ambient Wave (Breathing fabric)
            const waveX = Math.sin(this.ox * 0.008 + tick * 0.015) * 15;
            const waveZ = Math.cos(this.oz * 0.008 + tick * 0.01) * 15;
            const targetY = waveX + waveZ;

            // 2. Physics: Spring force towards targetY
            const forceY = (targetY - this.y) * 0.025; // Stiffness
            this.vy += forceY;
            this.vy *= 0.92; // Damping/Friction
            this.y += this.vy;
        }
    }

    // Initialize Grid centered at 0,0
    const points: Point[] = [];
    const offsetX = (cols * spacing) / 2;
    const offsetZ = (rows * spacing) / 2;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = (i * spacing) - offsetX;
            const z = (j * spacing) - offsetZ; 
            points.push(new Point(x, z));
        }
    }

    // Storage for projected points to avoid re-calculation during line drawing
    interface ProjectedPoint {
        x: number;
        y: number;
        scale: number;
        visible: boolean;
    }
    const projected: ProjectedPoint[] = new Array(points.length);

    const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        
        tick++;

        // Slowly rotate the entire grid
        const angleY = tick * 0.0008; 
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        // UPDATE & PROJECT
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            
            // Interaction: Check approximate 2D distance *before* full physics for efficiency
            // We approximate by using the previous frame's 2D position or raw 3D coords offset
            // Better: Do it post-projection? No, physics needs to happen before projection.
            // Let's do a raw radial check in 2D screen space after we calculate the projected coords.
            
            p.update();

            // Rotate around Y axis
            const rx = p.x * cosY - p.z * sinY;
            const rz = p.z * cosY + p.x * sinY;
            
            // Camera transform
            const cx = rx;
            const cy = p.y - 150; // Move grid down relative to camera (camera moves up)
            const cz = rz + 1200; // Push grid away

            // Projection
            // If behind camera, skip
            if (cz < 10) {
                projected[i] = { x: 0, y: 0, scale: 0, visible: false };
                continue;
            }

            const scale = fov / (fov + cz);
            const projX = cx * scale + width / 2;
            const projY = cy * scale + height / 2;

            // MOUSE INTERACTION
            // Calculate distance in screen space
            const dx = mouse.x - projX;
            const dy = mouse.y - projY;
            const distSq = dx*dx + dy*dy;
            
            // Interaction Radius: 150px
            if (distSq < 22500) { 
                const dist = Math.sqrt(distSq);
                const force = (150 - dist) / 150;
                // Push points down/away based on mouse velocity would be better, 
                // but simple repulsion is good.
                // We add to velocity to create a ripple
                p.vy += force * 8; 
            }

            projected[i] = { x: projX, y: projY, scale, visible: true };
        }

        // RENDER LINES (The Mesh)
        // We draw lines first so dots can sit on top (optional)
        ctx.lineWidth = 1;
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const idx = i * rows + j;
                const p1 = projected[idx];
                
                if (!p1.visible) continue;

                const alpha = Math.max(0, Math.min(1, p1.scale * 0.5)); // Distance fade
                
                // Right Neighbor
                if (i < cols - 1) {
                    const idxRight = (i + 1) * rows + j;
                    const p2 = projected[idxRight];
                    if (p2.visible) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(213, 199, 161, ${alpha * 0.4})`; // Fainter lines
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Bottom Neighbor
                if (j < rows - 1) {
                    const idxBottom = i * rows + (j + 1);
                    const p2 = projected[idxBottom];
                    if (p2.visible) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(213, 199, 161, ${alpha * 0.4})`;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
        }

        // RENDER DOTS (Nodes)
        for (let i = 0; i < projected.length; i++) {
            const p = projected[i];
            if (!p.visible) continue;

            const alpha = Math.max(0, Math.min(1, p.scale));
            // Size oscillates slightly with the wave for twinkling effect
            const size = Math.max(0.5, 1.8 * p.scale); 

            ctx.beginPath();
            ctx.fillStyle = `rgba(213, 199, 161, ${alpha})`;
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(animate);
    };

    const handleResize = () => {
        setSize();
        // Reset points on resize to avoid glitching
        points.length = 0;
        const newCols = width < 768 ? 25 : 45;
        const newRows = width < 768 ? 25 : 40;
        const newSpacing = width < 768 ? 40 : 50;
        const newOffsetX = (newCols * newSpacing) / 2;
        const newOffsetZ = (newRows * newSpacing) / 2;
        
        for (let i = 0; i < newCols; i++) {
            for (let j = 0; j < newRows; j++) {
                const x = (i * newSpacing) - newOffsetX;
                const z = (j * newSpacing) - newOffsetZ; 
                points.push(new Point(x, z));
            }
        }
        // Resize projected array
        projected.length = points.length;
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[0] bg-brand-black" />;
};