"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Shield, Users, Activity, Settings, MessageSquare, Trash2, AlertTriangle, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
    const { user, loading } = useUser();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'feedback'>('overview');

    // Data states
    const [stats, setStats] = useState({ totalUsers: 0, totalFeedback: 0, activeUsers: 0 });
    const [usersList, setUsersList] = useState<any[]>([]);
    const [feedbackList, setFeedbackList] = useState<any[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);

    // Modal states
    const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'user' | 'feedback', id: number } | null>(null);

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.push('/');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchStats();
            if (activeTab === 'users') fetchUsers();
            if (activeTab === 'feedback') fetchFeedback();
        }
    }, [user, activeTab]);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/admin/stats', { cache: 'no-store' });
            const data = await res.json();
            if (!data.error) setStats(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUsers = async () => {
        setIsLoadingData(true);
        try {
            const res = await fetch('/api/admin/users', { cache: 'no-store' });
            const data = await res.json();
            if (!data.error) setUsersList(data.users);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoadingData(false);
        }
    };

    const fetchFeedback = async () => {
        setIsLoadingData(true);
        try {
            const res = await fetch('/api/admin/feedback', { cache: 'no-store' });
            const data = await res.json();
            if (!data.error) setFeedbackList(data.feedback);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;

        try {
            const endpoint = deleteConfirm.type === 'user'
                ? `/api/admin/users/${deleteConfirm.id}`
                : `/api/admin/feedback/${deleteConfirm.id}`;

            const res = await fetch(endpoint, { method: 'DELETE' });

            if (res.ok) {
                if (deleteConfirm.type === 'user') fetchUsers();
                if (deleteConfirm.type === 'feedback') fetchFeedback();
                fetchStats(); // Update stats
                setDeleteConfirm(null);
            } else {
                alert('Failed to delete');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting item');
        }
    };

    if (loading || !user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8 md:mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-teal-100 text-[var(--primary)] rounded-xl">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                        <p className="text-slate-500">Manage users, content, and system settings</p>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-[var(--primary)] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'users' ? 'bg-[var(--primary)] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab('feedback')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'feedback' ? 'bg-[var(--primary)] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                        Feedback
                    </button>
                </div>
            </header>

            <main>
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stats Cards */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <Users size={24} />
                                </div>
                                <span className="text-3xl font-bold text-slate-900">{stats.totalUsers}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Total Users</h3>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                                    <Activity size={24} />
                                </div>
                                <span className="text-3xl font-bold text-slate-900">{stats.activeUsers}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Active Users (7d)</h3>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                    <MessageSquare size={24} />
                                </div>
                                <span className="text-3xl font-bold text-slate-900">{stats.totalFeedback}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Total Feedback</h3>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Registered Users</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Username</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Role</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Joined</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {isLoadingData ? (
                                        <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading...</td></tr>
                                    ) : usersList.map((u) => (
                                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900">{u.username}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">
                                                {new Date(u.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {u.id !== user.id && (
                                                    <button
                                                        onClick={() => setDeleteConfirm({ type: 'user', id: u.id })}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'feedback' && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">User Feedback</h2>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {isLoadingData ? (
                                <div className="p-8 text-center text-slate-500">Loading...</div>
                            ) : feedbackList.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No feedback found.</div>
                            ) : feedbackList.map((f) => (
                                <div key={f.id} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-bold text-slate-900">{f.username}</span>
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={12}
                                                            className={i < (f.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-slate-400 text-sm">•</span>
                                                <span className="text-slate-500 text-sm">{new Date(f.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-slate-700 leading-relaxed">{f.content}</p>
                                        </div>
                                        <button
                                            onClick={() => setDeleteConfirm({ type: 'feedback', id: f.id })}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                            title="Delete Feedback"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-4 text-red-600">
                                <AlertTriangle size={24} />
                                <h3 className="text-xl font-bold">Confirm Deletion</h3>
                            </div>
                            <p className="text-slate-600 mb-6">
                                Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
