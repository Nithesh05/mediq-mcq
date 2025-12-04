"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Save, AlertCircle, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUsername: string;
    currentEmail?: string;
    currentSecurityQuestion?: string;
}

export default function EditProfileModal({ isOpen, onClose, currentUsername, currentEmail, currentSecurityQuestion }: EditProfileModalProps) {
    const [username, setUsername] = useState(currentUsername);
    const [email, setEmail] = useState(currentEmail || "");
    const [securityQuestion, setSecurityQuestion] = useState(currentSecurityQuestion || "");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const body: any = { username, email };
            if (securityQuestion && securityAnswer) {
                body.securityQuestion = securityQuestion;
                body.securityAnswer = securityAnswer;
            }

            const res = await fetch('/api/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update profile');
            }

            // Refresh page to show new data
            router.refresh();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Edit Profile</h3>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[var(--primary)]"
                                    placeholder="Enter username"
                                    minLength={3}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[var(--primary)]"
                                    placeholder="Enter email address"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <h4 className="text-sm font-bold text-slate-900 mb-3">Security Question</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Question</label>
                                    <select
                                        value={securityQuestion}
                                        onChange={(e) => setSecurityQuestion(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[var(--primary)] text-sm"
                                    >
                                        <option value="" disabled>Select a question</option>
                                        <option value="pet">What is the name of your first pet?</option>
                                        <option value="school">What was the name of your first school?</option>
                                        <option value="city">In what city were you born?</option>
                                        <option value="mother">What is your mother's maiden name?</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Answer</label>
                                    <div className="relative">
                                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="text"
                                            value={securityAnswer}
                                            onChange={(e) => setSecurityAnswer(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[var(--primary)] text-sm"
                                            placeholder="Enter your answer"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Only fill this if you want to update it.</p>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Save size={18} />
                                )}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
