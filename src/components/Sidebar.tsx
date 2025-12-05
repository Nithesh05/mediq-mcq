"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, Trophy, Flame, User, Info, Settings, LogOut, Users, Instagram, MessageSquare, Crown, Bell } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useStreak } from "@/context/StreakContext";
import FeedbackModal from "./FeedbackModal";
import ComingSoonModal from "./ComingSoonModal";
import NotificationsModal from "./NotificationsModal";

import ClientOnly from "./ClientOnly";

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useUser();
    const { streak } = useStreak();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    };

    interface NavItem {
        icon: any;
        label: string;
        href?: string;
        action?: () => void;
    }

    const navItems: NavItem[] = [
        { icon: Home, label: "Home", href: "/" },
        { icon: BookOpen, label: "Practice", href: "/practice" },
        { icon: Users, label: "Community", href: "/friends" },
        { icon: User, label: "Account", href: "/account" },
        { icon: Info, label: "About", href: "/about" },
        { icon: Settings, label: "Settings", href: "/settings" },
        ...(user?.role === 'admin' ? [{ icon: Trophy, label: "Admin Dashboard", href: "/admin" }] : []),
    ];

    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [isPremiumOpen, setIsPremiumOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <ClientOnly>
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md lg:hidden text-primary"
            >
                <div className="flex flex-col gap-1.5 w-6">
                    <span className={`block h-0.5 w-full bg-current transition-transform ${isMobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block h-0.5 w-full bg-current transition-opacity ${isMobileOpen ? 'opacity-0' : ''}`} />
                    <span className={`block h-0.5 w-full bg-current transition-transform ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
            </button>

            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/logo.jpg" alt="MEDIQ Logo" className="w-10 h-10 rounded-full object-cover" />
                        <h1 className="text-2xl font-bold tracking-tight text-primary">MEDIQ</h1>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        {user && <p className="text-sm text-gray-400">@{user.username}</p>}
                        <div className="streak-badge">
                            <Flame size={14} fill="currentColor" />
                            <span>{streak}</span>
                        </div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item, idx) => {
                        const isActive = item.href ? pathname === item.href : false;

                        if (item.action) {
                            return (
                                <button
                                    key={idx}
                                    onClick={item.action}
                                    className={`nav-item w-full text-left`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href!}
                                className={`nav-item ${isActive ? "active" : ""}`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    {/* Premium Button */}
                    <button
                        onClick={() => setIsPremiumOpen(true)}
                        className="nav-item w-full text-left hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20 hover:text-yellow-400 group"
                    >
                        <Crown size={20} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                        <span className="text-yellow-500 font-bold">Premium</span>
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-contact-section">
                        <h4>Contact & Feedback</h4>
                        <a href="https://instagram.com/nivax.tech" target="_blank" rel="noopener noreferrer" className="contact-link">
                            <Instagram size={18} />
                            <span>@nivax.tech</span>
                        </a>
                        <button onClick={() => setIsFeedbackOpen(true)} className="feedback-btn">
                            <MessageSquare size={18} />
                            <span>Send Feedback</span>
                        </button>
                    </div>

                    {user ? (
                        <button onClick={handleLogout} className="logout-btn">
                            <LogOut size={20} />
                            <span>Log Out</span>
                        </button>
                    ) : (
                        <Link href="/login" className="logout-btn">
                            <User size={20} />
                            <span>Log In</span>
                        </Link>
                    )}
                </div>
            </aside>

            <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
            <NotificationsModal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
            <ComingSoonModal isOpen={isPremiumOpen} onClose={() => setIsPremiumOpen(false)} featureName="MEDIQ Premium" />
        </ClientOnly>
    );
}
