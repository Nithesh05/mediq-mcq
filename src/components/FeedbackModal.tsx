"use client";

import { useState, useEffect } from "react";
import { X, MessageSquare, Send, User, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/hooks/useUser";

interface FeedbackItem {
    id: number;
    content: string;
    username: string;
    rating?: number;
    created_at: string;
}

export default function FeedbackModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { user } = useUser();
    const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
    const [newFeedback, setNewFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);

    useEffect(() => {
        if (isOpen) {
            fetchFeedback();
        }
    }, [isOpen]);

    const fetchFeedback = async () => {
        try {
            const res = await fetch("/api/feedback");
            const data = await res.json();
            if (data.feedback) {
                setFeedbackList(data.feedback);
            }
        } catch (error) {
            console.error("Failed to fetch feedback", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFeedback.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newFeedback, rating }),
            });
            const data = await res.json();

            if (data.feedback) {
                setFeedbackList([data.feedback, ...feedbackList]);
                setNewFeedback("");
                setRating(5);
            }
        } catch (error) {
            console.error("Failed to submit feedback", error);
        } finally {
            setIsSubmitting(false);
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
                        className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                            <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800 dark:text-white">
                                <MessageSquare size={20} className="text-[var(--primary)]" />
                                Community Feedback
                            </h3>
                            <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                                <X size={20} className="text-slate-500 dark:text-slate-400" />
                            </button>
                        </div>

                        {/* Feedback List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
                            {loading ? (
                                <div className="text-center py-8 text-slate-400">Loading feedback...</div>
                            ) : feedbackList.length === 0 ? (
                                <div className="text-center py-8 text-slate-400">No feedback yet. Be the first!</div>
                            ) : (
                                feedbackList.map((item: any) => (
                                    <div key={item.id} className="bg-white dark:bg-slate-700 p-3 rounded-xl border border-slate-100 dark:border-slate-600 shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-sm text-slate-900 dark:text-white">{item.username}</span>
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={12}
                                                        className={`${(item.rating || 5) >= star ? "text-yellow-400 fill-current" : "text-slate-200 dark:text-slate-500"}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.content}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input Area */}
                        {user ? (
                            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                                <div className="flex gap-1 mb-2 justify-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`p-1 transition-colors ${rating >= star ? "text-yellow-400" : "text-slate-300 dark:text-slate-600"}`}
                                        >
                                            <Star size={20} className={rating >= star ? "fill-current" : ""} />
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={newFeedback}
                                        onChange={(e) => setNewFeedback(e.target.value)}
                                        placeholder="Share your thoughts..."
                                        className="w-full pl-4 pr-12 py-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all text-[var(--foreground)] placeholder:text-slate-400"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !newFeedback.trim()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-center">
                                <p className="text-slate-600 dark:text-slate-400 mb-3">Please login to share your feedback.</p>
                                <a
                                    href="/login"
                                    className="inline-block px-6 py-2 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors"
                                >
                                    Log In
                                </a>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
