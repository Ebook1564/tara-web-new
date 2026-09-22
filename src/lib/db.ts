import { Pool } from 'pg';

let pool: Pool;

if (!global.pgPool) {
  global.pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com') 
      ? { rejectUnauthorized: false } 
      : false,
  });
}

pool = global.pgPool;

export default pool;

// TypeScript declaration to prevent recreating the pool in development
declare global {
  var pgPool: Pool | undefined;
}
