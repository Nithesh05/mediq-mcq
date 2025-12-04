import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

// Get Groups List
export async function GET() {
    try {
        const groups = await db.query(`
            SELECT g.*, u.username as host_name, COUNT(gm.user_id) as members
            FROM groups g
            JOIN users u ON g.host_id = u.id
            LEFT JOIN group_members gm ON g.id = gm.group_id
            GROUP BY g.id
            ORDER BY g.created_at DESC
        `);

        return NextResponse.json({ groups });
    } catch (error) {
        console.error("Fetch Groups Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Create Group
// Create Group
export async function POST(request: Request) {
    try {
        const { name, topic, isPrivate } = await request.json();

        if (!name) {
            return NextResponse.json({ error: "Group name required" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        // Generate Invite Code
        const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        // Create Group
        // For Postgres compatibility, we use RETURNING id
        const newGroup: any = await db.get(
            'INSERT INTO groups (name, topic, is_private, host_id, invite_code) VALUES (?, ?, ?, ?, ?) RETURNING id',
            [name, topic || "General", isPrivate ? 1 : 0, userId, inviteCode]
        );

        let groupId;
        if (newGroup && newGroup.id) {
            groupId = newGroup.id;
        }

        if (!groupId) {
            // Fallback if db.get didn't return (e.g. SQLite wrapper issue)
            const info: any = await db.run('INSERT INTO groups (name, topic, is_private, host_id, invite_code) VALUES (?, ?, ?, ?, ?)', [name, topic || "General", isPrivate ? 1 : 0, userId, inviteCode]);
            groupId = info.lastInsertRowid;
        }

        // Add host as member
        await db.run('INSERT INTO group_members (group_id, user_id) VALUES (?, ?)', [groupId, userId]);

        return NextResponse.json({ message: "Group created", group: { id: groupId, name, topic, isPrivate, hostId: userId, inviteCode } });

    } catch (error) {
        console.error("Create Group Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
