import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, fileName, fileData } = body;

    if (!username || !fileName || !fileData) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO "adminUploads" (target_username, file_name, file_data) 
       VALUES ($1, $2, $3) RETURNING id, target_username, file_name, uploaded_at`,
      [username.toLowerCase().trim(), fileName, fileData]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error saving admin upload:', error);
    return NextResponse.json({ success: false, error: 'Failed to save upload' }, { status: 500 });
  }
}
