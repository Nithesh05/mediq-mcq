"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Flame, CheckCircle, Users, ImageIcon, Trophy, Star } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { useUser } from "@/hooks/useUser";
import { useStreak } from "@/context/StreakContext";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const { user, loading } = useUser();
  const { streak, level } = useStreak();
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

  return (
    <PageTransition className="container">
      {/* Header */}
      <header className="home-header flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          MEDIQ
        </motion.h1>
        {!loading && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {user ? (
              <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold flex items-center gap-2">
                  <Trophy size={16} />
                  <span>Level {level}</span>
                </div>
                <span className="font-bold text-slate-700">Hi, {user.username}</span>
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </motion.div>
        )}
      </header>

      <div className="hero-section">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hero-content"
        >
          <h2>
            Daily MCQs <br />
            Micro practice <br />
            <span className="highlight">Real medical mastery</span>
          </h2>
          <p style={{ color: "var(--foreground)", opacity: 0.8 }}>
            10 minutes a day, Year-wise MBBS syllabus.
            AI-assisted questions — expert-verified.
          </p>

          <div className="hero-actions">
            <Link href="/practice" className="btn btn-primary btn-large">
              Start Today — 10 MCQs
            </Link>
            <Link href="/syllabus" className="link-arrow">
              See Syllabus <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>

        {/* Hero Image / Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-visual"
        >
          {/* Abstract Phone Mockup */}
          <div className="phone-mockup">
            <div className="phone-notch"></div>
            <div className="phone-screen" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>

              {/* Streak Header */}
              <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#fff7ed', padding: '0.5rem 1rem', borderRadius: '2rem', color: '#ea580c', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  <Flame size={18} fill="currentColor" />
                  {streak > 0 ? `${streak} Day Streak` : "Start Streak"}
                </div>
              </div>

              {/* Progress Card */}
              <div className="stats-card" style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <Star size={24} fill="#f97316" color="#f97316" />
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>Your Progress</h3>
                </div>

                {/* Accuracy */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#64748b' }}>
                    <span>Accuracy</span>
                    <span style={{ color: '#0f172a' }}>{stats.accuracy}%</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.accuracy}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ height: '100%', backgroundColor: '#22c55e', borderRadius: '4px' }}
                    />
                  </div>
                </div>

                {/* Questions Solved */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#64748b' }}>
                    <span>Questions Solved</span>
                    <span style={{ color: '#0f172a' }}>{stats.questionsSolved}</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((stats.questionsSolved / 1000) * 100, 100)}%` }} // Cap at 100% for visual
                      transition={{ duration: 1, delay: 0.7 }}
                      style={{ height: '100%', backgroundColor: '#0f766e', borderRadius: '4px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decor elements */}
          <div className="blob blob-teal"></div>
          <div className="blob blob-orange"></div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="features-grid"
      >
        <FeatureItem
          icon={<Zap size={24} />}
          title="Fast daily practice"
          description="tailored to MBBS years"
          color="teal"
        />
        <FeatureItem
          icon={<ImageIcon size={24} />}
          title="Image & diagram MCQs"
          description="(hotspot support)"
          color="blue"
        />
        <FeatureItem
          icon={<CheckCircle size={24} />}
          title="Clean, non-coaching approach"
          description="— practice, don't pressure"
          color="indigo"
        />
        <FeatureItem
          icon={<Users size={24} />}
          title="Fun contests with friends"
          description="+ live leaderboards"
          color="orange"
        />
      </motion.div>

      {/* Mission & Vision */}
      <div className="mission-vision">
        <div className="mission-block">
          <h3>Mission</h3>
          <p>
            To help medical students build strong concepts and score better in university exams through daily, evidence based MCQ practice.
          </p>
        </div>
        <div className="vision-block">
          <h3>Vision</h3>
          <p>
            A confident generation of doctors who learn consistently, think clinically, and grow with smart daily habits.
          </p>
        </div>
      </div>

      {/* Powered By / About Logo */}
      <div className="powered-by-section">
        <p>Powered by</p>
        <img src="/nivax-logo.jpg" alt="Nivax" className="nivax-logo" />
      </div>
    </PageTransition>
  );
}

function FeatureItem({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    <motion.div
      variants={itemVariants}
      className="feature-item"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={`feature-icon bg-${color}`}>
        {icon}
      </div>
      <div className="feature-text">
        <h4 style={{ color: "var(--foreground)" }}>{title}</h4>
        <p style={{ color: "var(--foreground)", opacity: 0.8 }}>{description}</p>
      </div>
    </motion.div>
  );
}
