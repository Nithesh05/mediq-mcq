import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { username, email, password, securityQuestion, securityAnswer } = await request.json();

        if (!username || !email || !password || !securityQuestion || !securityAnswer) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address format' }, { status: 400 });
        }

        // Check if username exists
        const existingUser = await db.get('SELECT id FROM users WHERE username = ?', [username]);

        if (existingUser) {
            return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        // Note: db.run returns { lastInsertRowid } for SQLite, but for Postgres via adapter we might need to handle it differently.
        // The adapter implementation for Postgres returns { changes, lastInsertRowid: null }.
        // So we should use RETURNING id for Postgres compatibility if we want the ID.
        // However, our adapter's 'run' method might not return the row even with RETURNING.
        // Let's use db.get with RETURNING for Postgres, but SQLite 'run' works differently.
        // To be safe and cross-compatible: Insert then Select.

        await db.run(
            'INSERT INTO users (username, email, password_hash, security_question, security_answer, role) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, securityQuestion, securityAnswer.toLowerCase(), 'user']
        );

        // Fetch the new user to get the ID (safe for both)
        const newUser: any = await db.get('SELECT id FROM users WHERE username = ?', [username]);

        if (!newUser) {
            throw new Error("Failed to create user");
        }

        // Initialize streak
        await db.run('INSERT INTO streaks (user_id) VALUES (?)', [newUser.id]);

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
