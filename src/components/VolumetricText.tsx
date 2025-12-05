import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface VolumetricTextProps {
  text: string;
  className?: string;
}

export const VolumetricText: React.FC<VolumetricTextProps> = ({ text, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  // Rotate entire container based on mouse
  const rotateX = useTransform(mouseYSpring, [0, 1], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const layers = [
    { z: -20, opacity: 0.2, color: '#333' },
    { z: -10, opacity: 0.4, color: '#666' },
    { z: 0, opacity: 1, color: '#F6F4EE' }, // Main
    { z: 10, opacity: 0.4, color: 'rgba(213, 199, 161, 0.5)' },
    { z: 20, opacity: 0.2, color: 'rgba(213, 199, 161, 0.3)' },
  ];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-[1000px] cursor-help ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {layers.map((layer, i) => (
          <h1
            key={i}
            className={`font-display text-3xl sm:text-5xl md:text-7xl lg:text-9xl tracking-widest font-bold absolute top-0 left-0 w-full text-center ${i === 2 ? 'relative' : ''}`}
            style={{
              transform: `translateZ(${layer.z}px)`,
              color: layer.color,
              opacity: layer.opacity,
              textShadow: i === 2 ? '0 0 20px rgba(213, 199, 161, 0.3)' : 'none',
              pointerEvents: 'none'
            }}
          >
            {text}
          </h1>
        ))}
      </motion.div>
    </motion.div>
  );
};