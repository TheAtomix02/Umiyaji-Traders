import React from 'react';
import { motion } from 'framer-motion';
import { GoldText } from '../components/GoldText';
import { PRODUCTS } from '../data';

// Configuration for the best product from each section
const LOOK_CONFIG = [
    { 
        id: 'j1', // Jackets
        title_override: 'The Racer',
        description: "The armor of the vanguard. Full grain leather that ages with every wear, telling the story of the road taken.", 
        usp: "Full Grain Leather • Hand Distressed • Heavy Zippers" 
    },
    { 
        id: 'h1', // Hoodies
        title_override: 'Acid Form',
        description: "The cornerstone of the brutalist wardrobe. A silhouette forged in acid wash and heavy cotton for absolute presence.", 
        usp: "500GSM French Terry • Distressed Hardware • Oversized Drop" 
    },
    { 
        id: 't1', // Trousers
        title_override: 'Pleated Volume',
        description: "Formal wear deconstructed for the modern street. Flowing, elegant, and uncompromising in its drape.", 
        usp: "Virgin Wool Blend • Double Pleated • Cropped Hem" 
    },
    { 
        id: 'c1', // Cargos
        title_override: 'Tactical Utility',
        description: "Functionality meets avant-garde form. Engineered with technical fabrics to withstand the urban environment.", 
        usp: "Tech Fabric • Multi-Pocket System • Water Repellent" 
    },
    { 
        id: 'p1', // Tops
        title_override: 'Noir Knit',
        description: "A study in texture. Soft merino wool contrasting against the harsh concrete city.", 
        usp: "Merino Wool Blend • Open Collar • Slim Profile" 
    },
    { 
        id: 'd1', // Denim
        title_override: 'Raw Selvedge',
        description: "Japanese craftsmanship at its peak. Denim that carries the history of its weave, stiff and ready to break in.", 
        usp: "14oz Japanese Denim • Redline Selvedge • Unwashed" 
    },
    { 
        id: 's3', // Sweatshirts
        title_override: 'Structured Grey',
        description: "Architectural silence. A piece that speaks through its structure rather than its branding.", 
        usp: "Bonded Hems • Heavyweight Fleece • Minimalist" 
    },
];

export const Lookbook: React.FC = () => {
    // Merge config with actual product data
    const looks = LOOK_CONFIG.map(config => {
        const product = PRODUCTS.find(p => p.id === config.id);
        if (!product) return null;
        return {
            ...config,
            image: product.image,
            price: product.price,
            name: product.name
        };
    }).filter(Boolean);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-brand-black overflow-hidden">
            <header className="mb-32 text-center px-6">
                <span className="text-brand-gold text-xs uppercase tracking-widest mb-4 block">Editorial</span>
                <div className="flex justify-center">
                    <GoldText text="ESSENTIALS" size="lg" />
                </div>
                <p className="text-brand-gray max-w-xl mx-auto leading-relaxed font-light mt-8">
                    A curated selection of our finest silhouettes. 
                    Each piece represents the pinnacle of its category.
                </p>
            </header>

            <div className="max-w-6xl mx-auto px-6 space-y-40">
                {looks.map((item, idx) => {
                    if (!item) return null;
                    const isEven = idx % 2 === 0;
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ 
                                opacity: 0, 
                                y: 50
                            }}
                            whileInView={{ 
                                opacity: 1, 
                                y: 0
                            }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ 
                                duration: 1, 
                                ease: [0.16, 1, 0.3, 1] 
                            }}
                            className={`flex flex-col md:flex-row items-center gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Image Container */}
                            <div className="relative w-full md:w-1/2 aspect-[3/4] group">
                                <div className="absolute -inset-4 border border-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-95 group-hover:scale-100" />
                                
                                <motion.div className="w-full h-full overflow-hidden bg-brand-charcoal relative z-10">
                                     <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-cinema group-hover:scale-110" 
                                    />
                                    {/* Vignette */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
                                </motion.div>
                                
                                {/* Number */}
                                <div className={`absolute -top-12 ${isEven ? '-left-12' : '-right-12'} z-20 pointer-events-none`}>
                                    <span className="text-[120px] font-serif text-white/5 leading-none">0{idx + 1}</span>
                                </div>
                            </div>

                            {/* Text Container */}
                            <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'} text-center md:text-left`}>
                                <div className="mb-6 inline-block">
                                    <span className="text-brand-gold text-[10px] uppercase tracking-[0.3em] border-b border-brand-gold pb-1">
                                        {item.name}
                                    </span>
                                </div>
                                
                                <h2 className="text-4xl md:text-5xl font-display text-brand-ivory mb-6 tracking-wide">
                                    {item.title_override}
                                </h2>
                                
                                <p className="text-brand-gray leading-loose mb-8 text-sm md:text-base font-light">
                                    {item.description}
                                </p>

                                {/* USP Box */}
                                <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-sm relative overflow-hidden group/usp">
                                    <div className="absolute inset-0 bg-brand-gold/10 translate-y-full group-hover/usp:translate-y-0 transition-transform duration-500 ease-out" />
                                    <h4 className="text-xs uppercase tracking-widest text-brand-ivory mb-2 relative z-10">Key Features</h4>
                                    <p className="text-brand-gold text-xs uppercase tracking-wider font-mono relative z-10">
                                        {item.usp}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};