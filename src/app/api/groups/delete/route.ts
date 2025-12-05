import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session");

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let sessionData;
        try {
            sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString("utf-8"));
        } catch (e) {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 });
        }

        const userId = sessionData.id;

        const { groupId } = await req.json();

        if (!groupId) {
            return NextResponse.json({ error: "Group ID is required" }, { status: 400 });
        }

        // Fetch group to check ownership
        const group: any = await db.get("SELECT host_id FROM groups WHERE id = ?", [groupId]);

        if (!group) {
            return NextResponse.json({ error: "Group not found" }, { status: 404 });
        }

        // Verify user is admin OR the host
        const user: any = await db.get("SELECT role FROM users WHERE id = ?", [userId]);
        const isAdmin = user?.role === 'admin';
        const isHost = group.host_id === userId;

        if (!isAdmin && !isHost) {
            return NextResponse.json({ error: "Forbidden: You do not have permission to delete this group" }, { status: 403 });
        }

        // Delete group members first (foreign key constraint usually handles this if cascade is set, but to be safe)
        await db.query("DELETE FROM group_members WHERE group_id = ?", [groupId]);

        // Delete the group
        await db.query("DELETE FROM groups WHERE id = ?", [groupId]);

        return NextResponse.json({ success: true, message: "Group deleted successfully" });

    } catch (error) {
        console.error("Delete Group Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
