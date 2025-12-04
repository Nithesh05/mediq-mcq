const Database = require('better-sqlite3');
const path = require('path');

// Check if we are in a production environment with Postgres available
const isProd = process.env.NODE_ENV === 'production' && process.env.POSTGRES_URL;

let sql; // For Vercel Postgres
let sqlite; // For Local SQLite

if (isProd) {
  // We will import this dynamically to avoid build errors if not installed yet
  // In a real Vercel deploy, @vercel/postgres should be in package.json
  try {
    const { sql: vercelSql } = require('@vercel/postgres');
    sql = vercelSql;
  } catch (e) {
    console.warn("Vercel Postgres not found, falling back to SQLite (if possible) or failing.");
  }
} else {
  const dbPath = path.join(process.cwd(), 'mediq.db');
  sqlite = new Database(dbPath);
}

// Unified Database Adapter
const db = {
  /**
   * Execute a query and return all rows
   * @param {string} queryString 
   * @param {any[]} params 
   */
  query: async (queryString, params = []) => {
    if (isProd && sql) {
      // Vercel Postgres
      // Convert ? to $1, $2, etc. for Postgres compatibility if needed
      // But standard Vercel SDK uses template literals usually. 
      // For simplicity in migration, we might need a helper to convert syntax if we stick to string queries.
      // However, Vercel SQL accepts `sql\`query\`` or `client.query(text, values)`.
      // Let's use the client.query style if available or raw query.
      // Actually, @vercel/postgres `sql` tag is best, but for dynamic strings we need `db.query`.
      const { rows } = await sql.query(queryString.replace(/\?/g, (match, offset, string) => {
        // Simple regex to convert ? to $1, $2... (Naive implementation)
        // A better approach for this migration is to keep using SQLite locally and assume 
        // we will fix queries if they are complex.
        // For now, let's try to map ? to $n
        let count = 0;
        return () => `$${++count}`;
      })(), params);
      return rows;
    } else {
      // SQLite (Async Wrapper)
      return new Promise((resolve, reject) => {
        try {
          const stmt = sqlite.prepare(queryString);
          const rows = stmt.all(params);
          resolve(rows);
        } catch (err) {
          reject(err);
        }
      });
    }
  },

  /**
   * Execute a query and return a single row
   * @param {string} queryString 
   * @param {any[]} params 
   */
  get: async (queryString, params = []) => {
    if (isProd && sql) {
      const { rows } = await sql.query(queryString.replace(/\?/g, (match) => {
        let count = 0;
        return () => `$${++count}`;
      })(), params);
      return rows[0] || null;
    } else {
      return new Promise((resolve, reject) => {
        try {
          const stmt = sqlite.prepare(queryString);
          const row = stmt.get(params);
          resolve(row);
        } catch (err) {
          reject(err);
        }
      });
    }
  },

  /**
   * Execute a command (INSERT, UPDATE, DELETE)
   * @param {string} queryString 
   * @param {any[]} params 
   */
  run: async (queryString, params = []) => {
    if (isProd && sql) {
      const result = await sql.query(queryString.replace(/\?/g, (match) => {
        let count = 0;
        return () => `$${++count}`;
      })(), params);
      return { changes: result.rowCount, lastInsertRowid: null }; // Postgres doesn't return ID easily this way without RETURNING
    } else {
      return new Promise((resolve, reject) => {
        try {
          const stmt = sqlite.prepare(queryString);
          const info = stmt.run(params);
          resolve(info);
        } catch (err) {
          reject(err);
        }
      });
    }
  }
};

function initDb() {
  if (isProd) return; // Vercel Postgres tables should be created via SQL shell or migration script, not app startup usually.
  // But for now, we skip auto-init in prod to avoid errors.

  // Users Table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      xp INTEGER DEFAULT 0,
      security_question TEXT,
      security_answer TEXT,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      email TEXT,
      level INTEGER DEFAULT 1
    )
  `);

  // Streaks Table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS streaks (
      user_id INTEGER PRIMARY KEY,
      current_streak INTEGER DEFAULT 0,
      last_activity_date TEXT,
      longest_streak INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Friends Table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS friends (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      friend_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (friend_id) REFERENCES users(id),
      UNIQUE(user_id, friend_id)
    )
  `);

  // Activity Log
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      activity_type TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      details TEXT,
      score INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Feedback Table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Groups Table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      topic TEXT,
      is_private BOOLEAN DEFAULT 0,
      host_id INTEGER NOT NULL,
      invite_code TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (host_id) REFERENCES users(id)
    )
  `);

  // Group Members Table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS group_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      group_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (group_id) REFERENCES groups(id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(group_id, user_id)
    )
  `);

  // Achievements Table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS achievements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      condition_type TEXT NOT NULL,
      condition_value INTEGER NOT NULL
    )
  `);

  // User Achievements Table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS user_achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      achievement_id TEXT NOT NULL,
      unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (achievement_id) REFERENCES achievements(id),
      UNIQUE(user_id, achievement_id)
    )
  `);

  // Notifications Table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'info',
      is_read BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log('SQLite Database initialized successfully');
}

// Initialize DB on startup (only for SQLite)
initDb();

module.exports = { db, initDb };
