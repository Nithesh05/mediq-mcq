import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const newPassword = searchParams.get('password');

    if (!username || !newPassword) {
        return NextResponse.json({ error: 'Missing username or password params' }, { status: 400 });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.run(
            'UPDATE users SET password_hash = ? WHERE username = ?',
            [hashedPassword, username]
        );

        return NextResponse.json({ message: `Password updated for ${username}` });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
