import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: 'Missing username param' }, { status: 400 });
    }

    try {
        const user = await db.get("SELECT id FROM users WHERE username = ?", [username]);
        if (!user) {
            return NextResponse.json({ error: `User '${username}' not found` }, { status: 404 });
        }

        await db.run(
            "UPDATE users SET role = 'admin' WHERE username = ?",
            [username]
        );

        return NextResponse.json({
            message: `User ${username} is now an ADMIN`,
            action: "Please refresh your page to see the Admin Dashboard."
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
