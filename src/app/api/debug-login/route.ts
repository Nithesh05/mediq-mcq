import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    const report: any = {
        step1_connection: "pending",
        step2_table_check: "pending",
        step3_user_check: "pending",
        env_vars: {
            NODE_ENV: process.env.NODE_ENV,
            HAS_POSTGRES_URL: !!process.env.POSTGRES_URL,
            HAS_DATABASE_URL: !!process.env.DATABASE_URL
        },
        errors: []
    };

    try {
        // Step 1: Test Connection
        try {
            await db.query('SELECT 1');
            report.step1_connection = "success";
        } catch (e: any) {
            report.step1_connection = "failed";
            report.errors.push({ step: 1, message: e.message, stack: e.stack });
            throw new Error("Connection failed: " + e.message);
        }

        // Step 2: Check Tables
        try {
            // Try to select from users
            await db.query('SELECT count(*) FROM users');
            report.step2_table_check = "success (table exists)";
        } catch (e: any) {
            report.step2_table_check = "failed (table likely missing)";
            report.errors.push({ step: 2, message: e.message });

            // Attempt to create table
            try {
                await db.query(`
                    CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY,
                        username TEXT UNIQUE NOT NULL,
                        password_hash TEXT NOT NULL,
                        xp INTEGER DEFAULT 0,
                        security_question TEXT,
                        security_answer TEXT,
                        role TEXT DEFAULT 'user',
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        email TEXT,
                        level INTEGER DEFAULT 1
                    )
                `);
                report.step2_table_check = "success (table created)";
            } catch (createError: any) {
                report.step2_table_check = "failed (creation failed)";
                report.errors.push({ step: 2, action: "create", message: createError.message });
            }
        }

        // Step 3: Check Users
        try {
            const users: any = await db.query('SELECT id, username FROM users LIMIT 5');
            report.step3_user_check = `found ${users.length} users`;
            report.users_found = users;
        } catch (e: any) {
            report.step3_user_check = "failed";
            report.errors.push({ step: 3, message: e.message });
        }

        return NextResponse.json({ status: "Debug Complete", report }, { status: 200 });

    } catch (fatalError: any) {
        return NextResponse.json({
            status: "Debug Failed",
            error: fatalError.message,
            report
        }, { status: 500 });
    }
}
