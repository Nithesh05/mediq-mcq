"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Globe, Rocket, Sparkles } from "lucide-react";
import PageTransition from "@/components/PageTransition";

export default function AboutPage() {
    return (
        <PageTransition className="container mx-auto p-6 max-w-4xl">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 overflow-hidden relative">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-70" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-orange-50 to-amber-50 rounded-full blur-3xl -ml-20 -mb-20 opacity-70" />

                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center justify-center p-3 bg-teal-50 rounded-2xl mb-6 text-[var(--primary)]">
                            <Rocket size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                            NIVAX <span className="text-[var(--primary)]">Technologies</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-medium">Where Intelligence Becomes Innovation</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <FeatureCard
                            icon={<Code size={24} />}
                            title="Modern Tech"
                            description="Built with cutting-edge frameworks for speed and scalability."
                            color="text-blue-500"
                            bg="bg-blue-50"
                        />
                        <FeatureCard
                            icon={<Cpu size={24} />}
                            title="AI Powered"
                            description="Integrating intelligent algorithms to enhance user experience."
                            color="text-purple-500"
                            bg="bg-purple-50"
                        />
                        <FeatureCard
                            icon={<Globe size={24} />}
                            title="Global Vision"
                            description="Creating tools that empower people to learn and grow everywhere."
                            color="text-teal-500"
                            bg="bg-teal-50"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-500">
                                NP
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 m-0">NITHESH P</h3>
                                <p className="text-[var(--primary)] font-semibold m-0">Founder & Lead Developer</p>
                            </div>
                        </div>

                        <p>
                            I am a developer building intelligent digital products powered by AI, Cloud Engineering, and modern automation.
                            At <strong>NIVAX Technologies</strong>, my work focuses on creating tools that simplify learning, enhance productivity, and bring innovative tech into everyday use.
                        </p>

                        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                            <Sparkles size={20} className="text-orange-500" /> Projects I’ve Built
                        </h3>
                        <ul className="space-y-4 list-none pl-0">
                            <ProjectItem
                                name="MEDIQ"
                                description="An AI-driven medical learning platform that helps students practice high-quality MCQs, track progress, strengthen weak topics, and learn smarter every day."
                            />
                            <ProjectItem
                                name="StartX"
                                description="A smart utility toolkit designed to simplify workflows for students, creators, and developers."
                            />
                            <ProjectItem
                                name="AI Meme Generator"
                                description="An intelligent tool that instantly creates memes using AI prompts."
                            />
                        </ul>

                        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center italic text-slate-500">
                            "My vision is to turn intelligence into practical innovation and build technology that empowers people to learn, create, and grow with simplicity."
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}

function FeatureCard({ icon, title, description, color, bg }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all"
        >
            <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center mb-4`}>
                {icon}
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
        </motion.div>
    );
}

function ProjectItem({ name, description }: any) {
    return (
        <li className="flex gap-3 items-start p-4 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="mt-1.5 w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
            <div>
                <strong className="text-slate-900 block mb-1">{name}</strong>
                <span className="text-slate-600 text-base">{description}</span>
            </div>
        </li>
    );
}
