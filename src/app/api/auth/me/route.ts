import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
  const debug: any = {
    step: "start",
    cookieReceived: false,
    cookieValueLength: 0,
    decodingError: null,
    userId: null,
    dbUserFound: false,
    dbError: null
  };

  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      debug.step = "no_cookie";
      return NextResponse.json({ user: null, debug }, { status: 200 });
    }

    debug.cookieReceived = true;
    debug.cookieValueLength = sessionCookie.value.length;

    let sessionData;
    try {
      sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString("utf-8"));
      debug.sessionData = sessionData;
    } catch (e: any) {
      debug.step = "decoding_failed";
      debug.decodingError = e.message;
      return NextResponse.json({ user: null, debug }, { status: 200 });
    }

    const userId = sessionData?.id;
    debug.userId = userId;

    if (!userId) {
      debug.step = "no_user_id";
      return NextResponse.json({ user: null, debug }, { status: 200 });
    }

    // Fetch user
    try {
      const user: any = await db.get(
        "SELECT id, username, xp, role, email, security_question FROM users WHERE id = ?",
        [userId]
      );

      if (!user) {
        debug.step = "user_not_found_in_db";
        return NextResponse.json({ user: null, debug }, { status: 200 });
      }

      debug.dbUserFound = true;
      debug.username = user.username;

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

      return NextResponse.json({ user: responseUser, debug }, { status: 200 });
    } catch (dbErr: any) {
      debug.step = "db_error";
      debug.dbError = dbErr.message;
      return NextResponse.json({ user: null, debug }, { status: 200 });
    }

  } catch (error: any) {
    debug.step = "critical_error";
    debug.criticalError = error.message;
    return NextResponse.json({ user: null, debug }, { status: 200 });
  }
}
