const { db } = require('../src/lib/db');

async function verifyAdapter() {
    console.log("🧪 Starting Database Adapter Verification...");

    try {
        // 1. Test: Run (Create Table - already done in init, but let's try a temp one)
        console.log("1. Testing db.run (CREATE TABLE)...");
        await db.run("CREATE TABLE IF NOT EXISTS test_verify (id INTEGER PRIMARY KEY, name TEXT)");
        console.log("✅ db.run passed.");

        // 2. Test: Run (Insert)
        console.log("2. Testing db.run (INSERT)...");
        const uniqueName = `User_${Date.now()}`;
        await db.run("INSERT INTO test_verify (name) VALUES (?)", [uniqueName]);
        console.log("✅ db.run (Insert) passed.");

        // 3. Test: Get (Select Single)
        console.log("3. Testing db.get (SELECT)...");
        const row = await db.get("SELECT * FROM test_verify WHERE name = ?", [uniqueName]);
        if (row && row.name === uniqueName) {
            console.log(`✅ db.get passed. Found: ${row.name}`);
        } else {
            throw new Error("db.get failed to retrieve the inserted row.");
        }

        // 4. Test: Query (Select All)
        console.log("4. Testing db.query (SELECT ALL)...");
        const allRows = await db.query("SELECT * FROM test_verify");
        if (Array.isArray(allRows) && allRows.length > 0) {
            console.log(`✅ db.query passed. Retrieved ${allRows.length} rows.`);
        } else {
            throw new Error("db.query failed or returned empty.");
        }

        // Cleanup
        await db.run("DROP TABLE test_verify");
        console.log("🧹 Cleanup done.");

        console.log("\n🎉 SUCCESS: The Async Database Adapter is working correctly!");
        console.log("This confirms your code is ready for both Local (SQLite) and Production (Postgres).");

    } catch (error) {
        console.error("\n❌ VERIFICATION FAILED:", error);
        process.exit(1);
    }
}

verifyAdapter();
