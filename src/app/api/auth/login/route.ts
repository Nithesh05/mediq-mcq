// src/app/api/auth/login/route.ts   (or wherever your file lives)
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@vercel/postgres";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const client = createClient();

  try {
    await client.connect();

    const { username, password } = await request.json();

    // Use the client.sql tagged template to safely inject params
    const result = await client.sql`
      SELECT id, username, password_hash
      FROM users
      WHERE username = ${username}
      LIMIT 1
    `;

    const user = result.rows?.[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Set session cookie (prototype simple implementation)
    const sessionData = JSON.stringify({ id: user.id, username: user.username });
    const encodedSession = Buffer.from(sessionData).toString("base64");

    (await cookies()).set("session", encodedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      message: "Logged in successfully",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    // best-effort cleanup (createClient() is lightweight)
    try {
      await client.end();
    } catch (e) {
      // ignore cleanup errors
    }
  }
}
