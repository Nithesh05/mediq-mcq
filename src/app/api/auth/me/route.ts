import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
  try {
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
    const user: any = await db.get(
      "SELECT id, username, xp, role, email, security_question FROM users WHERE id = ?",
      [userId]
    );

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Fetch streak
    const streak: any = await db.get(
      "SELECT current_streak FROM streaks WHERE user_id = ?",
      [userId]
    );

    const responseUser = {
      ...user,
      streak: streak?.current_streak ?? 0,
      xp: user.xp ?? 0,
    };

    return NextResponse.json({ user: responseUser }, { status: 200 });
  } catch (error) {
    console.error("Me Error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
