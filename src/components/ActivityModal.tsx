"use client";

import { useState, useEffect } from "react";
import { X, Clock, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ActivityItem {
    id: number;
    activity_type: string;
    details?: string;
    score?: number;
    timestamp: string;
}

export default function ActivityModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchActivity();
        }
    }, [isOpen]);

    const fetchActivity = async () => {
        try {
            const res = await fetch("/api/activity?limit=50");
            const data = await res.json();
            if (data.activity) {
                setActivity(data.activity);
            }
        } catch (error) {
            console.error("Failed to fetch activity", error);
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
                        className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="font-bold text-xl flex items-center gap-2 text-slate-900">
                                    <Clock size={24} className="text-blue-500" />
                                    Activity History
                                </h3>
                                <p className="text-slate-500 text-sm mt-1">Your recent learning journey</p>
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
                            ) : activity.length === 0 ? (
                                <div className="text-center py-12 text-slate-400">No activity recorded yet.</div>
                            ) : (
                                <div className="space-y-3">
                                    {activity.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-xl shadow-sm shrink-0">
                                                    {item.activity_type === 'quiz_completed' ? '📝' : '🏆'}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm">{item.details || "Activity"}</h4>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                        <Calendar size={10} />
                                                        {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                            {item.score !== undefined && (
                                                <span className={`font-bold px-3 py-1 rounded-lg text-sm ${item.score >= 80 ? "bg-green-50 text-green-600" :
                                                        item.score >= 50 ? "bg-yellow-50 text-yellow-600" :
                                                            "bg-red-50 text-red-600"
                                                    }`}>
                                                    {item.score}%
                                                </span>
                                            )}
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
