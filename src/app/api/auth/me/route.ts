import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));

        // Verify user still exists
        const user: any = await db.get('SELECT id, username, xp, role, email, security_question FROM users WHERE id = ?', [sessionData.id]);

        if (!user) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        // Get streak info
        const streak: any = await db.get('SELECT current_streak FROM streaks WHERE user_id = ?', [sessionData.id]);

        return NextResponse.json({ user: { ...user, streak: streak?.current_streak || 0, xp: user.xp || 0 } });
    } catch (error) {
        return NextResponse.json({ user: null }, { status: 200 });
    }
}
