import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session");

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString("utf-8"));
        const userId = sessionData.id;

        // Fetch Quiz Stats
        const stats: any = await db.get(
            `SELECT 
                COUNT(*) as quizzes_taken, 
                AVG(score) as average_score 
             FROM activity_log 
             WHERE user_id = ? AND activity_type = 'quiz_completed'`,
            [userId]
        );

        const quizzesTaken = stats?.quizzes_taken || 0;
        const averageScore = Math.round(stats?.average_score || 0);
        const questionsSolved = quizzesTaken * 10; // Assuming 10 questions per quiz

        return NextResponse.json({
            accuracy: averageScore,
            questionsSolved: questionsSolved
        });

    } catch (error) {
        console.error("Fetch Stats Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
