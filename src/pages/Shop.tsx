import React, { useState } from 'react';
import { PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldText } from '../components/GoldText';
import { ProductCard } from '../components/ProductCard';
import { VelocityText } from '../components/VelocityText';
import { Product } from '../types';

interface ShopProps {
    onProductClick: (product: Product) => void;
}

export const Shop: React.FC<ShopProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Hoodies', 'Sweatshirts', 'Trousers', 'Cargos', 'Denim', 'Tops', 'Jackets'];

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center flex flex-col items-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
               <GoldText text="THE COLLECTION" size="lg" />
            </motion.div>
            <VelocityText className="mt-4">
                <p className="text-brand-gray text-sm uppercase tracking-[0.2em]">
                    Premium Essentials / Heavyweight Cotton / Vintage Leather
                </p>
            </VelocityText>
        </header>

        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-8 mb-20 text-xs uppercase tracking-widest text-brand-gray border-b border-white/10 pb-6">
            {categories.map(cat => (
                <span 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`cursor-pointer transition-colors relative group py-2 ${activeCategory === cat ? 'text-brand-gold font-bold' : 'hover:text-brand-ivory'}`}
                >
                    {cat}
                    <span className={`absolute bottom-0 left-0 h-[1px] bg-brand-gold transition-all duration-300 ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </span>
            ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            <AnimatePresence>
                {filteredProducts.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ProductCard 
                            product={product} 
                            index={idx} 
                            onClick={() => onProductClick(product)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
            <div className="text-center text-brand-sand/40 py-20">
                <p>No pieces found in this category.</p>
            </div>
        )}
      </div>
    </div>
  );
};