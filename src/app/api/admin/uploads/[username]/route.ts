import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cacheGet, cacheSet } from '@/lib/cache';

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const resolvedParams = await params;
    const { username } = resolvedParams;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Fetch a single file's full data by id
    if (id) {
      const normalizedUsername = username.toLowerCase().trim();
      const cacheKey = `adminUploads:file:${id}:${normalizedUsername}`;
      const cached = cacheGet(cacheKey);
      if (cached) {
        return NextResponse.json({ success: true, data: cached });
      }

      const result = await pool.query(
        `SELECT id, target_username, file_name, file_data, row_count, uploaded_at 
         FROM "adminUploads" 
         WHERE id = $1 AND target_username = $2`,
        [id, normalizedUsername]
      );

      if (result.rows.length === 0) {
        return NextResponse.json({ success: false, error: 'No data found' }, { status: 404 });
      }

      cacheSet(cacheKey, result.rows[0], 600);
      return NextResponse.json({ success: true, data: result.rows[0] });
    }

    // Fetch all files for the username
    const normalizedUsername = username.toLowerCase().trim();
    const cacheKey = `adminUploads:list:${normalizedUsername}`;
    const cached = cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json({ success: true, data: cached });
    }

    const result = await pool.query(
      `SELECT id, target_username, file_name, row_count, uploaded_at 
       FROM "adminUploads" 
       WHERE target_username = $1 
       ORDER BY uploaded_at DESC`,
      [normalizedUsername]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'No data found' }, { status: 404 });
    }

    cacheSet(cacheKey, result.rows, 300);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching admin uploads:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch uploads' }, { status: 500 });
  }
}