const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'mediq.db');
const db = new Database(dbPath);

try {
    const groups = db.pragma('table_info(groups)');
    const members = db.pragma('table_info(group_members)');
    console.log('Groups Table:', groups.length > 0 ? 'Exists' : 'Missing');
    console.log('Group Members Table:', members.length > 0 ? 'Exists' : 'Missing');
} catch (error) {
    console.error('Error checking schema:', error);
}
