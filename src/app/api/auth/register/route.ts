import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createClient } from "@vercel/postgres";

export async function POST(request: Request) {
    const client = createClient();

    try {
        await client.connect();

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
        const existingUser = await client.sql`
            SELECT * FROM users WHERE username = ${username} LIMIT 1
        `;

        if (existingUser.rows.length > 0) {
            return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const newUser = await client.sql`
            INSERT INTO users (username, email, password_hash, security_question, security_answer, role)
            VALUES (${username}, ${email}, ${hashedPassword}, ${securityQuestion}, ${securityAnswer.toLowerCase()}, 'user')
            RETURNING id
        `;

        const userId = newUser.rows?.[0]?.id;

        if (!userId) {
            throw new Error("Failed to create user");
        }

        // Initialize streak
        await client.sql`
            INSERT INTO streaks (user_id) VALUES (${userId})
        `;

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
        
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        try { await client.end(); } catch {}
    }
}
