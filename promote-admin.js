const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'mediq.db');
const db = new Database(dbPath);

const username = process.argv[2];

if (!username) {
    console.error('Usage: node promote-admin.js <username>');
    process.exit(1);
}

try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    if (!user) {
        console.error(`User "${username}" not found.`);
        process.exit(1);
    }

    db.prepare('UPDATE users SET role = ? WHERE id = ?').run('admin', user.id);
    console.log(`Successfully promoted "${username}" to admin.`);
} catch (error) {
    console.error('Error promoting user:', error);
    process.exit(1);
}
