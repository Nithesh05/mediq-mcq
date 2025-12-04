import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { action, username, securityAnswer, newPassword } = await request.json();

        if (!action || !username) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const user: any = await db.get('SELECT * FROM users WHERE username = ?', [username]);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (action === "check_username") {
            if (!user.security_question) {
                return NextResponse.json({ error: "Account recovery not set up for this user" }, { status: 400 });
            }
            return NextResponse.json({ securityQuestion: user.security_question });
        }

        if (action === "verify_answer") {
            if (!securityAnswer || user.security_answer?.toLowerCase() !== securityAnswer.toLowerCase()) {
                return NextResponse.json({ error: "Incorrect answer" }, { status: 401 });
            }
            return NextResponse.json({ verified: true });
        }

        if (action === "reset_password") {
            if (!securityAnswer || user.security_answer?.toLowerCase() !== securityAnswer.toLowerCase()) {
                return NextResponse.json({ error: "Incorrect answer" }, { status: 401 });
            }
            if (!newPassword) {
                return NextResponse.json({ error: "New password required" }, { status: 400 });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await db.run('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, user.id]);

            return NextResponse.json({ message: "Password reset successfully" });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
