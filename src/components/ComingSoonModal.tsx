"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
    featureName?: string;
}

export default function ComingSoonModal({ isOpen, onClose, featureName = "Premium Feature" }: ComingSoonModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                >
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-bl-full -z-10 opacity-50" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-100 to-blue-100 rounded-tr-full -z-10 opacity-50" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-200">
                            <Sparkles className="text-white" size={32} />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Coming Soon!</h2>
                        <p className="text-slate-600 mb-6">
                            <span className="font-semibold text-[var(--primary)]">{featureName}</span> is currently under development. We're working hard to bring you this premium experience!
                        </p>

                        <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Notify Me</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[var(--primary)]"
                                />
                                <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
                                    Join Waitlist
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors"
                        >
                            Maybe later
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
