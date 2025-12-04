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

        // Fetch users (excluding sensitive data like password_hash)
        const users = await db.query(`
            SELECT id, username, role, xp, level, created_at 
            FROM users 
            ORDER BY created_at DESC
        `);

        return NextResponse.json({ users });
    } catch (error) {
        console.error('Admin users error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
