"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, securityQuestion, securityAnswer }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            // Auto login after register
            const loginRes = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (loginRes.ok) {
                router.push("/");
                router.refresh();
            } else {
                router.push("/login");
            }
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
                <Link href="/" className="auth-back-link">
                    <ArrowLeft size={18} /> Back to Home
                </Link>

                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Join Mediq and start learning!</p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                            placeholder="Choose a username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Choose a password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Security Question</label>
                        <select
                            value={securityQuestion}
                            onChange={(e) => setSecurityQuestion(e.target.value)}
                            className="form-input"
                            required
                        >
                            <option value="">Select a question</option>
                            <option value="pet">What is the name of your first pet?</option>
                            <option value="school">What was the name of your first school?</option>
                            <option value="city">In what city were you born?</option>
                            <option value="mother">What is your mother's maiden name?</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Security Answer</label>
                        <input
                            type="text"
                            value={securityAnswer}
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                            className="form-input"
                            placeholder="Your answer"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full py-3"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account?{" "}
                    <Link href="/login" className="auth-link">
                        Log In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
