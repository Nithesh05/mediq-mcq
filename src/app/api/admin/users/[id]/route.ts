import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));

        // Verify admin role
        const admin: any = await db.get('SELECT role FROM users WHERE id = ?', [sessionData.id]);

        if (!admin || admin.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const userId = parseInt(id);

        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        // Prevent deleting yourself
        if (userId === sessionData.id) {
            return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
        }

        // Delete user and related data (Sequential for async compatibility)
        await db.run('DELETE FROM streaks WHERE user_id = ?', [userId]);
        await db.run('DELETE FROM activity_log WHERE user_id = ?', [userId]);
        await db.run('DELETE FROM feedback WHERE user_id = ?', [userId]);
        await db.run('DELETE FROM friends WHERE user_id = ? OR friend_id = ?', [userId, userId]);
        await db.run('DELETE FROM group_members WHERE user_id = ?', [userId]);
        await db.run('DELETE FROM user_achievements WHERE user_id = ?', [userId]);
        await db.run('DELETE FROM users WHERE id = ?', [userId]);

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Admin delete user error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
