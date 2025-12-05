import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RUNWAY_IMAGES = [
    { src: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800', label: 'Heavyweight Set' },
    { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800', label: 'Vintage Bomber' },
    { src: 'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=800', label: 'Relaxed Denim' },
    { src: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800', label: 'Accessories' },
    { src: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800', label: 'The 400GSM Fit' },
];

export const RunwayScroll: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState(0);
    const [totalHeight, setTotalHeight] = useState('300vh');

    useLayoutEffect(() => {
        const element = contentRef.current;
        if (!element) return;

        const calculateDimensions = () => {
            const totalWidth = element.scrollWidth;
            const vw = window.innerWidth;
            const distance = totalWidth - vw;
            
            setScrollRange(Math.max(0, distance));
            // Height = The full width of the horizontal content.
            // This ensures 1px vertical scroll = 1px horizontal movement.
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
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });
    
    // DIRECT MAPPING: No spring, no smoothing. This locks the content to the scrollbar.
    const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollRange}px`]);

    return (
        <section 
            ref={targetRef} 
            className="relative bg-brand-black"
            style={{ height: totalHeight }}
        >
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div 
                    ref={contentRef}
                    style={{ x }} 
                    className="flex gap-12 px-12 md:px-24 min-w-max items-center will-change-transform"
                >
                    {/* Title Block */}
                    <div className="flex-shrink-0 w-[80vw] md:w-[30vw] flex flex-col justify-center">
                        <h2 className="text-5xl md:text-8xl font-display text-brand-ivory mb-6 tracking-tight">
                            SEASON <br/>
                            <span className="text-brand-gold italic text-3xl md:text-6xl">01 / FOUNDATION</span>
                        </h2>
                        <p className="text-brand-sand/60 max-w-xs leading-relaxed">
                            A study in weight and silhouette. Featuring 400GSM cottons and vintage-washed structures.
                        </p>
                    </div>

                    {/* Images Loop */}
                    {RUNWAY_IMAGES.map((item, i) => (
                        <div key={i} className="relative flex-shrink-0 w-[80vw] md:w-[45vh] aspect-[3/4] group perspective-[1000px]">
                            <div className="w-full h-full overflow-hidden transform transition-transform duration-700 group-hover:rotate-y-12 border border-white/5">
                                <img 
                                    src={item.src} 
                                    alt={item.label}
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <span className="text-brand-gold text-xs uppercase tracking-widest">Look {i+1}</span>
                                    <span className="text-brand-ivory font-display text-lg">{item.label}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End Spacer */}
                    <div className="flex-shrink-0 w-[10vw] flex items-center justify-center">
                         <div className="w-px h-32 bg-brand-gold/30" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};