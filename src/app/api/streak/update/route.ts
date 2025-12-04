import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function POST() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        // Get current streak info
        const streakRecord: any = await db.get('SELECT * FROM streaks WHERE user_id = ?', [userId]);

        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        let newStreak = 1;

        if (streakRecord) {
            const lastActivity = streakRecord.last_activity_date;

            if (lastActivity === today) {
                // Already practiced today
                return NextResponse.json({
                    message: "Streak already updated for today",
                    streak: streakRecord.current_streak,
                    updated: false
                });
            }

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastActivity === yesterdayStr) {
                // Consecutive day
                newStreak = streakRecord.current_streak + 1;
            } else {
                // Streak broken (or first time after long break)
                newStreak = 1;
            }

            // Calculate new longest streak in JS for cross-db compatibility
            // (SQLite has MAX(a,b) scalar, Postgres uses GREATEST(a,b))
            const newLongest = Math.max(streakRecord.longest_streak || 0, newStreak);

            // Update streak
            await db.run(`
                UPDATE streaks 
                SET current_streak = ?, last_activity_date = ?, longest_streak = ?
                WHERE user_id = ?
            `, [newStreak, today, newLongest, userId]);

        } else {
            // First time ever
            await db.run(`
                INSERT INTO streaks (user_id, current_streak, last_activity_date, longest_streak)
                VALUES (?, ?, ?, ?)
            `, [userId, 1, today, 1]);
        }

        // Log activity
        await db.run(`
            INSERT INTO activity_log (user_id, activity_type)
            VALUES (?, ?)
        `, [userId, 'daily_practice']);

        return NextResponse.json({
            message: "Streak updated",
            streak: newStreak,
            updated: true
        });

    } catch (error) {
        console.error("Streak Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
