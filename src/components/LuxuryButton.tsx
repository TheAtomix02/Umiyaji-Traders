import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LuxuryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'solid' | 'outline';
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({ children, onClick, className = '', variant = 'outline' }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    // Magnetic pull
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold transition-all duration-300 ease-out";
  const variants = {
      solid: "bg-brand-white text-brand-black hover:bg-brand-gold",
      outline: "border border-white/20 text-brand-white hover:border-brand-gold hover:text-brand-gold backdrop-blur-sm"
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className} group overflow-hidden`}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Subtle sheen animation on hover */}
      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-white/5 transition-transform duration-500 ease-in-out pointer-events-none" />
    </motion.button>
  );
};