"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface StreakContextType {
    streak: number;
    xp: number;
    level: number;
    loading: boolean;
    refreshStreak: () => Promise<void>;
    setStreak: (val: number) => void;
    setXP: (val: number) => void;
    setLevel: (val: number) => void;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export function StreakProvider({ children }: { children: React.ReactNode }) {
    const [streak, setStreak] = useState(0);
    const [xp, setXP] = useState(0);
    const [level, setLevel] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchStreak = async () => {
        try {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            if (data.user) {
                setStreak(data.user.streak);
                setXP(data.user.xp || 0);
                setLevel(data.user.level || 1);
            }
        } catch (error) {
            console.error("Failed to fetch streak:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStreak();
    }, []);

    return (
        <StreakContext.Provider value={{ streak, xp, level, loading, refreshStreak: fetchStreak, setStreak, setXP, setLevel }}>
            {children}
        </StreakContext.Provider>
    );
}

export function useStreak() {
    const context = useContext(StreakContext);
    if (context === undefined) {
        throw new Error("useStreak must be used within a StreakProvider");
    }
    return context;
}
