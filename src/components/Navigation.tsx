import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { ViewState } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  cartCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView, onOpenCart, onOpenSearch, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; view: ViewState }[] = [
    { label: 'Shop', view: 'SHOP' },
    { label: 'Lookbook', view: 'LOOKBOOK' },
    { label: 'Journal', view: 'JOURNAL' },
    { label: 'About', view: 'ABOUT' },
    { label: 'Contact', view: 'CONTACT' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 px-6 md:px-12 py-6 flex justify-between items-center ${
          isScrolled ? 'bg-brand-black/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent'
        }`}
      >
        {/* Left Links (Desktop) */}
        <div className="hidden md:flex space-x-8">
          {navLinks.slice(0, 2).map((link) => (
            <button
              key={link.label}
              onClick={() => onChangeView(link.view)}
              className={`text-xs uppercase tracking-[0.15em] transition-colors duration-300 font-sans ${
                currentView === link.view ? 'text-brand-gold' : 'text-brand-ivory hover:text-brand-gold'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Logo */}
        <button 
          onClick={() => onChangeView('HOME')}
          className="text-2xl font-serif text-brand-ivory relative z-50 transition-colors"
        >
          Umiyaji Traders
        </button>

        {/* Right Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.slice(2).map((link) => (
            <button
              key={link.label}
              onClick={() => onChangeView(link.view)}
              className={`text-xs uppercase tracking-[0.15em] transition-colors duration-300 font-sans ${
                currentView === link.view ? 'text-brand-gold' : 'text-brand-ivory hover:text-brand-gold'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center space-x-6 border-l border-white/10 pl-6 ml-2">
             <button onClick={onOpenSearch} className="group">
                <Search className="w-4 h-4 text-brand-ivory group-hover:text-brand-gold transition-colors cursor-pointer" />
             </button>
             <button onClick={onOpenCart} className="relative group">
               <ShoppingBag className="w-4 h-4 text-brand-ivory group-hover:text-brand-gold transition-colors" />
               {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-[9px] w-3 h-3 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
               )}
             </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
           <button onClick={onOpenSearch}>
              <Search className="w-5 h-5 text-brand-ivory" />
           </button>
           <button onClick={onOpenCart} className="relative">
              <ShoppingBag className="w-5 h-5 text-brand-ivory" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] w-3 h-3 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                </span>
              )}
           </button>
           <button onClick={() => setIsMobileMenuOpen(true)}>
             <Menu className="w-6 h-6 text-brand-ivory" />
           </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-black flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2"
            >
              <X className="w-8 h-8 text-brand-ivory" />
            </button>

            <div className="flex flex-col space-y-8 text-center">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    onChangeView(link.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl font-serif text-brand-ivory hover:text-brand-gold"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};