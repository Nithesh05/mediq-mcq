"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Zap, ArrowRight, CheckCircle, XCircle, RefreshCw, Timer, AlertCircle, Calendar } from "lucide-react";
import { useStreak } from "@/context/StreakContext";
import { useUser } from "@/hooks/useUser";
import PageTransition from "@/components/PageTransition";

// Mock Question Type
interface AIQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const DAILY_TOPICS = [
    "Diabetes Mellitus", "Hypertension", "Cranial Nerves", "Malaria", "Tuberculosis",
    "Myocardial Infarction", "Asthma", "Renal Failure", "Antibiotics", "Anemia",
    "Pneumonia", "Stroke", "Epilepsy", "Thyroid Disorders", "Peptic Ulcer Disease",
    "Hepatitis", "HIV/AIDS", "Meningitis", "Appendicitis", "Fractures",
    "Pregnancy Complications", "Neonatal Jaundice", "Depression", "Schizophrenia", "Dermatitis",
    "Glaucoma", "Otitis Media", "Rheumatoid Arthritis", "Osteoporosis", "Gout"
];

import ClientOnly from "@/components/ClientOnly";

export default function AIMCQGenerator() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClientOnly>
                <AIMCQContent />
            </ClientOnly>
        </Suspense>
    );
}

