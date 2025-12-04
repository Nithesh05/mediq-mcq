"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Heart, Bug, Stethoscope, Search } from "lucide-react";
import { diseases } from "@/data/diseases";
import DiseaseDetail from "@/components/DiseaseDetail";

const iconMap: any = {
    Heart: Heart,
    Activity: Activity,
    Bug: Bug,
};

const years = ["All", "Year 1", "Year 2", "Year 3", "Year 4"];

export default function DiseasesPage() {
    const [selectedYear, setSelectedYear] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiResult, setAiResult] = useState<any>(null);

    const handleAISearch = async () => {
        if (!searchQuery) return;
        setIsGenerating(true);
        setAiResult(null);
        try {
            const res = await fetch('/api/generate-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: searchQuery, type: 'disease' })
            });
            const data = await res.json();
            if (data.data) {
                setAiResult({
                    ...data.data,
                    slug: searchQuery.toLowerCase().replace(/\s+/g, '-'),
                    subject: "AI Generated",
                    year: "AI",
                    icon: "Activity"
                });
            }
        } catch (error) {
            console.error("AI Search Failed", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const filteredDiseases = diseases.filter(d => {
        const yearMatch = selectedYear === "All" || d.year.includes(selectedYear);
        const searchMatch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.description.toLowerCase().includes(searchQuery.toLowerCase());
        return yearMatch && searchMatch;
    });

    return (
        <div className="container">
            <header className="page-header">
                <div className="syllabus-badge">
                    MBBS Syllabus Aligned
                </div>
                <h1 className="page-title">Disease Information</h1>
                <p className="page-subtitle">
                    Comprehensive guides on common diseases, categorized by subject and year.
                    Includes etiology, clinical features, and management protocols.
                </p>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mt-8 items-center">
                    <div className="relative flex-1 group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors pointer-events-none">
                            <Search size={22} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search any disease (e.g., Malaria, Dengue)..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setAiResult(null);
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && filteredDiseases.length === 0 && handleAISearch()}
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-teal-50 transition-all bg-white shadow-sm text-base"
                        />
                    </div>
                    <div className="no-scrollbar overflow-x-auto flex flex-nowrap gap-2 pb-2 md:pb-0 items-center">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium transition-all border ${selectedYear === year
                                    ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-md shadow-teal-200"
                                    : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
                                    }`}
                            >
                                {year === "All" ? "All Years" : `MBBS ${year}`}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div className="grid grid-2">
                {filteredDiseases.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDiseases.map((disease, index) => {
                            const Icon = iconMap[disease.icon] || Stethoscope;

                            return (
                                <motion.div
                                    key={disease.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/diseases/${disease.slug}`} className="block h-full">
                                        <div className="card">
                                            {/* Decorative background blob */}
                                            <div className="card-blob" />

                                            <div className="card-content">
                                                <div className="card-header">
                                                    <div className="card-icon-wrapper">
                                                        <Icon size={28} />
                                                    </div>
                                                    <div className="card-tags">
                                                        <span className="tag tag-slate">
                                                            {disease.subject}
                                                        </span>
                                                        <span className="tag tag-orange">
                                                            {disease.year}
                                                        </span>
                                                    </div>
                                                </div>

                                                <h2 className="card-title">
                                                    {disease.name}
                                                </h2>
                                                <p className="card-description">
                                                    {disease.description}
                                                </p>

                                                <div className="card-link">
                                                    Study Topic
                                                    <ArrowRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="col-span-full py-12">
                        {isGenerating ? (
                            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <div className="relative w-20 h-20 mb-6">
                                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-[var(--primary)] rounded-full border-t-transparent animate-spin"></div>
                                    <Activity className="absolute inset-0 m-auto text-[var(--primary)] animate-pulse" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Consulting Medical AI...</h3>
                                <p className="text-slate-500">Generating comprehensive study guide for "{searchQuery}"</p>
                            </div>
                        ) : aiResult ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 mb-8 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-teal-100 p-2 rounded-lg text-[var(--primary)]">
                                            <Activity size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-teal-900">AI Generated Content</h3>
                                            <p className="text-sm text-teal-700">Study guide generated for "{searchQuery}"</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setAiResult(null)}
                                        className="text-teal-600 hover:text-teal-800 font-medium text-sm"
                                    >
                                        Clear Result
                                    </button>
                                </div>

                                <DiseaseDetail disease={aiResult} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="text-slate-400" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">No local results found</h3>
                                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                                    We couldn't find "{searchQuery}" in our offline database. Would you like to use AI to generate a study guide?
                                </p>
                                <button
                                    onClick={handleAISearch}
                                    className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-medium hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 flex items-center gap-2"
                                >
                                    <Activity size={20} />
                                    Generate "{searchQuery}" with AI
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
