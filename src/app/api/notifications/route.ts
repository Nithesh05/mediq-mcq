import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        const notifications = await db.query(`
            SELECT * FROM notifications 
            WHERE user_id = ? 
            ORDER BY created_at DESC 
            LIMIT 50
        `, [userId]);

        return NextResponse.json({ notifications });
    } catch (error) {
        console.error("Fetch Notifications Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, message, type } = await request.json();

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        // For Postgres compatibility, use RETURNING * if possible, or fetch after insert
        // Since our adapter abstracts this, we'll try to use a pattern that works for both or rely on the adapter's return
        // Ideally, the adapter's `run` returns lastID for SQLite. For Postgres, we might need a different approach if we want the ID.
        // But let's stick to the pattern we used in other files: insert then select, or use RETURNING if the adapter supports it.
        // The adapter's `run` returns { lastID, changes }.

        // Let's use the RETURNING clause which works in Postgres and modern SQLite
        const newItem: any = await db.get(
            'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?) RETURNING *',
            [userId, title, message, type || 'info']
        );

        // Fallback for older SQLite if RETURNING isn't supported (though we are using better-sqlite3 which is usually up to date)
        // If newItem is undefined, we might need to fetch it. But for now, let's assume RETURNING works or we just return success.

        return NextResponse.json({ notification: newItem });

    } catch (error) {
        console.error("Create Notification Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        // Mark all as read for this user
        await db.run('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [userId]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Update Notification Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