function AIMCQContent() {
    // ... (keep existing state/hooks) ...
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");
    const isDaily = mounted && mode === "daily";
    const { user, loading } = useUser();
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Medium");
    const [isGenerating, setIsGenerating] = useState(false);
    const [quizReady, setQuizReady] = useState(false);

    // Quiz State
    const [questions, setQuestions] = useState<AIQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes for AI quiz

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // If no user (and not loading), don't render content (will redirect)
    if (!user) {
        return null;
    }

    // Auto-start for Daily Mode
    useEffect(() => {
        if (isDaily && !quizReady && !isGenerating && !topic) {
            const randomTopic = DAILY_TOPICS[Math.floor(Math.random() * DAILY_TOPICS.length)];
            setTopic(randomTopic);
            setDifficulty("Medium");
            handleGenerate(randomTopic);
        }
    }, [isDaily, user]);

    const handleGenerate = async (selectedTopic = topic) => {
        if (!selectedTopic.trim()) return;

        setIsGenerating(true);
        setQuestions([]); // Clear previous questions

        try {
            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: selectedTopic, difficulty }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate questions");
            }

            setQuestions(data.questions);
            setQuizReady(true);
            setTimeLeft(300);
            setCurrentIndex(0);
            setScore(0);
            setShowResult(false);
            setIsAnswered(false);
            setSelectedOption(null);
        } catch (error) {
            console.error("Generation Error:", error);
            alert("Error: " + (error instanceof Error ? error.message : "Something went wrong"));
        } finally {
            setIsGenerating(false);
        }
    };

    // Timer Logic
    useEffect(() => {
        if (!quizReady || showResult) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowResult(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [quizReady, showResult]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionClick = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === questions[currentIndex].correctAnswer) {
            setScore((prev) => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    const { setStreak, setXP, setLevel } = useStreak();
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [newLevel, setNewLevel] = useState(0);

    const updateStats = async (xpEarned: number) => {
        // User is guaranteed to be logged in here due to the check above
        try {
            // Update Streak
            const streakRes = await fetch("/api/streak/update", { method: "POST" });
            const streakData = await streakRes.json();
            if (streakData.updated) {
                setStreak(streakData.streak);
            }

            // Update XP
            const xpRes = await fetch("/api/xp/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: xpEarned })
            });
            const xpData = await xpRes.json();
            if (xpData.updated) {
                setXP(xpData.xp);
                if (xpData.leveledUp) {
                    setLevel(xpData.level);
                    setNewLevel(xpData.level);
                    setShowLevelUp(true);
                }
            }

        } catch (err) {
            console.error("Failed to update stats", err);
        }
    };

    const logActivity = async () => {
        try {
            const percentage = Math.round((score / questions.length) * 100);
            const res = await fetch('/api/activity/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'quiz_completed',
                    details: `${topic} Quiz (${difficulty})`,
                    score: percentage
                })
            });
            const data = await res.json();
            if (data.newAchievements && data.newAchievements.length > 0) {
                // Could show achievement unlock modal here
                // console.log("Unlocked achievements:", data.newAchievements);
            }
        } catch (error) {
            console.error("Failed to log activity", error);
        }
    };

    // Trigger updates once when result is shown
    useEffect(() => {
        if (showResult && (isDaily || score > 0)) {
            const xpEarned = score * (isDaily ? 20 : 15);
            updateStats(xpEarned);
            logActivity();
        }
    }, [showResult]);

    if (showResult) {
        const xpEarned = score * (isDaily ? 20 : 15);
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="quiz-result-container">
                <div className="quiz-result-card">
                    <div className="result-icon-wrapper bg-purple-50">
                        <Sparkles size={48} className="text-purple" />
                    </div>

                    <h2>{isDaily ? "Daily Challenge Complete!" : "AI Quiz Complete!"}</h2>
                    <p className="result-subtitle">You mastered the topic: <span className="font-bold text-purple">{topic}</span></p>

                    <div className="result-stats-grid">
                        <div className="stat-box">
                            <div className="stat-value">{score}/{questions.length}</div>
                            <div className="stat-label">Score</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value text-purple">{percentage}%</div>
                            <div className="stat-label">Accuracy</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value text-orange">+{score * (isDaily ? 20 : 15)}</div>
                            <div className="stat-label">XP Earned</div>
                        </div>
                    </div>

                    <div className="result-actions">
                        <button
                            onClick={() => {
                                setQuizReady(false);
                                if (isDaily) {
                                    window.location.href = "/practice";
                                } else {
                                    // Reset for new topic
                                    setTopic("");
                                    setQuestions([]);
                                    setScore(0);
                                    setShowResult(false);
                                }
                            }}
                            className="btn btn-secondary"
                        >
                            <RefreshCw size={20} />
                            {isDaily ? "Back to Practice" : "New Topic"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (quizReady) {
        const currentQuestion = questions[currentIndex];
        return (
            <div className="quiz-container">
                {/* Header */}
                <div className="quiz-header">
                    <div className="quiz-progress-section">
                        <button onClick={() => setQuizReady(false)} className="close-btn">
                            <XCircle size={24} />
                        </button>
                        <div className="progress-bar-container">
                            <div className="progress-text">
                                {isDaily ? "Daily Challenge" : "AI Question"} {currentIndex + 1}/{questions.length}
                            </div>
                            <div className="progress-track">
                                <div
                                    className="progress-fill bg-purple"
                                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`quiz-timer ${timeLeft < 60 ? 'timer-warning' : ''}`}>
                        <Timer size={20} />
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="question-card border-purple">
                            <div className="question-tags">
                                <span className="tag bg-purple-light text-purple">
                                    {topic}
                                </span>
                                <span className="tag tag-orange">
                                    {difficulty}
                                </span>
                                <span className="tag bg-blue-light text-blue flex items-center gap-1">
                                    <Sparkles size={12} /> {isDaily ? "Daily Challenge" : "AI Generated"}
                                </span>
                            </div>

                            <h2 className="question-text">
                                {currentQuestion.question}
                            </h2>

                            <div className="options-list">
                                {currentQuestion.options.map((option, idx) => {
                                    let optionClass = "option-btn";

                                    if (isAnswered) {
                                        if (idx === currentQuestion.correctAnswer) {
                                            optionClass += " option-correct";
                                        } else if (idx === selectedOption) {
                                            optionClass += " option-wrong";
                                        } else {
                                            optionClass += " option-disabled";
                                        }
                                    } else if (selectedOption === idx) {
                                        optionClass += " option-selected-purple";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionClick(idx)}
                                            disabled={isAnswered}
                                            className={optionClass}
                                        >
                                            <span>{option}</span>
                                            {isAnswered && idx === currentQuestion.correctAnswer && (
                                                <CheckCircle size={20} className="icon-correct" />
                                            )}
                                            {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswer && (
                                                <XCircle size={20} className="icon-wrong" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Explanation */}
                        {isAnswered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="explanation-card bg-purple-light border-purple"
                            >
                                <h3 className="explanation-title text-purple-dark">
                                    <Brain size={18} />
                                    AI Explanation
                                </h3>
                                <p className="explanation-text text-purple-dark">
                                    {currentQuestion.explanation}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Footer */}
                <div className="quiz-footer">
                    <div className="quiz-footer-content">
                        <button
                            onClick={handleNext}
                            disabled={!isAnswered}
                            className={`btn-next ${isAnswered ? 'btn-purple' : 'disabled'}`}
                        >
                            {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ai-container">
            <div className="ai-header">
                <div className="ai-icon-wrapper">
                    {mounted && isDaily ? <Calendar size={32} className="text-purple" /> : <Sparkles size={32} className="text-purple" />}
                </div>
                <h1 className="text-slate-900 dark:text-white">
                    {mounted && isDaily ? "Daily AI Challenge" : "AI MCQ Generator"}
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                    {mounted ? (
                        isDaily
                            ? "Your daily dose of high-yield practice. Today's topic is auto-selected for you."
                            : "Enter any medical topic, and our AI will instantly generate high-yield exam questions for you to practice."
                    ) : (
                        "Loading..."
                    )}
                </p>
            </div>

            <div className="ai-input-card bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                {/* Decorative Blobs */}
                <div className="blob blob-purple" />
                <div className="blob blob-blue" />

                {mounted && isDaily ? (
                    <div className="text-center py-12">
                        {isGenerating ? (
                            <div className="flex flex-col items-center gap-4">
                                <RefreshCw size={48} className="spin text-purple" />
                                <h3 className="text-xl font-bold text-slate-800">Generating Your Daily Challenge...</h3>
                                <p className="text-slate-500">Topic: <span className="font-bold text-purple">{topic}</span></p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4">
                                <Zap size={48} className="text-yellow-500" />
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Ready to Start?</h3>
                                <p className="text-slate-500 dark:text-slate-400">Topic: <span className="font-bold text-purple">{topic}</span></p>
                                <button
                                    onClick={() => handleGenerate(topic)}
                                    className="btn btn-primary px-8 py-3 rounded-xl font-bold"
                                >
                                    Start Challenge
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="ai-form">
                        <div className="form-group">
                            <label className="text-slate-700 dark:text-slate-300">What do you want to practice?</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g. Cranial Nerves, Diabetes, Malaria..."
                                className="ai-input bg-white dark:bg-slate-700 text-slate-900 dark:text-white border-slate-200 dark:border-slate-600"
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-slate-700 dark:text-slate-300">Difficulty Level</label>
                            <div className="difficulty-grid">
                                {["Easy", "Medium", "Hard"].map((lvl) => (
                                    <button
                                        key={lvl}
                                        onClick={() => setDifficulty(lvl)}
                                        className={`difficulty-btn ${difficulty === lvl ? 'active' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => handleGenerate()}
                            disabled={!topic.trim() || isGenerating}
                            className={`generate-btn ${!topic.trim() || isGenerating ? 'disabled' : ''}`}
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw size={24} className="spin" />
                                    Generating Questions...
                                </>
                            ) : (
                                <>
                                    <Zap size={24} fill="currentColor" />
                                    Generate Quiz
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {mounted && !isDaily && (
                <div className="ai-features">
                    <div className="feature-card bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <div className="feature-icon-wrapper bg-blue-light text-blue">
                            <Brain size={24} />
                        </div>
                        <h3 className="text-slate-900 dark:text-white">Smart Context</h3>
                        <p className="text-slate-500 dark:text-slate-400">Questions adapted to your selected difficulty and topic.</p>
                    </div>
                    <div className="feature-card bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <div className="feature-icon-wrapper bg-green-light text-green">
                            <CheckCircle size={24} />
                        </div>
                        <h3 className="text-slate-900 dark:text-white">Instant Feedback</h3>
                        <p className="text-slate-500 dark:text-slate-400">Detailed explanations generated for every question.</p>
                    </div>
                    <div className="feature-card bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <div className="feature-icon-wrapper bg-orange-light text-orange">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-slate-900 dark:text-white">Unlimited Practice</h3>
                        <p className="text-slate-500 dark:text-slate-400">Never run out of questions. Generate as many as you need.</p>
                    </div>
                </div>
            )}
            {showLevelUp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl border-4 border-yellow-400"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block mb-4"
                        >
                            <Sparkles size={64} className="text-yellow-500" />
                        </motion.div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">LEVEL UP!</h2>
                        <p className="text-slate-500 mb-6">You reached <span className="font-bold text-purple text-xl">Level {newLevel}</span></p>
                        <button
                            onClick={() => setShowLevelUp(false)}
                            className="btn btn-primary w-full py-3 text-lg font-bold"
                        >
                            Awesome!
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
