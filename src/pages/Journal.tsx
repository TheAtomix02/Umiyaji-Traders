import React from 'react';
import { JOURNAL_POSTS } from '../data';
import { motion } from 'framer-motion';

export const Journal: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen bg-brand-black">
            <div className="max-w-5xl mx-auto">
                 <h1 className="text-5xl md:text-8xl font-display text-brand-cream/10 mb-20 tracking-widest text-center md:text-left">JOURNAL</h1>
                 
                 <div className="space-y-24">
                     {JOURNAL_POSTS.map((post, idx) => (
                         <motion.article 
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center group cursor-pointer"
                         >
                            <div className={`overflow-hidden aspect-[4/3] ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-cinema group-hover:scale-105 filter grayscale group-hover:grayscale-0" 
                                />
                            </div>
                            <div className={`${idx % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                                <div className={`flex items-center gap-4 mb-4 text-xs uppercase tracking-widest text-brand-gold ${idx % 2 === 1 ? 'md:justify-end' : ''}`}>
                                    <span>{post.date}</span>
                                    <span className="w-8 h-[1px] bg-brand-gold" />
                                    <span>{post.category}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-display text-brand-cream mb-6 group-hover:text-brand-gold transition-colors">{post.title}</h2>
                                <p className="text-brand-gray leading-relaxed mb-8">{post.excerpt}</p>
                                <span className="text-xs uppercase tracking-[0.2em] text-brand-cream border-b border-brand-cream pb-1 group-hover:border-brand-gold group-hover:text-brand-gold transition-all">Read Article</span>
                            </div>
                         </motion.article>
                     ))}
                 </div>
            </div>
        </div>
    );
};