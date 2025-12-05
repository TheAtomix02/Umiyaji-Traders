import React from 'react';
import { motion } from 'framer-motion';
import { GoldText } from '../components/GoldText';
import { VelocityText } from '../components/VelocityText';

const TIMELINE = [
    { 
        year: 'Chapter I', 
        title: 'The Break', 
        text: 'It began with a fracture. A realization that the world offered nothing that spoke to our internal silence. We were lost in the noise of fast fashion and hollow trends. We needed armor for the modern soul, forged not from vanity, but from necessity.', 
        image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=800' 
    },
    { 
        year: 'Chapter II', 
        title: 'The Struggle', 
        text: 'The first collection was born in a windowless room. We had no funding, only obsession. We slept on rolls of fabric. We ate instant ramen. We poured our frustration, our anger, and our hope into every pattern. We manipulated the cotton until it felt like a second skin, tough enough to withstand the world.', 
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800' 
    },
    { 
        year: 'Chapter III', 
        title: 'The Resonance', 
        text: 'People started to notice. Not because we shouted, but because they felt the weight. They recognized their own struggle in the drape of our hoodies. They felt the kinship of the void. We realized we weren’t just making clothes; we were building a sanctuary for the broken and the bold.', 
        image: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=800' 
    },
    { 
        year: 'Chapter IV', 
        title: 'The Vanguard', 
        text: 'Today, Umiyaji is a testament to survival. We stand as a monolith against the disposable. Our mission is to manipulate the very fabric of reality—to turn pain into power, silence into statement, and struggle into style. Join us in the void.', 
        image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800' 
    },
];

export const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-black pt-32 pb-20">
             {/* Header */}
             <div className="text-center mb-32 px-6">
                <span className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-4 block">The Manifesto</span>
                <GoldText text="THE VOID & THE VESSEL" size="xl" />
                <VelocityText className="mt-8">
                     <p className="text-2xl md:text-4xl text-brand-sand/40 font-display italic">
                        "We sell the feeling of having survived."
                     </p>
                </VelocityText>
             </div>

             {/* Timeline */}
             <div className="max-w-4xl mx-auto px-6 relative">
                 {/* Central Line */}
                 <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent" />

                 <div className="space-y-32">
                     {TIMELINE.map((item, i) => (
                         <motion.div 
                            key={item.year}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col md:flex-row gap-12 relative ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                         >
                             {/* Dot on Line */}
                             <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-black border border-brand-gold rounded-full z-10" />

                             <div className="w-full md:w-1/2 pl-16 md:pl-0 md:text-right">
                                 {i % 2 === 0 ? (
                                    <div className="md:pr-12">
                                        <span className="text-4xl font-display text-brand-gold/20 font-bold block mb-4 tracking-widest">{item.year}</span>
                                        <h3 className="text-2xl text-brand-ivory mb-4 uppercase tracking-[0.1em]">{item.title}</h3>
                                        <p className="text-brand-sand/60 leading-relaxed font-light">{item.text}</p>
                                    </div>
                                 ) : (
                                    <div className="md:pl-12 overflow-hidden rounded-sm border border-white/5 group">
                                        <img src={item.image} alt={item.title} className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-luxury" />
                                    </div>
                                 )}
                             </div>
                             
                             <div className="w-full md:w-1/2 pl-16 md:pl-0 md:text-left">
                                 {i % 2 !== 0 ? (
                                    <div className="md:pl-12">
                                        <span className="text-4xl font-display text-brand-gold/20 font-bold block mb-4 tracking-widest">{item.year}</span>
                                        <h3 className="text-2xl text-brand-ivory mb-4 uppercase tracking-[0.1em]">{item.title}</h3>
                                        <p className="text-brand-sand/60 leading-relaxed font-light">{item.text}</p>
                                    </div>
                                 ) : (
                                    <div className="md:pr-12 overflow-hidden rounded-sm border border-white/5 group">
                                        <img src={item.image} alt={item.title} className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-luxury" />
                                    </div>
                                 )}
                             </div>
                         </motion.div>
                     ))}
                 </div>
             </div>
        </div>
    );
};
