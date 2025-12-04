"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, HelpCircle, ChevronRight } from "lucide-react";

interface ConceptDetailProps {
    concept: {
        title: string;
        description: string;
        content: {
            introduction: string;
            keyPoints: string[];
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

export default function ConceptDetail({ concept }: ConceptDetailProps) {
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

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">{concept.title}</h1>
                <p className="text-xl text-slate-600">{concept.description}</p>
            </header>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab("learn")}
                    className={`pb-4 px-4 font-semibold text-lg transition-colors relative ${activeTab === "learn" ? "text-[var(--primary)]" : "text-slate-500 hover:text-slate-700"
                        }`}
                >
                    Learn
                    {activeTab === "learn" && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--primary)] rounded-t-full" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("practice")}
                    className={`pb-4 px-4 font-semibold text-lg transition-colors relative ${activeTab === "practice" ? "text-[var(--primary)]" : "text-slate-500 hover:text-slate-700"
                        }`}
                >
                    Practice MCQs
                    {activeTab === "practice" && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--primary)] rounded-t-full" />
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm min-h-[400px]">
                {activeTab === "learn" ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
                        <p className="text-lg text-slate-700 leading-relaxed mb-8">
                            {concept.content.introduction}
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Points</h2>
                        <ul className="space-y-3">
                            {concept.content.keyPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-lg text-slate-700">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-12 flex justify-end">
                            <button
                                onClick={() => setActiveTab("practice")}
                                className="btn btn-primary flex items-center gap-2 px-6 py-3 rounded-xl"
                            >
                                Start Practice <ChevronRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                        {concept.mcqs && concept.mcqs.length > 0 ? (
                            concept.mcqs.map((mcq, idx) => {
                                const isAnswered = showResults[mcq.id];
                                const isCorrect = selectedAnswers[mcq.id] === mcq.correctAnswer;

                                return (
                                    <div key={mcq.id} className="border-b border-slate-100 pb-8 last:border-0">
                                        <div className="flex items-start gap-4 mb-4">
                                            <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-lg text-sm">
                                                Q{idx + 1}
                                            </span>
                                            <h3 className="text-xl font-semibold text-slate-900">{mcq.question}</h3>
                                        </div>

                                        <div className="space-y-3 pl-12">
                                            {mcq.options.map((option, optIdx) => {
                                                let optionClass = "border-slate-200 hover:border-slate-300 hover:bg-slate-50";

                                                if (isAnswered) {
                                                    if (optIdx === mcq.correctAnswer) {
                                                        optionClass = "border-green-500 bg-green-50 text-green-700";
                                                    } else if (selectedAnswers[mcq.id] === optIdx) {
                                                        optionClass = "border-red-500 bg-red-50 text-red-700";
                                                    } else {
                                                        optionClass = "border-slate-200 opacity-50";
                                                    }
                                                } else if (selectedAnswers[mcq.id] === optIdx) {
                                                    optionClass = "border-[var(--primary)] bg-teal-50 text-[var(--primary)]";
                                                }

                                                return (
                                                    <button
                                                        key={optIdx}
                                                        onClick={() => handleOptionSelect(mcq.id, optIdx)}
                                                        disabled={isAnswered}
                                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex items-center justify-between ${optionClass}`}
                                                    >
                                                        {option}
                                                        {isAnswered && optIdx === mcq.correctAnswer && <CheckCircle size={20} className="text-green-600" />}
                                                        {isAnswered && selectedAnswers[mcq.id] === optIdx && optIdx !== mcq.correctAnswer && <XCircle size={20} className="text-red-600" />}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {!isAnswered && selectedAnswers[mcq.id] !== undefined && (
                                            <div className="pl-12 mt-4">
                                                <button
                                                    onClick={() => handleCheckAnswer(mcq.id)}
                                                    className="btn btn-primary px-6 py-2 rounded-lg text-sm"
                                                >
                                                    Check Answer
                                                </button>
                                            </div>
                                        )}

                                        {isAnswered && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="pl-12 mt-4"
                                            >
                                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 flex gap-3 items-start">
                                                    <HelpCircle size={20} className="shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-bold mb-1">Explanation:</p>
                                                        <p>{mcq.explanation}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <p>No practice questions available for this concept yet.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
