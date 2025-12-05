import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { FabricImage } from './FabricImage';
import { GoldText } from './GoldText';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
    onAddToCart: (product: Product, size: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
    // Don't render if no product
    if (!product) return null;

    return (
        <AnimatePresence>
            {product && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-brand-black/90 backdrop-blur-xl" 
                        onClick={onClose}
                    />
                    
                    {/* Modal Content */}
                    <motion.div
                        layoutId={`product-${product.id}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-brand-black border border-brand-gold/10 overflow-hidden flex flex-col md:flex-row shadow-2xl z-[101]"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-brand-black/50 backdrop-blur-md rounded-full text-brand-ivory hover:bg-brand-gold hover:text-brand-black transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Side - Fixed height on mobile, full height on desktop */}
                        <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative shrink-0">
                            <FabricImage 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full"
                                aspectRatio="h-full"
                            />
                            <div className="absolute bottom-6 left-6 pointer-events-none">
                                <span className="bg-brand-gold text-brand-black px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        {/* Content Side - Scrollable */}
                        <div className="w-full md:w-1/2 flex-1 md:h-auto overflow-y-auto p-6 md:p-12 lg:p-16 bg-brand-black">
                            <GoldText text={product.name} size="md" className="mb-2" />
                            <p className="text-2xl md:text-3xl text-brand-ivory font-sans font-light mb-8">${product.price}</p>
                            
                            <div className="space-y-8 mb-12">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-brand-sand/50 mb-3">Description</h4>
                                    <p className="text-brand-sand/80 leading-relaxed font-light text-sm md:text-base">
                                        Crafted with an obsession for detail. This piece embodies the Umiya Ji Traders philosophy of silence and structure. 
                                        The fabric interacts with light to create a constantly shifting visual depth.
                                    </p>
                                </div>
                                
                                {product.details && (
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-brand-sand/50 mb-3">Details</h4>
                                        <ul className="grid grid-cols-2 gap-2">
                                            {product.details.map((detail, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-brand-sand">
                                                    <div className="w-1 h-1 bg-brand-gold rounded-full shrink-0" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-brand-sand/50 mb-4">Size</h4>
                                    <div className="flex gap-3 flex-wrap">
                                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                            <button 
                                                key={size}
                                                className="w-12 h-12 border border-white/20 hover:border-brand-gold hover:text-brand-gold transition-colors flex items-center justify-center text-sm font-mono focus:bg-brand-gold focus:text-brand-black"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => onAddToCart(product, 'M')}
                                    className="w-full py-4 bg-brand-ivory text-brand-black uppercase tracking-[0.25em] font-bold hover:bg-brand-gold transition-colors flex items-center justify-center gap-4 group"
                                >
                                    Add to Cart
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};