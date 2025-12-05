import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-white/5 pt-20 pb-10 px-6 md:px-12 relative overflow-hidden">
      {/* Footer SVG Logo Animation */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
         <motion.svg width="400" height="200" viewBox="0 0 400 200" initial="hidden" whileInView="visible">
            <motion.path 
                d="M50 150 L100 50 L150 150 M75 120 L125 120" 
                stroke="#D5C7A1" strokeWidth="2" fill="transparent"
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" } }
                }}
            />
            {/* Abstract geometric lines */}
            <motion.path 
                d="M200 50 L200 150 M200 50 L250 50 M200 100 L240 100 M200 150 L250 150"
                stroke="#D5C7A1" strokeWidth="2" fill="transparent"
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 2, delay: 0.5, ease: "easeInOut" } }
                }}
            />
         </motion.svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-display tracking-widest text-brand-ivory mb-6">Umiyaji Traders</h2>
          <p className="text-brand-sand/60 text-sm leading-relaxed max-w-xs">
            Redefining modern luxury through silence, structure, and shadow. 
            Designed in Tokyo, crafted for the world.
          </p>
        </div>

        <div className="col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-ivory mb-6">Shop</h3>
          <ul className="space-y-3 text-sm text-brand-sand/60">
            <li className="hover:text-brand-gold cursor-hover transition-colors">New Arrivals</li>
            <li className="hover:text-brand-gold cursor-hover transition-colors">Ready-to-Wear</li>
            <li className="hover:text-brand-gold cursor-hover transition-colors">Accessories</li>
            <li className="hover:text-brand-gold cursor-hover transition-colors">Collections</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-ivory mb-6">Legal</h3>
          <ul className="space-y-3 text-sm text-brand-sand/60">
            <li className="hover:text-brand-gold cursor-hover transition-colors">Privacy Policy</li>
            <li className="hover:text-brand-gold cursor-hover transition-colors">Terms of Service</li>
            <li className="hover:text-brand-gold cursor-hover transition-colors">Shipping & Returns</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-ivory mb-6">Newsletter</h3>
          <div className="flex border-b border-white/20 pb-2">
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="bg-transparent border-none outline-none text-brand-ivory text-sm w-full placeholder-brand-sand/30 cursor-none"
            />
            <button className="text-brand-gold text-xs uppercase tracking-widest hover:text-white transition-colors cursor-hover">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
        <p className="text-xs text-brand-sand/40 tracking-wider mb-4 md:mb-0">
          © 2024 Umiyaji Traders. ALL RIGHTS RESERVED.
        </p>
        <div className="flex space-x-6">
          <Instagram className="w-4 h-4 text-brand-sand/40 hover:text-brand-gold cursor-hover transition-colors" />
          <Twitter className="w-4 h-4 text-brand-sand/40 hover:text-brand-gold cursor-hover transition-colors" />
          <Facebook className="w-4 h-4 text-brand-sand/40 hover:text-brand-gold cursor-hover transition-colors" />
        </div>
      </div>
    </footer>
  );
};