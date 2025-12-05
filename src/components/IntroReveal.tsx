import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroRevealProps {
  onComplete: () => void;
}

export const IntroReveal: React.FC<IntroRevealProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'closed' | 'opening' | 'finished'>('closed');

  // Pure White Velvet / Draped Fabric Texture
  const FABRIC_TEXTURE = "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=2000"; 

  useEffect(() => {
    // 1. Hold closed for dramatic effect (Spotlight phase)
    const openTimer = setTimeout(() => {
      setStage('opening');
    }, 2500);

    // 2. Animation duration + Buffer
    const completeTimer = setTimeout(() => {
      setStage('finished');
      onComplete();
    }, 5500); 

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (stage === 'finished') return null;

  // Helper for the volumetric folds to ensure identical look on both sides
  const FoldOverlay = () => (
    <div 
        className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
        style={{
            // Tighter gradient for "More Curves"
            background: `repeating-linear-gradient(90deg, 
                rgba(180,180,180, 1) 0%, 
                rgba(255,255,255, 1) 6%, 
                rgba(160,160,160, 1) 12%, 
                rgba(255,255,255, 1) 18%, 
                rgba(180,180,180, 1) 24%
            )`
        }}
    />
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-transparent perspective-[1200px] pointer-events-none">
      
      {/* --- LEFT CURTAIN --- */}
      <motion.div
        initial={{ x: '0%' }}
        animate={stage === 'opening' ? { 
            x: '-100%', 
            transition: { 
                duration: 2.8, 
                ease: [0.65, 0, 0.35, 1] 
            }
        } : {}}
        className="absolute left-0 top-0 bottom-0 w-[50%] z-20"
      >
        <motion.div 
            className="w-full h-full relative origin-left"
            animate={stage === 'opening' ? { 
                scaleX: 0.9, 
                skewY: 2,   // Drag effect 
            } : {}}
            transition={{ duration: 2.8, ease: "easeInOut" }}
        >
             {/* 1. Real Image Texture (White) */}
             <div 
                className="absolute inset-0 bg-cover bg-left"
                style={{ backgroundImage: `url(${FABRIC_TEXTURE})` }}
             />
             
             {/* 2. Volumetric Shadows (The Folds) */}
             <FoldOverlay />

             {/* 3. Gold Hem Detail */}
             <div className="absolute bottom-10 left-0 right-0 h-[3px] bg-brand-gold/80 shadow-[0_2px_15px_rgba(200,169,126,0.4)]" />
             
             {/* 4. Depth Shadow at the meeting edge */}
             <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black/10 to-transparent" />
        </motion.div>
      </motion.div>


      {/* --- RIGHT CURTAIN --- */}
      <motion.div
        initial={{ x: '0%' }}
        animate={stage === 'opening' ? { 
            x: '100%', 
            transition: { 
                duration: 2.8, 
                ease: [0.65, 0, 0.35, 1] 
            }
        } : {}}
        className="absolute right-0 top-0 bottom-0 w-[50%] z-20"
      >
         <motion.div 
            className="w-full h-full relative origin-right"
            animate={stage === 'opening' ? { 
                scaleX: 0.9, 
                skewY: -2,
            } : {}}
            transition={{ duration: 2.8, ease: "easeInOut" }}
        >
             {/* 1. Real Image Texture (White) */}
             <div 
                className="absolute inset-0 bg-cover bg-right"
                style={{ backgroundImage: `url(${FABRIC_TEXTURE})` }}
             />

             {/* 2. Volumetric Shadows (The Folds) */}
             <FoldOverlay />

             {/* 3. Gold Hem Detail */}
             <div className="absolute bottom-10 left-0 right-0 h-[3px] bg-brand-gold/80 shadow-[0_2px_15px_rgba(200,169,126,0.4)]" />

             {/* 4. Depth Shadow at the meeting edge */}
             <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black/10 to-transparent" />
        </motion.div>
      </motion.div>


      {/* --- CENTER GAP LIGHT --- */}
      <motion.div 
         animate={stage === 'opening' ? { opacity: 0 } : { opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
      >
         {/* Subtle dark seam for white curtains */}
         <div className="w-[1px] h-full bg-black/20" />
      </motion.div>


      {/* --- BRANDING & SPOTLIGHT --- */}
      <AnimatePresence>
        {stage === 'closed' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            transition={{ duration: 1.5 }}
            className="absolute z-40 flex flex-col items-center justify-center"
          >
             {/* Soft Glow behind text to ensure readability on texture */}
             <div className="w-[500px] h-[500px] rounded-full bg-white/60 blur-[60px] absolute" />
             
             {/* Brand Logo - Dark for contrast on White */}
             <motion.div
                initial={{ opacity: 0, y: 20, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="relative z-50 text-brand-black text-xl md:text-3xl uppercase font-display font-bold tracking-[0.2em]"
             >
                Umiyaji Traders
             </motion.div>
             
             <motion.div
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="h-[2px] bg-brand-gold mt-6 relative z-50"
             />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};