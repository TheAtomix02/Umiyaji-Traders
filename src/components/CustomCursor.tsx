import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Tighter spring for a more responsive, precision feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') || 
          target.closest('a') || 
          target.classList.contains('cursor-hover') ||
          window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* 1. Precision Center (Exact Mouse Position) */}
      <motion.div
        className="fixed top-0 left-0 bg-white pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
          rotate: 45, // Constant diamond shape for precision
        }}
      />

      {/* 2. Fluid Follower (Reticle) */}
      <motion.div 
        className="fixed top-0 left-0 border-[1px] border-white pointer-events-none z-[9999] mix-blend-difference"
        style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
        }}
        animate={{
            width: isHovering ? 40 : 20,
            height: isHovering ? 40 : 20,
            // Default: Circle (0 deg), Hover: Diamond (45 deg)
            rotate: isHovering ? 45 : 0, 
            scale: isClicking ? 0.8 : 1,
            // Default: Circle (50%), Hover: Sharp Square (0%)
            borderRadius: isHovering ? '0%' : '50%',
            borderWidth: isHovering ? '1px' : '1px',
            opacity: isHovering ? 1 : 0.6
        }}
        transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            borderRadius: { duration: 0.3 } // Smooth morph
        }}
      >
          {/* Inner corners for tech feel on hover */}
          {isHovering && (
             <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-[-1px] left-[-1px] w-2 h-2 border-t border-l border-white" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-[-1px] right-[-1px] w-2 h-2 border-t border-r border-white" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-[-1px] left-[-1px] w-2 h-2 border-b border-l border-white" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b border-r border-white" />
             </>
          )}
      </motion.div>
      
      {/* 3. Crosshair Accents (Only visible on hover) */}
      <motion.div
         className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
         style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
         }}
      >
         {/* Horizontal Hair */}
         <motion.div 
            className="absolute h-[1px] bg-white"
            animate={{ width: isHovering ? 16 : 0, opacity: isHovering ? 0.8 : 0 }}
         />
         {/* Vertical Hair */}
         <motion.div 
            className="absolute w-[1px] bg-white"
            animate={{ height: isHovering ? 16 : 0, opacity: isHovering ? 0.8 : 0 }}
         />
      </motion.div>
    </>
  );
};