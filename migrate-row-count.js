const fs = require('fs');
const { Pool } = require('pg');

// Load DATABASE_URL from .env (Next.js style)
function loadEnv() {
  const content = fs.readFileSync('.env', 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value.replace(/^["']|["']$/g, '');
  }
}

function countRows(fileData) {
  try {
    const base64 = (fileData || '').split(',').pop() || fileData || '';
    const decoded = Buffer.from(base64, 'base64').toString('utf8');
    const lines = decoded.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
    return Math.max(0, lines.length - 1);
  } catch {
    return 0;
  }
}

async function migrate() {
  loadEnv();
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('rds.amazonaws.com')
      ? { rejectUnauthorized: false }
      : false,
  });

  try {
    console.log('Adding row_count column to adminUploads...');
    await pool.query(`ALTER TABLE "adminUploads" ADD COLUMN IF NOT EXISTS row_count INTEGER NOT NULL DEFAULT 0;`);
    console.log('Column ready.');

    console.log('Backfilling row_count for existing rows...');
    const res = await pool.query(`SELECT id, file_data FROM "adminUploads" WHERE row_count = 0;`);
    for (const row of res.rows) {
      const count = countRows(row.file_data);
      await pool.query(`UPDATE "adminUploads" SET row_count = $1 WHERE id = $2;`, [count, row.id]);
    }
    console.log(`Backfilled ${res.rows.length} rows.`);

    console.log('Migration complete.');
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    await pool.end();
  }
}

migrate();