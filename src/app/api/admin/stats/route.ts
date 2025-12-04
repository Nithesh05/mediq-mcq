import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));

        // Verify admin role
        const user: any = await db.get('SELECT role FROM users WHERE id = ?', [sessionData.id]);

        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Fetch stats
        const totalUsers: any = await db.get('SELECT COUNT(*) as count FROM users');
        const totalFeedback: any = await db.get('SELECT COUNT(*) as count FROM feedback');

        // Active users (users with activity in the last 7 days)
        // Note: This assumes activity_log is populated. If not, it might return 0.
        // Postgres uses NOW() - INTERVAL '7 days', SQLite uses datetime('now', '-7 days')
        // We need a cross-compatible query or conditional logic.
        // Simple fix: Calculate date in JS
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const dateStr = sevenDaysAgo.toISOString();

        const activeUsers: any = await db.get(`
            SELECT COUNT(DISTINCT user_id) as count 
            FROM activity_log 
            WHERE timestamp > ?
        `, [dateStr]);

        return NextResponse.json({
            totalUsers: totalUsers.count,
            totalFeedback: totalFeedback.count,
            activeUsers: activeUsers.count
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
