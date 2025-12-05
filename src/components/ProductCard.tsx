import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Plus } from 'lucide-react';
import TiltedCard from './TiltedCard';

interface ProductCardProps {
    product: Product;
    index?: number;
    onClick?: () => void;
    aspectRatio?: string;
    showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
    product, 
    index = 0, 
    onClick, 
    // Switch to 3/4 for a classic, compact luxury portrait ratio
    aspectRatio = "aspect-[3/4]",
    showCategory = true
}) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            // Drastically reduced max-width to 240px for "precious object" feel
            className="group cursor-pointer flex flex-col gap-3 relative w-full max-w-[240px] mx-auto"
            onClick={onClick}
        >
            {/* Image Container using TiltedCard */}
            <div className={`relative w-full ${aspectRatio}`}>
                 <TiltedCard
                    imageSrc={product.image}
                    altText={product.name}
                    captionText={product.name}
                    containerHeight="100%"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={7} // Subtler tilt for elegance
                    scaleOnHover={1.02} // Minimal scaling
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    overlayContent={
                         <div className="w-full h-full relative">
                            {/* New Badge - Minimalist */}
                            {product.isNew && (
                                <div className="absolute top-3 left-3">
                                    <span className="bg-brand-black/90 backdrop-blur text-brand-white text-[8px] uppercase tracking-[0.15em] px-2 py-1 border border-white/10 shadow-sm">
                                        New
                                    </span>
                                </div>
                            )}
                            
                            {/* Quick Add Button - Smaller & cleaner */}
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                                <div className="w-8 h-8 bg-brand-white text-brand-black flex items-center justify-center rounded-full hover:bg-brand-gold transition-colors shadow-lg">
                                    <Plus size={14} strokeWidth={1.5} />
                                </div>
                            </div>
                         </div>
                    }
                 />
            </div>

            {/* Typography Info - High-end minimalist style */}
            <div className="flex flex-col items-start gap-1">
                <div className="flex justify-between w-full items-start">
                    <h3 className="font-sans text-xs uppercase tracking-[0.08em] text-brand-white/90 group-hover:text-brand-gold transition-colors duration-300 pr-2 leading-relaxed">
                        {product.name}
                    </h3>
                    <span className="font-mono text-[10px] text-brand-white/50 shrink-0 mt-[1px]">
                        ${product.price}
                    </span>
                </div>
                {showCategory && (
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gray/40">
                        {product.category}
                    </span>
                )}
            </div>
        </motion.div>
    );
};