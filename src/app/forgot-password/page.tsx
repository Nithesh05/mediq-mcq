"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1); // 1: Username, 2: Security Question, 3: New Password
    const [username, setUsername] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckUsername = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "check_username", username }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "User not found");

            setSecurityQuestion(data.securityQuestion);
            setStep(2);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAnswer = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "verify_answer", username, securityAnswer }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Incorrect answer");

            setStep(3);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "reset_password", username, securityAnswer, newPassword }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to reset password");

            router.push("/login");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="auth-card"
            >
                <Link href="/login" className="auth-back-link">
                    <ArrowLeft size={18} /> Back to Login
                </Link>

                <h1 className="auth-title">Reset Password</h1>
                <p className="auth-subtitle">Recover your account access</p>

                {error && <div className="error-message">{error}</div>}

                {step === 1 && (
                    <form onSubmit={handleCheckUsername} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-input"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary w-full py-3">
                            {loading ? "Checking..." : "Next"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyAnswer} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Security Question</label>
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium">
                                {securityQuestion === "pet" ? "What is the name of your first pet?" :
                                    securityQuestion === "school" ? "What was the name of your first school?" :
                                        securityQuestion === "city" ? "In what city were you born?" :
                                            securityQuestion === "mother" ? "What is your mother's maiden name?" :
                                                securityQuestion}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Your Answer</label>
                            <input
                                type="text"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                                className="form-input"
                                placeholder="Enter your answer"
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary w-full py-3">
                            {loading ? "Verify..." : "Next"}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-input"
                                placeholder="Enter new password"
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary w-full py-3">
                            {loading ? "Reset Password..." : "Reset Password"}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
