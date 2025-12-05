import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user: any = await db.get(
      "SELECT id, username, password_hash FROM users WHERE username = ?",
      [username]
    );

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Set session cookie
    const sessionData = JSON.stringify({ id: user.id, username: user.username });
    const encodedSession = Buffer.from(sessionData).toString("base64");

    const cookieStore = await cookies();
    cookieStore.set("session", encodedSession, {
      httpOnly: true,
      secure: true, // Always secure in production/Vercel
      sameSite: "lax", // Required for modern browsers
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      message: "Logged in successfully",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error occurred",
      details: String(error)
    }, { status: 500 });
  }
}
