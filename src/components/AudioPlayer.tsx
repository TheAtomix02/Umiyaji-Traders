import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Using a free high-quality drone/ambient sound
    const AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=deep-meditation-111425.mp3"; 

    useEffect(() => {
        audioRef.current = new Audio(AUDIO_URL);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Fade in
            audioRef.current.volume = 0;
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
            let vol = 0;
            const interval = setInterval(() => {
                if (vol < 0.3) {
                    vol += 0.01;
                    if(audioRef.current) audioRef.current.volume = vol;
                } else {
                    clearInterval(interval);
                }
            }, 50);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button 
            onClick={togglePlay}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full border border-brand-gold/20 hover:border-brand-gold bg-brand-black/50 backdrop-blur-md text-brand-gold transition-all duration-300 group"
        >
            {isPlaying ? (
                <div className="flex items-center gap-1">
                     <span className="block w-1 h-3 bg-brand-gold animate-[pulse_1s_ease-in-out_infinite]" />
                     <span className="block w-1 h-5 bg-brand-gold animate-[pulse_1.5s_ease-in-out_infinite]" />
                     <span className="block w-1 h-2 bg-brand-gold animate-[pulse_0.8s_ease-in-out_infinite]" />
                </div>
            ) : (
                <VolumeX size={16} className="opacity-50 group-hover:opacity-100" />
            )}
            <span className="sr-only">Toggle Sound</span>
        </button>
    );
};