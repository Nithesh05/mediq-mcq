'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('MCQ Page Error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
            <p className="text-slate-600 mb-6">
                We encountered an error while loading the questions.
                <br />
                <span className="text-sm font-mono bg-slate-100 p-1 rounded mt-2 inline-block">
                    {error.message || "Unknown error"}
                </span>
            </p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
                Try again
            </button>
        </div>
    );
}
