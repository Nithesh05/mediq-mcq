import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    console.log("[Auth Me] Checking session...");

    if (!sessionCookie) {
      console.log("[Auth Me] No session cookie found.");
      return NextResponse.json({ user: null }, { status: 200 });
    }

    let sessionData;
    try {
      sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString("utf-8"));
      console.log("[Auth Me] Session data decoded:", sessionData);
    } catch (e) {
      console.error("[Auth Me] Invalid session cookie format:", e);
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userId = sessionData?.id;
    if (!userId) {
      console.log("[Auth Me] No user ID in session.");
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Fetch user
    console.log("[Auth Me] Fetching user from DB:", userId);
    const user: any = await db.get(
      "SELECT id, username, xp, role, email, security_question FROM users WHERE id = ?",
      [userId]
    );

    if (!user) {
      console.log("[Auth Me] User not found in DB.");
      return NextResponse.json({ user: null }, { status: 200 });
    }

    console.log("[Auth Me] User found:", user.username);

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
    console.error("[Auth Me] Critical Error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
