const Database = require('better-sqlite3');
const path = require('path');

// Check if we are in a production environment with Postgres available
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
const isProd = process.env.NODE_ENV === 'production' && connectionString;

let sqlInstance = null; // Singleton for Vercel Postgres (Pool or Client)
let sqlite; // For Local SQLite

if (!isProd) {
  const dbPath = path.join(process.cwd(), 'mediq.db');
  sqlite = new Database(dbPath);
}

// Helper to get the Postgres connection (Pool or Client)
async function getSql() {
  if (sqlInstance) return sqlInstance;

  if (isProd) {
    const { createPool, createClient } = require('@vercel/postgres');

    try {
      // First, try to create a Pool (preferred for serverless)
      // This throws immediately if the connection string is a "Direct Connection" string
      const pool = createPool({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false }
      });

      // If we got here, the pool was created successfully (or at least didn't throw on config)
      sqlInstance = pool;
      return sqlInstance;

    } catch (error) {
      // Check if the error is about using a direct connection string with a pool
      if (error.message.includes('invalid_connection_string') ||
        error.message.includes('direct connection') ||
        error.code === 'VercelPostgresError') {

        console.warn("Pool creation failed (likely direct connection string). Falling back to Client...");

        try {
          const client = createClient({
            connectionString: connectionString,
            ssl: { rejectUnauthorized: false }
          });
          await client.connect(); // Client requires explicit connection
          sqlInstance = client;
          return sqlInstance;
        } catch (clientError) {
          console.error("Failed to connect with Client fallback:", clientError);
          throw clientError;
        }
      } else {
        // Some other error occurred
        console.error("Failed to initialize Vercel Postgres Pool:", error);
        throw error;
      }
    }
  }
  return null;
}

// Unified Database Adapter
const db = {
  /**
   * Execute a query and return all rows
   * @param {string} queryString 
   * @param {any[]} params 
   */
  query: async (queryString, params = []) => {
    if (isProd) {
      const sql = await getSql();
      if (!sql) throw new Error("Database connection failed: Vercel Postgres not initialized.");

      // Vercel Postgres (pg pool/client)
      // Convert ? to $1, $2, etc. for Postgres compatibility
      let paramCount = 0;
      const finalQuery = queryString.replace(/\?/g, () => `$${++paramCount}`);

      try {
        const { rows } = await sql.query(finalQuery, params);
        return rows;
      } catch (err) {
        console.error("Database Query Error:", err);
        throw err;
      }
    } else {
      // SQLite (Async Wrapper)
      if (!sqlite) throw new Error("Database connection failed: SQLite is not initialized.");
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
    if (isProd) {
      const sql = await getSql();
      if (!sql) throw new Error("Database connection failed: Vercel Postgres not initialized.");

      let paramCount = 0;
      const finalQuery = queryString.replace(/\?/g, () => `$${++paramCount}`);
      try {
        const { rows } = await sql.query(finalQuery, params);
        return rows[0] || null;
      } catch (err) {
        console.error("Database Get Error:", err);
        throw err;
      }
    } else {
      if (!sqlite) throw new Error("Database connection failed: SQLite is not initialized.");
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
    if (isProd) {
      const sql = await getSql();
      if (!sql) throw new Error("Database connection failed: Vercel Postgres not initialized.");

      let paramCount = 0;
      const finalQuery = queryString.replace(/\?/g, () => `$${++paramCount}`);
      try {
        const result = await sql.query(finalQuery, params);
        return { changes: result.rowCount, lastInsertRowid: null };
      } catch (err) {
        console.error("Database Run Error:", err);
        throw err;
      }
    } else {
      if (!sqlite) throw new Error("Database connection failed: SQLite is not initialized.");
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
  if (isProd) return; // Vercel Postgres tables should be created via SQL shell or migration script

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
