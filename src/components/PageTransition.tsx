"use client";

import { motion } from "framer-motion";
import React from "react";

interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

export default function PageTransition({ children, className, style }: PageTransitionProps) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}
