"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Moon, Sun, User, Shield, LogOut, ChevronRight, Volume2, CheckCircle, VolumeX } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useRouter } from "next/navigation";
import EditProfileModal from "@/components/EditProfileModal";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import { useNotifications } from "@/hooks/useNotifications";

export default function SettingsPage() {
    const { user } = useUser();
    const router = useRouter();
    const { darkMode, toggleDarkMode } = useTheme();
    const { soundEnabled, toggleSound, playSound } = useSound();
    const { requestPermission, sendPushNotification, sendEmailSimulation } = useNotifications();

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        updates: false,
    });
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Load preferences from localStorage on mount
    useEffect(() => {
        const savedNotifs = localStorage.getItem('mediq_notifications');
        if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    };

    const handleSavePreference = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        if (soundEnabled) playSound('click');
    };

    return (
        <PageTransition className="container mx-auto p-6 max-w-3xl relative">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage your preferences and account settings.</p>
            </header>

            <div className="space-y-6">
                {/* Account Section */}
                <Section title="Account" icon={User}>
                    <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold">
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{user?.username || "Guest"}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{user?.email || "No email linked"}</p>
                        </div>
                        <button
                            onClick={() => setIsEditProfileOpen(true)}
                            className="ml-auto text-[var(--primary)] font-semibold text-sm hover:underline"
                        >
                            Edit Profile
                        </button>
                    </div>
                    <div className="space-y-1">
                        <SettingItem
                            label="Change Password"
                            description="Update your security credentials"
                            action={
                                <button
                                    onClick={() => router.push('/forgot-password')}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                                >
                                    <ChevronRight size={18} className="text-slate-400" />
                                </button>
                            }
                        />
                        <SettingItem
                            label="Privacy Settings"
                            description="Manage data usage and visibility"
                            action={
                                <button
                                    onClick={() => setIsPrivacyOpen(true)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                                >
                                    <ChevronRight size={18} className="text-slate-400" />
                                </button>
                            }
                        />
                    </div>
                </Section>



                {/* Notifications Section */}
                <Section title="Notifications" icon={Bell}>
                    <SettingItem
                        label="Email Notifications"
                        description="Receive weekly progress reports"
                        action={
                            <input
                                type="checkbox"
                                checked={notifications.email}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const newVal = { ...notifications, email: isChecked };
                                    setNotifications(newVal);
                                    handleSavePreference('mediq_notifications', newVal);

                                    if (isChecked && user?.email) {
                                        sendEmailSimulation(user.email, "Weekly Report Subscription");
                                        // Optional: Show specific toast for email
                                    }
                                }}
                                className="w-5 h-5 accent-[var(--primary)] rounded cursor-pointer"
                            />
                        }
                    />
                    <SettingItem
                        label="Push Notifications"
                        description="Daily reminders and streak alerts"
                        action={
                            <input
                                type="checkbox"
                                checked={notifications.push}
                                onChange={async (e) => {
                                    const isChecked = e.target.checked;

                                    if (isChecked) {
                                        const granted = await requestPermission();
                                        if (granted) {
                                            sendPushNotification("Notifications Enabled", {
                                                body: "You will now receive daily reminders!"
                                            });
                                        } else if (!granted) {
                                            alert("Please enable notifications in your browser settings.");
                                            return;
                                        }
                                    }

                                    const newVal = { ...notifications, push: isChecked };
                                    setNotifications(newVal);
                                    handleSavePreference('mediq_notifications', newVal);
                                    // Visual feedback
                                    if (isChecked) {
                                        // console.log("Push notifications enabled");
                                    }
                                }}
                                className="w-5 h-5 accent-[var(--primary)] rounded cursor-pointer"
                            />
                        }
                    />
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <button
                            onClick={async () => {
                                const granted = await requestPermission();
                                if (granted) {
                                    sendPushNotification("Test Notification", {
                                        body: "This is how your notifications will appear!"
                                    });
                                } else {
                                    alert("Please enable notifications first.");
                                }
                            }}
                            className="text-sm font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
                        >
                            <Bell size={14} />
                            Test Notification
                        </button>
                    </div>
                </Section>

                {/* Danger Zone */}
                <div className="pt-6 border-t border-slate-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-500 font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Toast Notification */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showToast ? 1 : 0, y: showToast ? 0 : 50 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 pointer-events-none"
            >
                <CheckCircle size={20} className="text-green-400" />
                <span className="font-medium">Preferences Saved</span>
            </motion.div>

            <EditProfileModal
                isOpen={isEditProfileOpen}
                onClose={() => setIsEditProfileOpen(false)}
                currentUsername={user?.username || ""}
                currentEmail={user?.email || ""}
                currentSecurityQuestion={user?.security_question}
            />
            <ComingSoonModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} featureName="Privacy Settings" />
        </PageTransition>
    );
}

function Section({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) {
    return (
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Icon size={20} className="text-[var(--primary)]" />
                {title}
            </h2>
            <div className="space-y-6">
                {children}
            </div>
        </section>
    );
}

function SettingItem({ label, description, action }: { label: string, description: string, action: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-slate-900 dark:text-white">{label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
            </div>
            {action}
        </div>
    );
}
