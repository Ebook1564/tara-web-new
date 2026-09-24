

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupAuthorTables() {
  try {
    console.log("Connecting to AWS Database to create Author tables...");

    // Create authorAdmin table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "authorAdmin" (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'authorAdmin' table");

    // Create authorAdminUpload table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "authorAdminUpload" (
        id SERIAL PRIMARY KEY,
        target_username VARCHAR(255) NOT NULL,
        preview_link TEXT NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'authorAdminUpload' table");

    // Create authorClient table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "authorClient" (
        id SERIAL PRIMARY KEY,
        author_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'authorClient' table");

    console.log("🎉 Successfully created all author tables!");
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  } finally {
    await pool.end();
  }
}

setupAuthorTables();
