const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'mediq.db');
const db = new Database(dbPath);

const TARGET_ADMIN = 'Nithesh';

try {
    // 1. Get all current admins
    const admins = db.prepare("SELECT id, username FROM users WHERE role = 'admin'").all();
    console.log('Current Admins:', admins.map(a => a.username));

    let demotedCount = 0;

    // 2. Demote everyone except the target admin
    const demoteStmt = db.prepare("UPDATE users SET role = 'user' WHERE id = ?");

    for (const admin of admins) {
        if (admin.username !== TARGET_ADMIN) {
            console.log(`Demoting user: ${admin.username}`);
            demoteStmt.run(admin.id);
            demotedCount++;
        }
    }

    // 3. Ensure target admin IS admin
    const targetUser = db.prepare("SELECT id, role FROM users WHERE username = ?").get(TARGET_ADMIN);

    if (targetUser) {
        if (targetUser.role !== 'admin') {
            console.log(`Promoting ${TARGET_ADMIN} to admin...`);
            db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(targetUser.id);
        } else {
            console.log(`${TARGET_ADMIN} is already an admin.`);
        }
    } else {
        console.error(`User ${TARGET_ADMIN} not found!`);
    }

    console.log(`Audit complete. Demoted ${demotedCount} users.`);

} catch (error) {
    console.error('Error auditing admins:', error);
}
