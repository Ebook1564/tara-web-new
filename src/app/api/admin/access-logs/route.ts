import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - fetch all access logs
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, username_attempted, email, phone, service_type, attempted_at 
       FROM "accessLogs" 
       ORDER BY attempted_at DESC 
       LIMIT 200`
    );
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching access logs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch logs' }, { status: 500 });
  }
}

// POST - log a failed access attempt
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username_attempted, service_type, email, phone } = body;

    if (!username_attempted || !service_type) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO "accessLogs" (username_attempted, service_type, email, phone) VALUES ($1, $2, $3, $4)`,
      [username_attempted.trim(), service_type, email || '', phone || '']
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving access log:', error);
    return NextResponse.json({ success: false, error: 'Failed to save log' }, { status: 500 });
  }
}

// DELETE - clear all logs or delete a single log by id
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      await pool.query(`DELETE FROM "accessLogs" WHERE id = $1`, [id]);
    } else {
      await pool.query(`DELETE FROM "accessLogs"`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing access logs:', error);
    return NextResponse.json({ success: false, error: 'Failed to clear logs' }, { status: 500 });
  }
}
