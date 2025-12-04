import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function GET() {
    try {
        // Fetch last 20 feedback items with usernames
        const feedback = await db.query(`
            SELECT f.id, f.content, f.rating, f.created_at, u.username 
            FROM feedback f 
            JOIN users u ON f.user_id = u.id 
            ORDER BY f.created_at DESC 
            LIMIT 20
        `);

        return NextResponse.json({ feedback });
    } catch (error) {
        console.error("Fetch Feedback Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { content, rating } = await request.json();

        if (!content || content.trim().length === 0) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        await db.run('INSERT INTO feedback (user_id, content, rating) VALUES (?, ?, ?)', [userId, content, rating || 5]);

        // Fetch the newly created item to return it (Postgres doesn't support lastInsertRowid easily in this adapter, so we fetch by user/content/time or just return success)
        // For simplicity and reliability across adapters, let's just return the input data or fetch the latest from this user
        const newItem = await db.get(`
            SELECT f.id, f.content, f.rating, f.created_at, u.username 
            FROM feedback f 
            JOIN users u ON f.user_id = u.id 
            WHERE f.user_id = ?
            ORDER BY f.id DESC
            LIMIT 1
        `, [userId]);

        return NextResponse.json({ message: "Feedback submitted", feedback: newItem });

    } catch (error) {
        console.error("Submit Feedback Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
