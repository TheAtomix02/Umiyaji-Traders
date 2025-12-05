import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface FabricImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
}

export const FabricImage: React.FC<FabricImageProps> = ({ 
  src, 
  alt, 
  aspectRatio = 'aspect-[3/4]', 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div 
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden bg-brand-charcoal cursor-crosshair ${aspectRatio} ${className}`}
    >
      {/* Base Image */}
      <motion.img 
        src={src} 
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      {/* Zoomed "Fabric" Layer */}
      {/* We use a div with background-image to handle the transform-origin cleanly for zoom */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat pointer-events-none"
        style={{ 
          backgroundImage: `url(${src})`,
          transformOrigin: `${position.x}% ${position.y}%`,
          opacity: isHovered ? 1 : 0
        }}
        animate={{ scale: isHovered ? 2.5 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Micro-texture overlay to simulate fabric weave when zoomed */}
        <div 
            className="absolute inset-0 opacity-40 mix-blend-overlay" 
            style={{ 
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/fabric-of-squares.png")', 
                backgroundSize: '4px 4px' 
            }} 
        />
      </motion.div>

      {/* Vignette / Shadow Overlay to give depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
    </div>
  );
};