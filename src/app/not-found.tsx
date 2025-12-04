"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <AlertCircle size={48} className="text-slate-400" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-slate-900 mb-4"
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-500 mb-8 text-lg"
                >
                    Oops! The page you are looking for might have been removed or doesn't exist.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/"
                        className="btn btn-primary flex items-center justify-center gap-2"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                    <Link
                        href="/practice"
                        className="btn btn-secondary flex items-center justify-center gap-2"
                    >
                        <Search size={20} />
                        Browse Practice
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
