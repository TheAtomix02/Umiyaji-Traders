import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoldText } from '../components/GoldText';
import { Send, Check } from 'lucide-react';

export const Contact: React.FC = () => {
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SENT'>('IDLE');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('SENDING');
        setTimeout(() => {
            setStatus('SENT');
            // Reset after delay
            setTimeout(() => setStatus('IDLE'), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-brand-black pt-32 pb-20 px-6 flex items-center justify-center">
            <div className="max-w-2xl w-full">
                <header className="text-center mb-16">
                    <span className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-4 block">Concierge</span>
                    <GoldText text="GET IN TOUCH" size="lg" />
                    <p className="text-brand-sand/50 mt-6 font-light">
                        For private appointments, press inquiries, or custom commissions.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="group relative">
                        <input 
                            required
                            type="text" 
                            placeholder="NAME"
                            className="w-full bg-transparent border-b border-white/20 py-4 text-brand-ivory placeholder-brand-sand/30 focus:outline-none focus:border-transparent transition-all peer"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 peer-focus:w-full" />
                    </div>

                    <div className="group relative">
                        <input 
                            required
                            type="email" 
                            placeholder="EMAIL ADDRESS"
                            className="w-full bg-transparent border-b border-white/20 py-4 text-brand-ivory placeholder-brand-sand/30 focus:outline-none focus:border-transparent transition-all peer"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 peer-focus:w-full" />
                    </div>

                    <div className="group relative">
                         <select className="w-full bg-transparent border-b border-white/20 py-4 text-brand-ivory/70 focus:outline-none focus:border-transparent appearance-none cursor-pointer peer">
                            <option className="bg-brand-black">SUBJECT: GENERAL INQUIRY</option>
                            <option className="bg-brand-black">SUBJECT: PRIVATE APPOINTMENT</option>
                            <option className="bg-brand-black">SUBJECT: PRESS / MEDIA</option>
                        </select>
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 peer-focus:w-full" />
                    </div>

                    <div className="group relative">
                        <textarea 
                            required
                            rows={4}
                            placeholder="MESSAGE"
                            className="w-full bg-transparent border-b border-white/20 py-4 text-brand-ivory placeholder-brand-sand/30 focus:outline-none focus:border-transparent transition-all peer resize-none"
                        />
                         <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 peer-focus:w-full" />
                    </div>

                    <div className="flex justify-end pt-8">
                        <motion.button 
                            disabled={status !== 'IDLE'}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-4 text-brand-gold uppercase tracking-[0.25em] text-sm group ${status !== 'IDLE' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {status === 'SENDING' ? 'Sending...' : status === 'SENT' ? 'Message Sent' : 'Send Message'}
                            <span className={`p-3 border border-brand-gold/30 rounded-full transition-colors ${status === 'SENT' ? 'bg-green-500 text-black border-green-500' : 'group-hover:bg-brand-gold group-hover:text-brand-black'}`}>
                                {status === 'SENT' ? <Check size={16} /> : <Send size={16} />}
                            </span>
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};