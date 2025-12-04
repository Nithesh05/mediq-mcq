import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { username, email, securityQuestion, securityAnswer } = await request.json();
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        // Validate input
        if (username && username.length < 3) {
            return NextResponse.json({ error: 'Username must be at least 3 characters' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address format' }, { status: 400 });
        }

        // Check if username is taken by another user
        // Check if username is taken by another user
        if (username) {
            const existing = await db.get('SELECT id FROM users WHERE username = ? AND id != ?', [username, userId]);
            if (existing) {
                return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
            }
        }

        // Update user
        const updates = [];
        const params = [];

        if (username) {
            updates.push("username = ?");
            params.push(username);
        }
        if (email) {
            updates.push("email = ?");
            params.push(email);
        }
        if (securityQuestion && securityAnswer) {
            updates.push("security_question = ?");
            params.push(securityQuestion);
            updates.push("security_answer = ?");
            params.push(securityAnswer.toLowerCase());
        }

        if (updates.length > 0) {
            params.push(userId);
            await db.run(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`, params);
        }

        // Update session with new username if changed
        const newSessionData = { ...sessionData, ...(username && { username }) };
        const newSessionValue = Buffer.from(JSON.stringify(newSessionData)).toString('base64');

        cookieStore.set('session', newSessionValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return NextResponse.json({ message: 'Profile updated successfully', user: { username, email } });

    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
