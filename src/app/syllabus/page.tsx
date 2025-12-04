"use client";

import { motion } from "framer-motion";
import { Book, GraduationCap, Stethoscope, Activity, Microscope, Pill, Scale, Users, Eye, Ear, HeartPulse, Scissors, Baby, Bone, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const phases = [
    {
        year: "First Professional (Year 1)",
        description: "Pre-Clinical Phase",
        color: "bg-teal-50 border-teal-200 text-teal-800",
        icon: Book,
        subjects: [
            { name: "Human Anatomy", icon: Bone, topics: ["Gross Anatomy", "Histology", "Embryology", "Neuroanatomy", "Genetics"] },
            { name: "Physiology", icon: Activity, topics: ["General Physiology", "Hematology", "Nerve-Muscle", "CVS", "Respiratory", "Excretory", "CNS", "Endocrine", "Reproductive"] },
            { name: "Biochemistry", icon: Microscope, topics: ["Cell Biology", "Enzymes", "Metabolism (Carbs, Lipids, Proteins)", "Vitamins", "Molecular Biology", "Clinical Biochemistry"] },
        ]
    },
    {
        year: "Second Professional (Year 2)",
        description: "Para-Clinical Phase",
        color: "bg-blue-50 border-blue-200 text-blue-800",
        icon: Microscope,
        subjects: [
            { name: "Pathology", icon: Microscope, topics: ["General Pathology", "Hematology", "Systemic Pathology", "Clinical Pathology"] },
            { name: "Microbiology", icon: Microscope, topics: ["General Microbiology", "Immunology", "Bacteriology", "Virology", "Parasitology", "Mycology"] },
            { name: "Pharmacology", icon: Pill, topics: ["General Pharmacology", "ANS", "CVS", "Renal", "CNS", "Chemotherapy", "Endocrine", "GIT"] },
        ]
    },
    {
        year: "Third Professional Part 1 (Year 3)",
        description: "Clinical Phase I",
        color: "bg-indigo-50 border-indigo-200 text-indigo-800",
        icon: Stethoscope,
        subjects: [
            { name: "Forensic Medicine & Toxicology", icon: Scale, topics: ["Medical Jurisprudence", "Autopsy", "Toxicology", "Sexual Jurisprudence"] },
            { name: "Community Medicine", icon: Users, topics: ["Epidemiology", "Health Administration", "Demography", "Nutrition", "Environment Health"] },
            { name: "Ophthalmology", icon: Eye, topics: ["Diseases of Eye", "Optics", "Community Ophthalmology"] },
            { name: "Otorhinolaryngology (ENT)", icon: Ear, topics: ["Diseases of Ear, Nose, Throat", "Head & Neck Surgery"] },
        ]
    },
    {
        year: "Third Professional Part 2 (Year 4)",
        description: "Clinical Phase II",
        color: "bg-purple-50 border-purple-200 text-purple-800",
        icon: GraduationCap,
        subjects: [
            { name: "General Medicine", icon: HeartPulse, topics: ["Cardiology", "Respiratory", "Gastroenterology", "Neurology", "Nephrology", "Endocrinology", "Infectious Diseases"] },
            { name: "General Surgery", icon: Scissors, topics: ["General Surgery", "GI Surgery", "Urology", "Neurosurgery", "Plastic Surgery", "Anesthesiology"] },
            { name: "Obstetrics & Gynecology", icon: Baby, topics: ["Antenatal Care", "Labor", "Postnatal Care", "Gynaecological Disorders", "Family Planning"] },
            { name: "Pediatrics", icon: Baby, topics: ["Growth & Development", "Nutrition", "Infectious Diseases", "Neonatology", "Systemic Pediatrics"] },
            { name: "Orthopedics", icon: Bone, topics: ["Fractures", "Dislocations", "Bone Diseases", "Traumatology"] },
        ]
    }
];

export default function SyllabusPage() {
    return (
        <PageTransition className="container mx-auto p-6 max-w-5xl">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">MBBS Syllabus</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Based on the Competency Based Medical Education (CBME) curriculum guidelines by the National Medical Commission (NMC) of India.
                </p>
            </header>

            <div className="space-y-12">
                {phases.map((phase, index) => (
                    <motion.div
                        key={phase.year}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${phase.color.replace('text-', 'bg-').replace('bg-', 'bg-opacity-20 ')}`}>
                                <phase.icon size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{phase.year}</h2>
                                <p className="text-slate-500 font-medium">{phase.description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {phase.subjects.map((subject, subIndex) => (
                                <motion.div
                                    key={subject.name}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                                            <subject.icon size={20} />
                                        </div>
                                        <h3 className="font-bold text-slate-800">{subject.name}</h3>
                                    </div>

                                    <ul className="space-y-2">
                                        {subject.topics.map((topic) => (
                                            <li key={topic} className="text-sm text-slate-600 flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Need detailed competency list?</h3>
                <p className="text-slate-500 mb-6">
                    The complete CBME curriculum document with specific competencies and learning objectives is available on the NMC website.
                </p>
                <a
                    href="https://www.nmc.org.in/information-desk/for-colleges/ug-curriculum/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--primary)] font-bold hover:underline"
                >
                    Visit NMC Official Website <ArrowRight size={16} />
                </a>
            </div>
        </PageTransition>
    );
}
