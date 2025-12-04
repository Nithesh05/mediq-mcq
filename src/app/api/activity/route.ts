import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        const activity = await db.query(`
            SELECT * FROM activity_log 
            WHERE user_id = ? 
            ORDER BY timestamp DESC 
            LIMIT ?
        `, [userId, limit]);

        return NextResponse.json({ activity });

    } catch (error) {
        console.error("Fetch Activity Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
