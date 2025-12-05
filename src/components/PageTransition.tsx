import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-brand-black z-[60] pointer-events-none origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="fixed inset-0 bg-brand-black z-[60] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />
      {children}
    </>
  );
};