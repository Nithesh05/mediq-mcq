import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { checkAchievements } from '@/lib/achievements';

export async function POST(request: Request) {
    try {
        const { type, details, score } = await request.json();

        if (!type) {
            return NextResponse.json({ error: "Activity type required" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        // Log Activity
        await db.run('INSERT INTO activity_log (user_id, activity_type, details, score) VALUES (?, ?, ?, ?)', [userId, type, details, score]);

        // Check for Achievements
        let newAchievements: any[] = [];

        // Check Quizzes Taken
        if (type === 'quiz_completed') {
            const count: any = await db.get('SELECT COUNT(*) as count FROM activity_log WHERE user_id = ? AND activity_type = ?', [userId, 'quiz_completed']);
            const unlocked = await checkAchievements(userId, 'quizzes_taken', count.count);
            newAchievements = [...newAchievements, ...unlocked];
        }

        // Check Perfect Score
        if (type === 'quiz_completed' && score === 100) {
            const unlocked = await checkAchievements(userId, 'perfect_score', 1);
            newAchievements = [...newAchievements, ...unlocked];
        }

        return NextResponse.json({ message: "Activity logged", newAchievements });

    } catch (error) {
        console.error("Log Activity Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
