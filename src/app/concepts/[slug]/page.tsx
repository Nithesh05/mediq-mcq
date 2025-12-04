"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { medicalConcepts } from "@/data/concepts";
import ConceptDetail from "@/components/ConceptDetail";

export default function ConceptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const concept = medicalConcepts.find((c) => c.slug === slug);

    if (!concept) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold text-slate-900">Concept Not Found</h1>
                <Link href="/concepts" className="text-[var(--primary)] hover:underline mt-4 inline-block">
                    Back to Concepts
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Link href="/concepts" className="inline-flex items-center gap-2 text-slate-500 hover:text-[var(--primary)] mb-8 transition-colors">
                <ArrowLeft size={18} /> Back to Concepts
            </Link>

            <ConceptDetail concept={concept} />
        </div>
    );
}
