import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { StreakProvider } from "@/context/StreakContext";

export const metadata: Metadata = {
  title: {
    default: "Mediq - Medical MCQ Practice Platform",
    template: "%s | Mediq"
  },
  description: "Free, AI-powered medical learning platform for MBBS students. Practice high-yield MCQs, track your progress, and master clinical concepts.",
  keywords: ["MBBS", "Medical MCQs", "NEET PG", "NEXT Exam", "Medical Education", "Clinical Practice", "AI Learning"],
  authors: [{ name: "Nivax Technologies" }],
  creator: "Nivax Technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mediq.vercel.app",
    title: "Mediq - Medical MCQ Practice Platform",
    description: "Master medical concepts with daily AI-generated MCQs and comprehensive study guides.",
    siteName: "Mediq",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mediq - Medical MCQ Practice Platform",
    description: "Master medical concepts with daily AI-generated MCQs and comprehensive study guides.",
    creator: "@nivaxtech",
  },
  icons: {
    icon: "/logo.jpg",
  },
};

import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";

import ClientOnly from "@/components/ClientOnly";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="main-layout">
        <ThemeProvider>
          <ClientOnly>
            <SoundProvider>
              <StreakProvider>
                <Sidebar />
                <main className="main-content">
                  {children}
                </main>
              </StreakProvider>
            </SoundProvider>
          </ClientOnly>
        </ThemeProvider>
      </body>
    </html>
  );
}
