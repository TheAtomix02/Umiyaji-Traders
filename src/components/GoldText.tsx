import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface GoldTextProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const GoldText: React.FC<GoldTextProps> = ({ text, className = '', size = 'lg' }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth out the mouse movement for a "heavy" liquid gold feel
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  // Create a dynamic gradient based on mouse position
  // This simulates light moving across a metallic surface
  const background = useMotionTemplate`linear-gradient(
    ${smoothX.get() * 360}deg, 
    #8A7340 0%, 
    #D5C7A1 25%, 
    #FFF8E7 50%, 
    #D5C7A1 75%, 
    #8A7340 100%
  )`;

  const textSize = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-2xl tracking-[0.1em]',
    lg: 'text-4xl md:text-6xl tracking-widest',
    xl: 'text-5xl md:text-8xl lg:text-9xl tracking-widest'
  }[size];

  return (
    <motion.h1
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative font-display font-bold text-transparent bg-clip-text select-none group ${textSize} ${className}`}
      style={{ backgroundImage: background, backgroundSize: '200% auto' }}
    >
      {text}
      
      {/* 3D Depth Shadow Layer (simulates the dark side of the gold bevel) */}
      <span className="absolute top-[1px] left-[1px] -z-10 text-brand-black/50 mix-blend-multiply blur-[1px]">
        {text}
      </span>
      
      {/* Ambient Glow */}
      <motion.div 
        className="absolute inset-0 blur-2xl bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />
    </motion.h1>
  );
};