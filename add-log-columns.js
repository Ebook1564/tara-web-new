const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com')
    ? { rejectUnauthorized: false }
    : false,
});

async function addColumns() {
  try {
    await pool.query(`ALTER TABLE "accessLogs" ADD COLUMN IF NOT EXISTS email VARCHAR(255) DEFAULT ''`);
    await pool.query(`ALTER TABLE "accessLogs" ADD COLUMN IF NOT EXISTS phone VARCHAR(50) DEFAULT ''`);
    console.log("✅ Added email and phone columns to accessLogs");
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  } finally {
    await pool.end();
  }
}

addColumns();
