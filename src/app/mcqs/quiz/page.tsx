"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle, RefreshCw, Home, AlertCircle, Timer, Brain } from "lucide-react";
import { mcqDatabase, Question } from "@/data/mcqs";
import { useStreak } from "@/context/StreakContext";
import { useNotifications } from "@/hooks/useNotifications";

function QuizContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const yearParam = searchParams.get("year") || "All";
    const subjectParam = searchParams.get("subject") || "All";
    const difficultyParam = searchParams.get("difficulty") || "All";

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

    const { setStreak, setXP } = useStreak();
    const { sendPushNotification } = useNotifications();

    // Load and shuffle questions based on filters
    useEffect(() => {
        const filtered = mcqDatabase.filter((q) => {
            const yearMatch = yearParam === "All" || q.year.includes(yearParam);
            const subjectMatch = subjectParam === "All" || q.subject === subjectParam;
            const difficultyMatch = difficultyParam === "All" || q.difficulty === difficultyParam;
            return yearMatch && subjectMatch && difficultyMatch;
        });

        // Simple shuffle
        const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10); // Limit to 10 questions
        setQuestions(shuffled);
    }, [yearParam, subjectParam, difficultyParam]);

    // Timer
    useEffect(() => {
        if (showResult || questions.length === 0) return;
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
    }, [showResult, questions.length]);

    const updateStats = async (xpEarned: number) => {
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
                    details: `${subjectParam} Quiz (${difficultyParam})`,
                    score: percentage
                })
            });
            const data = await res.json();
            if (data.newAchievements && data.newAchievements.length > 0) {
                // console.log("Unlocked achievements:", data.newAchievements);
            }
        } catch (error) {
            console.error("Failed to log activity", error);
        }
    };

    // Trigger updates once when result is shown
    useEffect(() => {
        if (showResult && score > 0) {
            const xpEarned = score * 10;
            updateStats(xpEarned);
            logActivity();

            // Send Notification
            const percentage = Math.round((score / questions.length) * 100);
            sendPushNotification("Quiz Completed!", {
                body: `You scored ${percentage}% and earned ${xpEarned} XP!`,
                icon: "/favicon.ico"
            });
        }
    }, [showResult]);

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

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (questions.length === 0) {
        return (
            <div className="quiz-empty-state">
                <div className="empty-icon-wrapper">
                    <AlertCircle size={32} />
                </div>
                <h2>No Questions Found</h2>
                <p>
                    We couldn't find any questions matching your filters. Try adjusting them to find more content.
                </p>
                <button
                    onClick={() => router.back()}
                    className="btn btn-primary"
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="quiz-result-container">
                <div className="quiz-result-card">
                    <div className="result-icon-wrapper">
                        {percentage >= 70 ? (
                            <CheckCircle size={48} className="text-green" />
                        ) : (
                            <RefreshCw size={48} className="text-orange" />
                        )}
                    </div>

                    <h2>Quiz Completed!</h2>
                    <p className="result-subtitle">Here is how you performed</p>

                    <div className="result-stats-grid">
                        <div className="stat-box">
                            <div className="stat-value">{score}/{questions.length}</div>
                            <div className="stat-label">Score</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value text-primary">{percentage}%</div>
                            <div className="stat-label">Accuracy</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value text-orange">+{score * 10}</div>
                            <div className="stat-label">XP Earned</div>
                        </div>
                    </div>

                    <div className="result-actions">
                        <button
                            onClick={() => router.push('/mcqs')}
                            className="btn btn-secondary"
                        >
                            <Home size={20} />
                            Dashboard
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn btn-primary"
                        >
                            <RefreshCw size={20} />
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="quiz-container">
            {/* Header / Progress */}
            <div className="quiz-header">
                <div className="quiz-progress-section">
                    <button onClick={() => router.back()} className="close-btn">
                        <XCircle size={24} />
                    </button>
                    <div className="progress-bar-container">
                        <div className="progress-text">Question {currentIndex + 1}/{questions.length}</div>
                        <div className="progress-track">
                            <div
                                className="progress-fill"
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
                    <div className="question-card">
                        <div className="question-tags">
                            <span className="tag tag-slate">
                                {currentQuestion.subject}
                            </span>
                            <span className="tag tag-orange">
                                {currentQuestion.difficulty}
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
                                    optionClass += " option-selected";
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
                            className="explanation-card"
                        >
                            <h3 className="explanation-title">
                                <Brain size={18} />
                                Explanation
                            </h3>
                            <p className="explanation-text">
                                {currentQuestion.explanation}
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Footer Actions */}
            <div className="quiz-footer">
                <div className="quiz-footer-content">
                    <button
                        onClick={handleNext}
                        disabled={!isAnswered}
                        className={`btn-next ${isAnswered ? 'active' : 'disabled'}`}
                    >
                        {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function QuizPage() {
    return (
        <Suspense fallback={<div className="loading-state">Loading Quiz...</div>}>
            <QuizContent />
        </Suspense>
    );
}
