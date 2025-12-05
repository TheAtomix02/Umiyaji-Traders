import React from 'react';
import { motion } from 'framer-motion';

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-10 py-4 group overflow-visible ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 3D Bevel Border */}
      <div className="absolute inset-0 border border-brand-gold/30 rounded-sm" />
      <div className="absolute inset-[1px] border border-brand-ivory/10 rounded-sm" />
      
      {/* Background Fill Container */}
      <div className="absolute inset-0 overflow-hidden rounded-sm bg-brand-black/50 backdrop-blur-sm">
          {/* Liquid Gold Fill */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-antique to-brand-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          
          {/* Specular Highlight Sheen */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-sheen pointer-events-none" />
      </div>

      <span className="relative z-10 text-xs uppercase tracking-[0.25em] font-bold text-brand-ivory group-hover:text-brand-black transition-colors duration-300">
        {children}
      </span>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-gold opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-gold opacity-50 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
};