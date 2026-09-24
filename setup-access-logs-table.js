const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com')
    ? { rejectUnauthorized: false }
    : false,
});

async function setupAccessLogsTable() {
  try {
    console.log("Connecting to AWS Database to create accessLogs table...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "accessLogs" (
        id SERIAL PRIMARY KEY,
        username_attempted VARCHAR(255) NOT NULL,
        service_type VARCHAR(50) NOT NULL,
        attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'accessLogs' table");

    console.log("🎉 Successfully created accessLogs table!");
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  } finally {
    await pool.end();
  }
}

setupAccessLogsTable();
