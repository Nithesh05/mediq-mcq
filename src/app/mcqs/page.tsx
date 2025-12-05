"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Filter, Play, Star, Award, Brain } from "lucide-react";
import { mcqDatabase, Difficulty } from "@/data/mcqs";
import { useUser } from "@/hooks/useUser";

const years = ["All", "Year 1", "Year 2", "Year 3", "Year 4"];
const subjects = ["All", "Anatomy", "Physiology", "Pathology", "Pharmacology", "Medicine"];
const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

export default function MCQDashboard() {
    const { user } = useUser();
    const [selectedYear, setSelectedYear] = useState("All");
    const [selectedSubject, setSelectedSubject] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "All">("All");
    const [stats, setStats] = useState({ accuracy: 0, questionsSolved: 0 });

    useEffect(() => {
        if (user) {
            fetch('/api/user/stats')
                .then(res => res.json())
                .then(data => {
                    if (data.accuracy !== undefined) {
                        setStats(data);
                    }
                })
                .catch(err => console.error("Failed to fetch stats", err));
        }
    }, [user]);

    const filteredMCQs = mcqDatabase.filter((q) => {
        const yearMatch = selectedYear === "All" || q.year.includes(selectedYear);
        const subjectMatch = selectedSubject === "All" || q.subject === selectedSubject;
        const difficultyMatch = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
        return yearMatch && subjectMatch && difficultyMatch;
    });

    return (
        <div className="container">
            <header className="page-header">
                <div className="syllabus-badge">
                    Daily Practice
                </div>
                <h1 className="page-title">MCQ Bank</h1>
                <p className="page-subtitle">
                    High-yield questions tailored for University Exams and NEET PG/NEXT.
                    Filter by subject, year, and difficulty to customize your practice.
                </p>
            </header>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
                <div className="flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-200 font-bold">
                    <Filter size={20} />
                    <span>Customize Quiz</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Year Filter */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Year</label>
                        <div className="flex flex-wrap gap-2">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${selectedYear === year
                                        ? "bg-[var(--primary)] text-white"
                                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                                        }`}
                                >
                                    {year === "All" ? "All" : year}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Subject Filter */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-500 mb-2">Subject</label>
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[var(--primary)]"
                        >
                            {subjects.map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-500 mb-2">Difficulty</label>
                        <div className="flex gap-2">
                            {difficulties.map((diff) => (
                                <button
                                    key={diff}
                                    onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? "All" : diff)}
                                    className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${selectedDifficulty === diff
                                        ? diff === "Easy" ? "bg-green-100 border-green-500 text-green-700"
                                            : diff === "Medium" ? "bg-yellow-100 border-yellow-500 text-yellow-700"
                                                : "bg-red-100 border-red-500 text-red-700"
                                        : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                                        }`}
                                >
                                    {diff}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats / Start */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                        <BookOpen size={24} className="text-[var(--primary)]" />
                        Available Questions ({filteredMCQs.length})
                    </h2>

                    <div className="grid gap-4">
                        {filteredMCQs.length > 0 ? (
                            filteredMCQs.map((q, idx) => (
                                <motion.div
                                    key={q.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[var(--primary)] transition-colors group cursor-pointer"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex gap-2">
                                            <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-xs font-bold uppercase">
                                                {q.subject}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${q.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                                                q.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                                                    "bg-red-100 text-red-700"
                                                }`}>
                                                {q.difficulty}
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400">#{q.id}</span>
                                    </div>
                                    <p className="font-medium transition-colors line-clamp-2" style={{ color: "var(--foreground)" }}>
                                        {q.question}
                                    </p>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                                <Brain size={48} className="mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-500 font-medium">No questions found matching your filters.</p>
                                <button
                                    onClick={() => { setSelectedYear("All"); setSelectedSubject("All"); setSelectedDifficulty("All") }}
                                    className="text-[var(--primary)] font-bold mt-2 hover:underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Start Quiz Card */}
                <div className="w-full md:w-80 sticky top-24">
                    <div className="bg-[var(--sidebar-bg)] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                <Award size={24} className="text-white" />
                            </div>

                            <h3 className="text-2xl font-bold mb-2">Ready to Practice?</h3>
                            <p className="text-teal-100 mb-6">
                                You have selected {filteredMCQs.length} questions. Start a timed quiz to test your knowledge.
                            </p>

                            <Link
                                href={`/mcqs/quiz?year=${selectedYear}&subject=${selectedSubject}&difficulty=${selectedDifficulty}`}
                                className="w-full py-3 bg-white text-[var(--sidebar-bg)] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors shadow-lg"
                            >
                                <Play size={20} fill="currentColor" />
                                Start Quiz
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Star size={18} className="text-orange-500 fill-orange-500" />
                            Your Progress
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-600 dark:text-slate-400">Accuracy</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{stats.accuracy}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-1000"
                                        style={{ width: `${stats.accuracy}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-600 dark:text-slate-400">Questions Solved</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{stats.questionsSolved}</span>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[var(--primary)] transition-all duration-1000"
                                        style={{ width: `${Math.min((stats.questionsSolved / 1000) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
