const Database = require('better-sqlite3');
const path = require('path');

// This ensures the database file is created in your project root
const dbPath = path.resolve(__dirname, '../users.db');
const db = new Database(dbPath);

// Create the table immediately (synchronous in better-sqlite3)
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT
  )
`).run();

module.exports = db;