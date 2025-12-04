import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const user: any = await db.get('SELECT * FROM users WHERE username = ?', [username]);

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Set session cookie (simple implementation for prototype)
        // In production, use a signed JWT or session ID in DB
        const sessionData = JSON.stringify({ id: user.id, username: user.username });
        const encodedSession = Buffer.from(sessionData).toString('base64');

        (await cookies()).set('session', encodedSession, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return NextResponse.json({ message: 'Logged in successfully', user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
