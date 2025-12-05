import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { ProductCard } from './ProductCard';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductClick: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onProductClick }) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setQuery(''); // Reset query on close
        }
    }, [isOpen]);

    // Filter logic
    const results = query.trim() === '' 
        ? [] 
        : PRODUCTS.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) || 
            p.category.toLowerCase().includes(query.toLowerCase())
          );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[100] flex flex-col bg-brand-black/95 backdrop-blur-xl"
                >
                    {/* Header */}
                    <div className="flex justify-end p-6 md:p-12">
                        <button 
                            onClick={onClose}
                            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-brand-sand/50 hover:text-brand-ivory transition-colors"
                        >
                            Close <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>

                    {/* Search Input Area */}
                    <div className="w-full max-w-4xl mx-auto px-6 mt-4 md:mt-10">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative group"
                        >
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-gold/50" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="SEARCH ARCHIVE..."
                                className="w-full bg-transparent border-b border-white/10 py-6 pl-12 text-xl md:text-4xl font-display text-brand-ivory placeholder-brand-sand/20 focus:outline-none focus:border-brand-gold transition-colors"
                            />
                        </motion.div>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-xs text-brand-sand/30 uppercase tracking-widest text-right"
                        >
                            {query ? `${results.length} RESULT${results.length !== 1 ? 'S' : ''} FOUND` : 'ENTER KEYWORDS'}
                        </motion.p>
                    </div>

                    {/* Results Area */}
                    <div className="flex-1 overflow-y-auto mt-12 px-6 pb-20 custom-scrollbar">
                        <div className="max-w-7xl mx-auto">
                            {query === '' ? (
                                <div className="flex flex-col items-center justify-center h-40 text-brand-sand/20 text-sm uppercase tracking-widest">
                                    <p>Start typing to search collection</p>
                                </div>
                            ) : results.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-40 text-brand-sand/20 text-sm uppercase tracking-widest">
                                    <p>No results found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                                    {results.map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 + (idx * 0.05) }}
                                        >
                                            <ProductCard 
                                                product={product} 
                                                onClick={() => {
                                                    onProductClick(product);
                                                    onClose();
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};