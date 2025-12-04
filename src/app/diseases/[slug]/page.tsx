"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { diseases } from "@/data/diseases";
import DiseaseDetail from "@/components/DiseaseDetail";

export default function DiseaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const disease = diseases.find((d) => d.slug === slug);

    if (!disease) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold text-slate-900">Disease Not Found</h1>
                <Link href="/diseases" className="text-[var(--primary)] hover:underline mt-4 inline-block">
                    Back to Diseases
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <Link href="/diseases" className="inline-flex items-center gap-2 text-slate-500 hover:text-[var(--primary)] mb-8 transition-colors font-medium">
                <ArrowLeft size={18} /> Back to Diseases
            </Link>

            <DiseaseDetail disease={disease} />
        </div>
    );
}
