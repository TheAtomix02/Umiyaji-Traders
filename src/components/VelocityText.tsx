import React, { useRef } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}

export const VelocityText: React.FC<VelocityTextProps> = ({ children, className = '' }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  // Map scroll speed to skew angle
  // fast scroll down -> positive skew
  // fast scroll up -> negative skew
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);
  const scaleY = useTransform(smoothVelocity, [-1000, 1000], [1, 0.95]);

  return (
    <motion.div style={{ skewX, scaleY }} className={className}>
      {children}
    </motion.div>
  );
};