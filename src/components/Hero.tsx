import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LuxuryButton } from './LuxuryButton';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
    onExplore?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-transparent text-brand-white">
      
      {/* 1. Content (No extra background canvas here) */}
      <motion.div 
        style={{ y: yContent, opacity }}
        className="relative z-10 flex flex-col items-center text-center w-full px-4 md:px-12"
      >
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-brand-gold text-xs md:text-sm uppercase tracking-[0.4em] mb-4 md:mb-8 font-sans"
        >
            The New Era of Form
        </motion.p>

        {/* Brand Name - Responsive Scaling */}
        <div className="flex flex-col items-center leading-none">
            <motion.h1
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-medium text-brand-white mix-blend-difference"
                style={{ 
                    fontSize: 'clamp(3rem, 14vw, 11rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em'
                }}
            >
                UMIYAJI
            </motion.h1>
            
            <motion.h1
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-medium text-brand-white/90"
                style={{ 
                    fontSize: 'clamp(2rem, 10vw, 8rem)',
                    lineHeight: 1,
                    letterSpacing: '0.15em',
                    marginTop: 'clamp(0.5rem, 2vw, 2rem)'
                }}
            >
                TRADERS
            </motion.h1>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1, duration: 1 }}
           className="mt-16 md:mt-24"
        >
          <LuxuryButton onClick={onExplore}>
             Explore Collection
          </LuxuryButton>
        </motion.div>
      </motion.div>

      {/* 3. Footer Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 w-full px-6 md:px-12 flex justify-between items-end z-10 pointer-events-none"
      >
        <div className="hidden md:block text-xs text-brand-gray font-sans tracking-widest">
            TOKYO • EST 2024
        </div>
        
        <div className="flex flex-col items-center mx-auto md:mx-0">
             <span className="text-[10px] uppercase tracking-widest text-brand-white/40 mb-2">Scroll</span>
             <ArrowDown className="w-4 h-4 text-brand-white/60 animate-bounce" />
        </div>

        <div className="hidden md:block text-xs text-brand-gray font-sans tracking-widest text-right">
            SCULPTING SILENCE
        </div>
      </motion.div>
    </section>
  );
};