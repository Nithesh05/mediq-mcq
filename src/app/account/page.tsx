"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Flame, Star, Trophy, Clock, Calendar, Edit, Settings, Award } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import EditProfileModal from "@/components/EditProfileModal";
import ComingSoonModal from "@/components/ComingSoonModal";
import AchievementsModal from "@/components/AchievementsModal";
import ActivityModal from "@/components/ActivityModal";

export default function AccountPage() {
    const { user, loading: userLoading } = useUser();
    const [activity, setActivity] = useState<any[]>([]);
    const [achievements, setAchievements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isPremiumOpen, setIsPremiumOpen] = useState(false);
    const [isPublicProfileOpen, setIsPublicProfileOpen] = useState(false);

    const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
    const [isActivityOpen, setIsActivityOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [actRes, achRes] = await Promise.all([
                    fetch('/api/activity'),
                    fetch('/api/achievements')
                ]);

                const actData = await actRes.json();
                const achData = await achRes.json();

                if (actData.activity) setActivity(actData.activity);
                if (achData.achievements) setAchievements(achData.achievements);

            } catch (error) {
                console.error("Failed to fetch profile data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const stats = [
        { label: "Total XP", value: user?.xp?.toLocaleString() || "0", icon: Star, color: "text-yellow-500", bg: "bg-yellow-50" },
        { label: "Current Level", value: user?.level || "1", icon: Trophy, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Quizzes Taken", value: activity.filter(a => a.activity_type === 'quiz_completed').length.toString(), icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Day Streak", value: user?.streak || 0, icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    if (userLoading || loading) {
        return (
            <div className="container mx-auto p-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    return (
        <PageTransition className="container mx-auto p-6 max-w-5xl">
            {/* Profile Header */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[var(--primary)] to-teal-600 opacity-10" />

                <div className="relative flex flex-col md:flex-row items-center gap-8 pt-4">
                    <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-700 p-1 shadow-xl relative">
                        <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-600 flex items-center justify-center text-4xl overflow-hidden border-4 border-white dark:border-slate-700">
                            {user ? (
                                <span className="font-bold text-slate-400">{user.username.charAt(0).toUpperCase()}</span>
                            ) : (
                                <User size={48} className="text-slate-300" />
                            )}
                        </div>
                        <button
                            onClick={() => setIsEditProfileOpen(true)}
                            className="absolute bottom-0 right-0 p-2 bg-[var(--primary)] text-white rounded-full shadow-lg hover:bg-[var(--primary-hover)] transition-colors"
                        >
                            <Edit size={16} />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{user?.username || "Guest User"}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-center md:justify-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Online • Medical Student
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <Link href="/settings" className="btn bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                                <Settings size={18} />
                                Settings
                            </Link>
                            <button
                                onClick={() => setIsPublicProfileOpen(true)}
                                className="btn btn-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                            >
                                View Public Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Stats */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center text-center"
                            >
                                <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                                    <stat.icon size={20} />
                                </div>
                                <span className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</span>
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Clock size={20} className="text-slate-400" />
                                Recent Activity
                            </h2>
                            <button
                                onClick={() => setIsActivityOpen(true)}
                                className="text-sm text-[var(--primary)] font-bold hover:underline"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {activity.length > 0 ? activity.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-600 flex items-center justify-center border border-slate-100 dark:border-slate-600 text-xl shadow-sm">
                                            {item.activity_type === 'quiz_completed' ? '📝' : '🏆'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">{item.details || "Activity"}</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    {item.score && (
                                        <span className="font-bold text-[var(--primary)] bg-teal-50 px-3 py-1 rounded-lg text-sm">
                                            {item.score}%
                                        </span>
                                    )}
                                </div>
                            )) : (
                                <p className="text-slate-500 text-center py-4">No recent activity</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Achievements */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Award size={20} className="text-slate-400" />
                                Achievements
                            </h2>
                            <button
                                onClick={() => setIsAchievementsOpen(true)}
                                className="text-sm text-[var(--primary)] font-bold hover:underline"
                            >
                                View All
                            </button>
                        </div>

                        <div className="space-y-4">
                            {achievements.map((item, idx) => (
                                <div key={idx} className={`flex gap-4 items-start ${!item.unlocked_at ? 'opacity-50 grayscale' : ''}`}>
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl shadow-sm shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[var(--primary)] to-teal-700 rounded-2xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl" />
                        <h3 className="text-lg font-bold mb-2 relative z-10">Go Premium</h3>
                        <p className="text-teal-100 text-sm mb-4 relative z-10">Unlock detailed analytics, unlimited AI quizzes, and more.</p>
                        <button
                            onClick={() => setIsPremiumOpen(true)}
                            className="w-full py-2 bg-white text-[var(--primary)] font-bold rounded-lg text-sm hover:bg-teal-50 transition-colors relative z-10"
                        >
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditProfileOpen}
                onClose={() => setIsEditProfileOpen(false)}
                currentUsername={user?.username || ""}
            />
            <ComingSoonModal isOpen={isPremiumOpen} onClose={() => setIsPremiumOpen(false)} featureName="Premium Membership" />
            <ComingSoonModal isOpen={isPublicProfileOpen} onClose={() => setIsPublicProfileOpen(false)} featureName="Public Profiles" />

            <AchievementsModal isOpen={isAchievementsOpen} onClose={() => setIsAchievementsOpen(false)} />
            <ActivityModal isOpen={isActivityOpen} onClose={() => setIsActivityOpen(false)} />
        </PageTransition>
    );
}
