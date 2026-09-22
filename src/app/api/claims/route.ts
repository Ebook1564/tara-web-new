import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        a.id, 
        a.target_username as "name", 
        COALESCE(c.email, 'Waiting...') as "email", 
        COALESCE(c.phone, 'Waiting...') as "phone", 
        a.file_name as "company", 
        CASE WHEN c.id IS NOT NULL THEN 'Claimed' ELSE 'Pending' END as "status"
      FROM "adminUploads" a
      LEFT JOIN "clientsDubai" c ON LOWER(a.target_username) = LOWER(c.name)
      ORDER BY a.uploaded_at DESC
    `);
    
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching claims:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch claims' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, csv_name } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO "clientsDubai" (name, email, phone, company) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, phone, csv_name || 'unknown']
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting claim:', error);
    return NextResponse.json({ success: false, error: 'Failed to insert claim' }, { status: 500 });
  }
}
