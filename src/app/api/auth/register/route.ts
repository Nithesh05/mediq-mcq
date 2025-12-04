import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { username, email, password, securityQuestion, securityAnswer } = await request.json();

        if (!username || !email || !password || !securityQuestion || !securityAnswer) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address format' }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser) {
            return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        // Use RETURNING id to get the new user's ID (works in Postgres and SQLite 3.35+)
        const newUser: any = await db.get(
            'INSERT INTO users (username, email, password_hash, security_question, security_answer, role) VALUES (?, ?, ?, ?, ?, ?) RETURNING id',
            [username, email, hashedPassword, securityQuestion, securityAnswer.toLowerCase(), 'user']
        );

        const userId = newUser?.id;

        if (!userId) {
            throw new Error("Failed to create user");
        }

        // Initialize streak
        await db.run('INSERT INTO streaks (user_id) VALUES (?)', [userId]);

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
