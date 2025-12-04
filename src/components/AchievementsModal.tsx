"use client";

import { useState, useEffect } from "react";
import { X, Award, Lock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked_at?: string;
}

export default function AchievementsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchAchievements();
        }
    }, [isOpen]);

    const fetchAchievements = async () => {
        try {
            const res = await fetch("/api/achievements");
            const data = await res.json();
            if (data.achievements) {
                setAchievements(data.achievements);
            }
        } catch (error) {
            console.error("Failed to fetch achievements", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="font-bold text-xl flex items-center gap-2 text-slate-900 dark:text-white">
                                    <Award size={24} className="text-orange-500" />
                                    Achievements
                                </h3>
                                <p className="text-slate-500 text-sm mt-1">Track your milestones and progress</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {achievements.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`p-4 rounded-xl border transition-all ${item.unlocked_at
                                                ? "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 shadow-sm"
                                                : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700"
                                                }`}
                                        >
                                            <div className="flex gap-4 items-start">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0 ${item.unlocked_at
                                                    ? "bg-gradient-to-br from-amber-100 to-orange-100"
                                                    : "bg-slate-100 dark:bg-slate-700"
                                                    }`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                                            {item.title}
                                                        </h4>
                                                        {item.unlocked_at && (
                                                            <CheckCircle size={16} className="text-green-500 shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                    {item.unlocked_at && (
                                                        <p className="text-[10px] text-orange-600 font-medium mt-2">
                                                            Unlocked on {new Date(item.unlocked_at).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
