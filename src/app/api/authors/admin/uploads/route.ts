import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cacheDeletePrefix } from '@/lib/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, fileData } = body; // fileData holds the preview_link

    if (!username || !fileData) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const normalizedUsername = username.toLowerCase().trim();

    const result = await pool.query(
      `INSERT INTO "authorAdminUpload" (target_username, preview_link) 
       VALUES ($1, $2) RETURNING id, target_username, preview_link, uploaded_at`,
      [normalizedUsername, fileData]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error saving author admin upload:', error);
    return NextResponse.json({ success: false, error: 'Failed to save upload' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id parameter' }, { status: 400 });
    }

    const upload = await pool.query(
      `SELECT target_username FROM "authorAdminUpload" WHERE id = $1`,
      [id]
    );

    if (upload.rows.length > 0) {
      const { target_username: targetUsername } = upload.rows[0];

      await pool.query(
        `DELETE FROM "authorClient" WHERE LOWER(author_name) = LOWER($1)`,
        [targetUsername]
      );
    }

    await pool.query('DELETE FROM "authorAdminUpload" WHERE id = $1', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting author upload:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete upload' }, { status: 500 });
  }
}
