import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));

        // Verify admin role
        const user: any = await db.get('SELECT role FROM users WHERE id = ?', [sessionData.id]);

        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Fetch feedback with user details
        const feedback = await db.query(`
            SELECT f.id, f.content, f.rating, f.created_at, u.username 
            FROM feedback f
            JOIN users u ON f.user_id = u.id
            ORDER BY f.created_at DESC
        `);

        return NextResponse.json({ feedback });
    } catch (error) {
        console.error('Admin feedback error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
