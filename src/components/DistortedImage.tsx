import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DistortedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const DistortedImage: React.FC<DistortedImageProps> = ({ src, alt, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Random ID to prevent filter conflicts if multiple images
  const filterId = `noise-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div 
        className={`relative overflow-hidden ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence 
                type="fractalNoise" 
                baseFrequency={isHovered ? "0.01 0.04" : "0 0"} 
                numOctaves="1" 
                result="warp" 
            >
                <animate 
                    attributeName="baseFrequency" 
                    from="0 0" 
                    to="0.01 0.04" 
                    dur="0.4s" 
                    begin={isHovered ? "indefinite" : "0s"} 
                />
            </feTurbulence>
            <feDisplacementMap 
                xChannelSelector="R" 
                yChannelSelector="G" 
                scale={isHovered ? "20" : "0"} 
                in="SourceGraphic" 
                in2="warp" 
            />
          </filter>
        </defs>
      </svg>

      <motion.img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        style={{ filter: `url(#${filterId})` }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      
      {/* Gloss overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
    </div>
  );
};