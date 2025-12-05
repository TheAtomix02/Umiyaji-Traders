import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onRemove: (id: string) => void;
    onUpdateQuantity?: (id: string, delta: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = () => {
        if (items.length === 0) return;
        alert("Processing Checkout... (Demo Mode)");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
                    />
                    
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-brand-charcoal z-[90] border-l border-brand-gold/20 shadow-2xl flex flex-col"
                    >
                        <div className="p-8 border-b border-white/5 flex justify-between items-center">
                            <h2 className="text-xl font-display tracking-widest text-brand-ivory">YOUR SELECTION ({items.length})</h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-5 h-5 text-brand-sand" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-brand-sand/40">
                                    <p className="uppercase tracking-widest text-sm">Your cart is empty</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div 
                                        layout
                                        key={item.cartId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex gap-6"
                                    >
                                        <div className="w-24 h-32 bg-brand-black flex-shrink-0 overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-display text-lg text-brand-ivory">{item.name}</h3>
                                                    <p className="font-sans text-sm text-brand-gold">${item.price}</p>
                                                </div>
                                                <p className="text-xs text-brand-sand/50 uppercase tracking-wider mt-1">{item.category} / {item.size}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3 border border-white/10 px-2 py-1">
                                                    <button 
                                                        onClick={() => onUpdateQuantity?.(item.cartId, -1)}
                                                        className="text-brand-sand/50 hover:text-brand-ivory"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-xs font-mono">1</span>
                                                    <button 
                                                        onClick={() => onUpdateQuantity?.(item.cartId, 1)}
                                                        className="text-brand-sand/50 hover:text-brand-ivory"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => onRemove(item.cartId)}
                                                    className="text-xs uppercase tracking-widest text-brand-sand/40 hover:text-red-400 transition-colors flex items-center gap-1"
                                                >
                                                    <Trash2 size={12} /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <div className="p-8 border-t border-white/5 bg-brand-black/20">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm uppercase tracking-widest text-brand-sand">Subtotal</span>
                                <span className="text-xl font-display text-brand-gold">${total}</span>
                            </div>
                            <p className="text-[10px] text-brand-sand/40 mb-6 text-center">SHIPPING AND TAXES CALCULATED AT CHECKOUT</p>
                            <button 
                                onClick={handleCheckout}
                                className="w-full py-4 bg-brand-ivory text-brand-black uppercase tracking-[0.2em] font-bold hover:bg-brand-gold transition-colors"
                            >
                                Checkout
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};