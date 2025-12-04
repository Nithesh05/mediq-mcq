"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('mediq_dark_mode');
        if (saved) {
            setDarkMode(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        // Force light mode always
        document.documentElement.classList.remove('dark');
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#0f172a';
        // Clear any saved preference
        localStorage.removeItem('mediq_dark_mode');
    }, []);

    // No-op toggle
    const toggleDarkMode = () => { };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
