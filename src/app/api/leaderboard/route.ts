import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const leaderboard = await db.query(`
            SELECT id, username as name, xp, '👤' as avatar
            FROM users
            ORDER BY xp DESC
            LIMIT 10
        `);

        // Add rank
        const rankedLeaderboard = leaderboard.map((user: any, index: number) => ({
            ...user,
            rank: index + 1
        }));

        return NextResponse.json({ leaderboard: rankedLeaderboard });
    } catch (error) {
        console.error("Fetch Leaderboard Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
