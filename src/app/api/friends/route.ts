import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

// Get Friends List
export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        const friends = await db.query(`
            SELECT u.id, u.username as name, u.xp, s.current_streak as streak
            FROM friends f
            JOIN users u ON (f.friend_id = u.id OR f.user_id = u.id)
            LEFT JOIN streaks s ON u.id = s.user_id
            WHERE (f.user_id = ? OR f.friend_id = ?) AND u.id != ?
        `, [userId, userId, userId]);

        return NextResponse.json({ friends });
    } catch (error) {
        console.error("Fetch Friends Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Add Friend
export async function POST(request: Request) {
    try {
        const { username } = await request.json();

        if (!username) {
            return NextResponse.json({ error: "Username required" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        // Find friend
        const friend: any = await db.get('SELECT id FROM users WHERE username = ?', [username]);

        if (!friend) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (friend.id === userId) {
            return NextResponse.json({ error: "Cannot add yourself" }, { status: 400 });
        }

        // Check if already friends
        const existing = await db.get('SELECT id FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)', [userId, friend.id, friend.id, userId]);

        if (existing) {
            return NextResponse.json({ error: "Already friends" }, { status: 400 });
        }

        // Add friend
        await db.run('INSERT INTO friends (user_id, friend_id) VALUES (?, ?)', [userId, friend.id]);

        return NextResponse.json({ message: "Friend added successfully", friend: { id: friend.id, name: username } });

    } catch (error) {
        console.error("Add Friend Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
