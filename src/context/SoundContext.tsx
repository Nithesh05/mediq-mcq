"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

interface SoundContextType {
    soundEnabled: boolean;
    toggleSound: () => void;
    playSound: (type: 'correct' | 'incorrect' | 'click') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("mediq_sound");
        if (saved !== null) {
            setSoundEnabled(JSON.parse(saved));
        }
        // Initialize AudioContext
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const toggleSound = () => {
        // No-op, sound always enabled
    };

    const playSound = (type: 'correct' | 'incorrect' | 'click') => {
        if (!soundEnabled || !audioContextRef.current) return;

        const ctx = audioContextRef.current;

        // Resume context if suspended (browser policy)
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'correct') {
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'incorrect') {
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.linearRampToValueAtTime(150, now + 0.2);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'click') {
            osc.frequency.setValueAtTime(800, now);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        }
    };

    return (
        <SoundContext.Provider value={{ soundEnabled, toggleSound, playSound }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error("useSound must be used within a SoundProvider");
    }
    return context;
}
