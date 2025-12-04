// e.g. src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@vercel/postgres";

export async function GET() {
  const client = createClient();

  try {
    await client.connect();

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    let sessionData;
    try {
      sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString("utf-8"));
    } catch (e) {
      console.error("Invalid session cookie:", e);
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userId = sessionData?.id;
    if (!userId) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Fetch user
    const userRes = await client.sql`
      SELECT id, username, xp, role, email, security_question
      FROM users
      WHERE id = ${userId}
      LIMIT 1
    `;
    const user = userRes.rows?.[0];

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Fetch streak
    const streakRes = await client.sql`
      SELECT current_streak
      FROM streaks
      WHERE user_id = ${userId}
      LIMIT 1
    `;
    const streak = streakRes.rows?.[0];

    const responseUser = {
      ...user,
      streak: streak?.current_streak ?? 0,
      xp: user.xp ?? 0,
    };

    return NextResponse.json({ user: responseUser }, { status: 200 });
  } catch (error) {
    console.error("Me Error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  } finally {
    try { await client.end(); } catch (e) { /* ignore cleanup errors */ }
  }
}
