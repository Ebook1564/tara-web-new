const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for AWS RDS connections
  }
});

async function setupAWS() {
  try {
    console.log("Connecting to AWS Database...");

    // Create adminDubai table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "adminDubai" (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'adminDubai' table");

    // Insert default admin if it doesn't exist
    await pool.query(`
      INSERT INTO "adminDubai" (username, password) 
      VALUES ('saxena.aman5@gmail.com', 'Amansaxena@1')
      ON CONFLICT (username) DO NOTHING;
    `);
    console.log("✅ Inserted default admin credentials");

    // Create adminUploads table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "adminUploads" (
        id SERIAL PRIMARY KEY,
        target_username VARCHAR(255) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_data TEXT NOT NULL,
        row_count INTEGER NOT NULL DEFAULT 0,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'adminUploads' table");

    // Create clientsDubai table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "clientsDubai" (
        id SERIAL PRIMARY KEY,
        assigned_admin VARCHAR(255) REFERENCES "adminDubai"(username),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'clientsDubai' table");

    console.log("🎉 Successfully prepared your AWS Database!");
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  } finally {
    await pool.end();
  }
}

setupAWS();
