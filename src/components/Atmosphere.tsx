import React from 'react';
import { motion } from 'framer-motion';

export const Atmosphere: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {/* 1. Film Grain (SVG Noise) */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay">
        <svg className='w-full h-full'>
            <filter id='noise'>
                <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch' />
            </filter>
            <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
      </div>

      {/* 2. Vignette (Focus attention to center) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,12,15,0.4)_100%)]" />

      {/* 3. Luxury Dust Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-brand-gold/30 blur-[1px]"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -120],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15, // Very slow
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};