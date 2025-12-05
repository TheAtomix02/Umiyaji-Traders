import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticGlitchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MagneticGlitchButton: React.FC<MagneticGlitchButtonProps> = ({ children, onClick, className = '' }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.5, y: y * 0.5 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative group px-12 py-6 bg-transparent overflow-visible ${className}`}
    >
        {/* Background Shapes */}
        <div className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm border border-brand-ivory/20 skew-x-[-10deg] transition-all duration-300 group-hover:bg-brand-gold/10 group-hover:border-brand-gold" />
        
        {/* Glitch Layers (Visible on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 mix-blend-screen pointer-events-none">
             <span className="text-brand-gold font-cyber font-bold tracking-[0.3em] uppercase absolute translate-x-[2px] animate-glitch skew-x-[-10deg]">{children}</span>
             <span className="text-cyan-500 font-cyber font-bold tracking-[0.3em] uppercase absolute -translate-x-[2px] animate-glitch delay-75 skew-x-[-10deg]">{children}</span>
        </div>

        {/* Main Text */}
        <span className="relative z-10 text-brand-ivory font-cyber font-bold tracking-[0.3em] uppercase group-hover:opacity-0 transition-opacity duration-100 block skew-x-[-10deg]">
            {children}
        </span>
        
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-gold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-gold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />

    </motion.button>
  );
};