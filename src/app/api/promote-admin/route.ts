import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: 'Missing username param' }, { status: 400 });
    }

    try {
        await db.run(
            "UPDATE users SET role = 'admin' WHERE username = ?",
            [username]
        );

        return NextResponse.json({ message: `User ${username} is now an ADMIN` });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
