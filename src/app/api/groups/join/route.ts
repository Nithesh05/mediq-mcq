import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { groupId, inviteCode } = await request.json();

        if (!groupId && !inviteCode) {
            return NextResponse.json({ error: "Group ID or Invite Code required" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        const userId = sessionData.id;

        let targetGroupId = groupId;

        // If invite code provided, find group
        if (inviteCode) {
            const group = await db.get('SELECT id FROM groups WHERE invite_code = ?', [inviteCode]);
            if (!group) {
                return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });
            }
            targetGroupId = group.id;
        }

        // Check if already member
        const existing = await db.get('SELECT id FROM group_members WHERE group_id = ? AND user_id = ?', [targetGroupId, userId]);

        if (existing) {
            return NextResponse.json({ error: "Already a member" }, { status: 400 });
        }

        // Join Group
        await db.run('INSERT INTO group_members (group_id, user_id) VALUES (?, ?)', [targetGroupId, userId]);

        return NextResponse.json({ message: "Joined group successfully", groupId: targetGroupId });

    } catch (error) {
        console.error("Join Group Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
