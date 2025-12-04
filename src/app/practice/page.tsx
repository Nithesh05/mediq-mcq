"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Activity, Brain, Zap, ArrowRight, Sparkles, Crown } from "lucide-react";
import ComingSoonModal from "@/components/ComingSoonModal";

const modules = [
    {
        title: "Medical Concepts",
        description: "Master the fundamentals with concise explanations and key points.",
        icon: Brain,
        href: "/concepts",
        color: "bg-teal-50 text-teal-600",
        border: "hover:border-teal-500",
    },
    {
        title: "Disease Information",
        description: "Detailed insights on causes, symptoms, diagnosis, and treatment.",
        icon: Activity,
        href: "/diseases",
        color: "bg-blue-50 text-blue-600",
        border: "hover:border-blue-500",
    },
    {
        title: "Question Bank",
        description: "Browse our extensive collection of high-yield questions by subject.",
        icon: BookOpen,
        href: "/mcqs",
        color: "bg-indigo-50 text-indigo-600",
        border: "hover:border-indigo-500",
    },
    {
        title: "Daily AI Challenge",
        description: "Take a unique, AI-generated quiz on a high-yield topic every day.",
        icon: Zap,
        href: "/ai-mcq?mode=daily",
        color: "bg-yellow-50 text-yellow-600",
        border: "hover:border-yellow-500",
    },
    {
        title: "Custom Generator",
        description: "Generate unlimited custom questions based on any topic you choose.",
        icon: Brain,
        href: "/ai-mcq",
        color: "bg-orange-50 text-orange-600",
        border: "hover:border-orange-500",
    },
    {
        title: "AI Personal Tutor",
        description: "Get personalized study plans and weak-area analysis.",
        icon: Sparkles,
        href: "#",
        color: "bg-purple-50 text-purple-600",
        border: "hover:border-purple-500",
        isPremium: true,
    },
];

export default function PracticePage() {
    const [isPremiumOpen, setIsPremiumOpen] = useState(false);

    return (
        <div className="container">
            <header className="page-header">
                <h1 className="page-title">Practice Hub</h1>
                <p className="page-subtitle">
                    Choose a module to start learning and improving your medical knowledge today.
                </p>
            </header>

            <div className="grid grid-2">
                {modules.map((module, index) => (
                    <motion.div
                        key={module.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ height: '100%' }}
                    >
                        {module.isPremium ? (
                            <button
                                onClick={() => setIsPremiumOpen(true)}
                                className="block h-full w-full text-left"
                            >
                                <div className="card relative overflow-hidden">
                                    <div className="absolute top-4 right-4 text-yellow-500">
                                        <Crown size={24} fill="currentColor" />
                                    </div>
                                    <div className="card-blob" />
                                    <div className="card-content">
                                        <div className="card-icon-wrapper">
                                            <module.icon size={28} />
                                        </div>

                                        <h2 className="card-title">{module.title}</h2>
                                        <p className="card-description">{module.description}</p>

                                        <div className="card-link text-yellow-600">
                                            Coming Soon
                                            <Sparkles size={20} />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ) : (
                            <Link href={module.href} className="block h-full">
                                <div className="card">
                                    <div className="card-blob" />
                                    <div className="card-content">
                                        <div className="card-icon-wrapper">
                                            <module.icon size={28} />
                                        </div>

                                        <h2 className="card-title">{module.title}</h2>
                                        <p className="card-description">{module.description}</p>

                                        <div className="card-link">
                                            Start Module
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </motion.div>
                ))}
            </div>

            <ComingSoonModal isOpen={isPremiumOpen} onClose={() => setIsPremiumOpen(false)} featureName="AI Personal Tutor" />
        </div>
    );
}
