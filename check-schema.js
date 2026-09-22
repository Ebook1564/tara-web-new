const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkDb() {
  try {
    const adminUploadsRes = await pool.query('SELECT count(*) FROM "adminUploads";');
    console.log("adminUploads count:", adminUploadsRes.rows[0].count);

    const clientsRes = await pool.query('SELECT count(*) FROM "clientsDubai";');
    console.log("clientsDubai count:", clientsRes.rows[0].count);
  } catch (err) {
    console.error("ERROR:", err.message);
  } finally {
    await pool.end();
  }
}

checkDb();
