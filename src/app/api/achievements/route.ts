import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        const achievements = await db.query(`
            SELECT a.*, ua.unlocked_at 
            FROM achievements a
            LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
            ORDER BY ua.unlocked_at DESC, a.title ASC
        `, [userId]);

        return NextResponse.json({ achievements });

    } catch (error) {
        console.error("Fetch Achievements Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
