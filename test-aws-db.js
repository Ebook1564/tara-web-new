const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    console.log("Attempting to connect to AWS Database with the provided credentials...");
    await pool.query('SELECT NOW()');
    console.log("✅ Connection Successful! The password is correct.");
  } catch (err) {
    console.error("❌ Connection Failed!");
    console.error("Error Message:", err.message);
    if (err.message.includes('password authentication failed')) {
      console.error("\n---> THIS MEANS THE PASSWORD YOU CREATED FOR AWS IS NOT 'Amansaxena@1'");
      console.error("---> You need to go into your AWS RDS Console, click 'Modify', and reset your Master Password.");
    }
  } finally {
    await pool.end();
  }
}

testConnection();
