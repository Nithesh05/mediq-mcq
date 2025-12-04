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

        const feedbackId = parseInt(id);

        if (isNaN(feedbackId)) {
            return NextResponse.json({ error: 'Invalid feedback ID' }, { status: 400 });
        }

        await db.run('DELETE FROM feedback WHERE id = ?', [feedbackId]);

        return NextResponse.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Admin delete feedback error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
