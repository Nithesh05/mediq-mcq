import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const isProd = process.env.NODE_ENV === 'production';
        const hasPostgres = !!process.env.POSTGRES_URL;
        const hasDatabaseUrl = !!process.env.DATABASE_URL;

        // Try a simple query
        let result;
        try {
            // Use a simple query that works in both SQLite and Postgres
            result = await db.get('SELECT 1 as val');
        } catch (dbError: any) {
            return NextResponse.json({
                status: "Database Connection Failed",
                error: dbError.message,
                stack: dbError.stack,
                env: {
                    NODE_ENV: process.env.NODE_ENV,
                    HAS_POSTGRES_URL: hasPostgres,
                    HAS_DATABASE_URL: hasDatabaseUrl
                }
            }, { status: 500 });
        }

        return NextResponse.json({
            status: "Database Connection Successful",
            result: result,
            env: {
                NODE_ENV: process.env.NODE_ENV,
                HAS_POSTGRES_URL: hasPostgres,
                HAS_DATABASE_URL: hasDatabaseUrl
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            error: "Unexpected Error",
            details: error.message
        }, { status: 500 });
    }
}
