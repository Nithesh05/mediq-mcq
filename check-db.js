const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'mediq.db');
const db = new Database(dbPath);

try {
    const tableInfo = db.pragma('table_info(users)');
    console.log('Users Table Schema:', tableInfo);
} catch (error) {
    console.error('Error checking schema:', error);
}
