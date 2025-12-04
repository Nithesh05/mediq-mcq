"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, HelpCircle, ChevronRight, Activity, AlertCircle, Stethoscope, Pill } from "lucide-react";

interface DiseaseDetailProps {
    disease: {
        name: string;
        description: string;
        subject?: string;
        year?: string;
        content: {
            definition: string;
            causes: string[];
            symptoms: string[];
            diagnosis: string[];
            treatment: string[];
        };
        mcqs: {
            id: number;
            question: string;
            options: string[];
            correctAnswer: number;
            explanation: string;
        }[];
    };
}

export default function DiseaseDetail({ disease }: DiseaseDetailProps) {
    const [activeTab, setActiveTab] = useState<"learn" | "practice">("learn");
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});

    const handleOptionSelect = (questionId: number, optionIndex: number) => {
        if (showResults[questionId]) return;
        setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIndex });
    };

    const handleCheckAnswer = (questionId: number) => {
        setShowResults({ ...showResults, [questionId]: true });
    };

    const Section = ({ title, icon: Icon, children, colorClass }: any) => (
        <div className="mb-8 last:mb-0">
            <div className={`flex items-center gap-3 mb-4 ${colorClass}`}>
                <Icon size={24} />
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            </div>
            <div className="pl-9">
                {children}
            </div>
        </div>
    );

    return (
        <div>
            <header className="mb-10 bg-gradient-to-r from-[var(--sidebar-bg)] to-[var(--primary)] text-white p-10 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="relative z-10">
                    <div className="flex gap-3 mb-4">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10">
                            {disease.subject || "Medical"}
                        </span>
                        <span className="bg-orange-500/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10">
                            {disease.year || "General"}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{disease.name}</h1>
                    <p className="text-lg text-teal-50 max-w-2xl">{disease.description}</p>
                </div>
            </header>

            {/* Tabs */}
            <div className="flex gap-8 mb-8 border-b border-slate-200 px-4">
                <button
                    onClick={() => setActiveTab("learn")}
                    className={`pb-4 font-bold text-lg transition-colors relative flex items-center gap-2 ${activeTab === "learn" ? "text-[var(--primary)]" : "text-slate-400 hover:text-slate-600"
                        }`}
                >
                    <Activity size={20} />
                    Clinical Knowledge
                    {activeTab === "learn" && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--primary)] rounded-t-full" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("practice")}
                    className={`pb-4 font-bold text-lg transition-colors relative flex items-center gap-2 ${activeTab === "practice" ? "text-[var(--primary)]" : "text-slate-400 hover:text-slate-600"
                        }`}
                >
                    <CheckCircle size={20} />
                    Practice MCQs
                    {activeTab === "practice" && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--primary)] rounded-t-full" />
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm min-h-[500px]">
                {activeTab === "learn" ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                        <div className="text-xl leading-relaxed text-slate-700 mb-12 font-medium border-l-4 border-[var(--primary)] pl-6 py-2 bg-teal-50/50 rounded-r-xl">
                            {disease.content.definition}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <Section title="Causes & Risk Factors" icon={AlertCircle} colorClass="text-red-500">
                                    <ul className="space-y-3">
                                        {disease.content.causes.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </Section>

                                <Section title="Clinical Features" icon={Activity} colorClass="text-orange-500">
                                    <ul className="space-y-3">
                                        {disease.content.symptoms.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </Section>
                            </div>

                            <div>
                                <Section title="Diagnosis" icon={Stethoscope} colorClass="text-blue-500">
                                    <ul className="space-y-3">
                                        {disease.content.diagnosis.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </Section>

                                <Section title="Management" icon={Pill} colorClass="text-green-500">
                                    <ul className="space-y-3">
                                        {disease.content.treatment.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </Section>
                            </div>
                        </div>

                        <div className="mt-16 flex justify-center">
                            <button
                                onClick={() => setActiveTab("practice")}
                                className="btn btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-lg shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-1 transition-all"
                            >
                                Test Your Knowledge <ChevronRight size={24} />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10 max-w-3xl mx-auto">
                        {disease.mcqs && disease.mcqs.length > 0 ? (
                            disease.mcqs.map((mcq, idx) => {
                                const isAnswered = showResults[mcq.id];
                                const isCorrect = selectedAnswers[mcq.id] === mcq.correctAnswer;

                                return (
                                    <div key={mcq.id} className="border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-start gap-4 mb-6">
                                            <span className="bg-slate-800 text-white font-bold px-3 py-1 rounded-lg text-sm shadow-md">
                                                Q{idx + 1}
                                            </span>
                                            <h3 className="text-xl font-bold text-slate-900 leading-snug">{mcq.question}</h3>
                                        </div>

                                        <div className="space-y-3">
                                            {mcq.options.map((option, optIdx) => {
                                                let optionClass = "border-slate-200 hover:border-slate-300 hover:bg-slate-50";

                                                if (isAnswered) {
                                                    if (optIdx === mcq.correctAnswer) {
                                                        optionClass = "border-green-500 bg-green-50 text-green-700 font-semibold";
                                                    } else if (selectedAnswers[mcq.id] === optIdx) {
                                                        optionClass = "border-red-500 bg-red-50 text-red-700 font-semibold";
                                                    } else {
                                                        optionClass = "border-slate-100 opacity-40";
                                                    }
                                                } else if (selectedAnswers[mcq.id] === optIdx) {
                                                    optionClass = "border-[var(--primary)] bg-teal-50 text-[var(--primary)] font-semibold shadow-sm";
                                                }

                                                return (
                                                    <button
                                                        key={optIdx}
                                                        onClick={() => handleOptionSelect(mcq.id, optIdx)}
                                                        disabled={isAnswered}
                                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all text-lg flex items-center justify-between ${optionClass}`}
                                                    >
                                                        {option}
                                                        {isAnswered && optIdx === mcq.correctAnswer && <CheckCircle size={24} className="text-green-600" />}
                                                        {isAnswered && selectedAnswers[mcq.id] === optIdx && optIdx !== mcq.correctAnswer && <XCircle size={24} className="text-red-600" />}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {!isAnswered && selectedAnswers[mcq.id] !== undefined && (
                                            <div className="mt-6 flex justify-end">
                                                <button
                                                    onClick={() => handleCheckAnswer(mcq.id)}
                                                    className="btn btn-primary px-8 py-2.5 rounded-xl font-bold"
                                                >
                                                    Check Answer
                                                </button>
                                            </div>
                                        )}

                                        {isAnswered && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="mt-6"
                                            >
                                                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-blue-900 flex gap-4 items-start">
                                                    <div className="bg-blue-100 p-2 rounded-lg shrink-0">
                                                        <HelpCircle size={24} className="text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold mb-2 text-lg">Explanation</p>
                                                        <p className="leading-relaxed">{mcq.explanation}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <p>No practice questions available for this topic yet.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
