import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { amount } = await request.json();

        if (!amount || typeof amount !== 'number') {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        // Update XP
        await db.run('UPDATE users SET xp = xp + ? WHERE id = ?', [amount, userId]);

        // Get new total XP and current level
        const user: any = await db.get('SELECT xp, level FROM users WHERE id = ?', [userId]);

        // Calculate new level based on XP
        // Criteria: Level = 1 + floor(XP / 500)
        const newLevel = 1 + Math.floor(user.xp / 500);
        let leveledUp = false;

        if (newLevel > (user.level || 1)) {
            await db.run('UPDATE users SET level = ? WHERE id = ?', [newLevel, userId]);
            leveledUp = true;
        }

        return NextResponse.json({
            message: "XP updated",
            xp: user.xp,
            level: newLevel,
            leveledUp: leveledUp,
            updated: true
        });

    } catch (error) {
        console.error("XP Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
