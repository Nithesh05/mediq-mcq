"use client";

import { useState, useEffect } from "react";
import { X, Bell, Check, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning';
    is_read: boolean;
    created_at: string;
}

export default function NotificationsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notifications");
            const data = await res.json();
            if (data.notifications) {
                setNotifications(data.notifications);
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setLoading(false);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch("/api/notifications", { method: "PATCH" });
            setNotifications(notifications.map(n => ({ ...n, is_read: true })));
        } catch (error) {
            console.error("Failed to mark notifications as read", error);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle size={20} className="text-green-500" />;
            case 'warning': return <AlertTriangle size={20} className="text-amber-500" />;
            default: return <Info size={20} className="text-blue-500" />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden pointer-events-auto mt-16 max-h-[80vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                                <Bell size={20} className="text-[var(--primary)]" />
                                Notifications
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs font-bold text-[var(--primary)] hover:underline px-2"
                                >
                                    Mark all read
                                </button>
                                <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-slate-50/50">
                            {loading ? (
                                <div className="text-center py-8 text-slate-400">Loading...</div>
                            ) : notifications.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 flex flex-col items-center gap-2">
                                    <Bell size={32} className="opacity-20" />
                                    <p>No notifications yet</p>
                                </div>
                            ) : (
                                notifications.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`p-4 rounded-xl border transition-colors flex gap-3 ${item.is_read
                                                ? "bg-white border-slate-100 opacity-75"
                                                : "bg-blue-50/50 border-blue-100"
                                            }`}
                                    >
                                        <div className="mt-0.5 shrink-0">
                                            {getIcon(item.type)}
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-bold ${item.is_read ? "text-slate-700" : "text-slate-900"}`}>
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                                {item.message}
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-2">
                                                {new Date(item.created_at).toLocaleDateString()} • {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        {!item.is_read && (
                                            <div className="shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
