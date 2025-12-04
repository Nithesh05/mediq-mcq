const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'mediq.db');
const db = new Database(dbPath);

console.log("🔄 Starting Groups Migration (Retry)...");

try {
    // Check if column exists
    const tableInfo = db.prepare("PRAGMA table_info(groups)").all();
    const hasInviteCode = tableInfo.some(col => col.name === 'invite_code');

    if (!hasInviteCode) {
        console.log("Adding invite_code column (without UNIQUE constraint first)...");
        db.prepare("ALTER TABLE groups ADD COLUMN invite_code TEXT").run();
        console.log("✅ Column added.");
    } else {
        console.log("ℹ️ Column invite_code already exists.");
    }

    // Generate codes for existing groups
    const groups = db.prepare("SELECT id FROM groups WHERE invite_code IS NULL").all();

    if (groups.length > 0) {
        console.log(`Generating codes for ${groups.length} groups...`);
        const update = db.prepare("UPDATE groups SET invite_code = ? WHERE id = ?");

        for (const group of groups) {
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();
            update.run(code, group.id);
            console.log(`  - Group ${group.id}: ${code}`);
        }
        console.log("✅ All groups updated.");
    } else {
        console.log("ℹ️ No groups need code generation.");
    }

    // Create Unique Index
    console.log("Creating Unique Index...");
    try {
        db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_groups_invite_code ON groups(invite_code)").run();
        console.log("✅ Unique Index created.");
    } catch (idxError) {
        console.log("ℹ️ Index might already exist or failed: " + idxError.message);
    }

} catch (error) {
    console.error("❌ Migration Failed:", error);
}

console.log("🎉 Migration Complete.");
