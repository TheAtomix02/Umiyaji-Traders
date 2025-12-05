import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface HorizontalScrollSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  onProductClick: (p: Product) => void;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ title, subtitle, products, onProductClick }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [totalHeight, setTotalHeight] = useState('300vh');

  useLayoutEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) return;

    const calculateDimensions = () => {
        const totalWidth = element.scrollWidth;
        const vw = window.innerWidth;
        const distance = Math.max(0, totalWidth - vw);
        
        setScrollRange(distance);
        setTotalHeight(`${totalWidth}px`);
    };

    calculateDimensions();

    const resizeObserver = new ResizeObserver(() => calculateDimensions());
    resizeObserver.observe(element);
    window.addEventListener('resize', calculateDimensions);

    return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', calculateDimensions);
    };
  }, [products]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // DIRECT MAPPING: No spring. This locks the content to the scrollbar.
  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollRange}px`]);

  return (
    <section 
        ref={targetRef} 
        className="relative bg-transparent"
        style={{ height: totalHeight }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden w-full">
        <motion.div 
            ref={scrollContainerRef}
            style={{ x }} 
            className="flex items-center h-full min-w-max px-6 md:px-24 gap-12 md:gap-24 will-change-transform"
        >
             {/* Intro Text Block */}
             <div className="w-[80vw] md:w-[500px] shrink-0 flex flex-col justify-center">
                <span className="text-brand-gold text-xs uppercase tracking-[0.3em] block mb-6 font-bold">
                    Collection 02
                </span>
                <h2 className="text-5xl md:text-8xl font-serif text-brand-white mb-6 leading-[0.9]">
                    {title}
                </h2>
                <p className="text-brand-white/60 text-sm md:text-base font-light leading-relaxed max-w-sm">
                    {subtitle}
                </p>
                <div className="mt-8 h-px w-16 bg-brand-gold/50" />
                
                <div className="mt-12 flex items-center gap-4 opacity-50">
                    <div className="w-12 h-px bg-white" />
                    <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                </div>
            </div>

            {/* Product Cards */}
            {products.map((product, i) => (
                <div key={product.id} className="w-[80vw] md:w-[35vw] lg:w-[25vw] shrink-0 group relative">
                    {/* Background Numbering */}
                    <div className="absolute -top-20 -left-10 z-0 pointer-events-none select-none overflow-hidden">
                        <span className="block text-[150px] font-serif text-white/5 leading-none translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-luxury">
                            0{i+1}
                        </span>
                    </div>
                    
                    <div className="relative z-10">
                        <ProductCard 
                                product={product} 
                                onClick={() => onProductClick(product)} 
                                index={i} 
                                aspectRatio="aspect-[3/4]" 
                                showCategory={true}
                        />
                    </div>
                </div>
            ))}

            {/* End Spacer */}
            <div className="w-[10vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
};