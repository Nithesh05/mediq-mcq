import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@vercel/postgres";

export async function POST(request: Request) {
  const client = createClient();

  try {
    await client.connect();

    const { action, username, securityAnswer, newPassword } = await request.json();

    if (!action || !username) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Fetch user by username
    const res = await client.sql`
      SELECT id, security_question, security_answer
      FROM users
      WHERE username = ${username}
      LIMIT 1
    `;
    const user = res.rows?.[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the stored security question
    if (action === "check_username") {
      if (!user.security_question) {
        return NextResponse.json({ error: "Account recovery not set up for this user" }, { status: 400 });
      }
      return NextResponse.json({ securityQuestion: user.security_question });
    }

    // Verify the provided security answer
    if (action === "verify_answer") {
      if (!securityAnswer || (user.security_answer ?? "").toLowerCase() !== securityAnswer.toLowerCase()) {
        return NextResponse.json({ error: "Incorrect answer" }, { status: 401 });
      }
      return NextResponse.json({ verified: true });
    }

    // Reset password flow
    if (action === "reset_password") {
      if (!securityAnswer || (user.security_answer ?? "").toLowerCase() !== securityAnswer.toLowerCase()) {
        return NextResponse.json({ error: "Incorrect answer" }, { status: 401 });
      }
      if (!newPassword) {
        return NextResponse.json({ error: "New password required" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await client.sql`
        UPDATE users
        SET password_hash = ${hashedPassword}
        WHERE id = ${user.id}
      `;

      return NextResponse.json({ message: "Password reset successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    try { await client.end(); } catch (e) { /* ignore */ }
  }
}
