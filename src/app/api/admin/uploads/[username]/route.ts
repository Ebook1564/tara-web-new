import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const resolvedParams = await params;
    const { username } = resolvedParams;

    const result = await pool.query(
      `SELECT file_name, file_data FROM "adminUploads" 
       WHERE target_username = $1 
       ORDER BY uploaded_at DESC LIMIT 1`,
      [username.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'No data found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching admin upload:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch upload' }, { status: 500 });
  }
}
