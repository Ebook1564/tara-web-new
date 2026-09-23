import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cacheDeletePrefix } from '@/lib/cache';

function countRows(fileData: string): number {
  try {
    const base64 = (fileData || '').split(',').pop() || fileData || '';
    const decoded = Buffer.from(base64, 'base64').toString('utf8');
    const lines = decoded.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
    return Math.max(0, lines.length - 1);
  } catch {
    return 0;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, fileName, fileData } = body;

    if (!username || !fileName || !fileData) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const normalizedUsername = username.toLowerCase().trim();
    const rowCount = countRows(fileData);

    const result = await pool.query(
      `INSERT INTO "adminUploads" (target_username, file_name, file_data, row_count) 
       VALUES ($1, $2, $3, $4) RETURNING id, target_username, file_name, row_count, uploaded_at`,
      [normalizedUsername, fileName, fileData, rowCount]
    );

    // Invalidate cached list for this user so the new file shows up immediately
    cacheDeletePrefix(`adminUploads:list:${normalizedUsername}`);

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error saving admin upload:', error);
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

    // Fetch the upload so we can also remove any claims tied to this specific file.
    // Otherwise a re-upload of the same entry for the same name would still show "Claimed".
    const upload = await pool.query(
      `SELECT target_username, file_name FROM "adminUploads" WHERE id = $1`,
      [id]
    );

    if (upload.rows.length > 0) {
      const { target_username: targetUsername, file_name: fileName } = upload.rows[0];

      await pool.query(
        `DELETE FROM "clientsDubai" WHERE LOWER(name) = LOWER($1) AND company = $2`,
        [targetUsername, fileName]
      );
    }

    await pool.query('DELETE FROM "adminUploads" WHERE id = $1', [id]);
    cacheDeletePrefix('adminUploads:list:');
    cacheDeletePrefix('adminUploads:file:');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting admin upload:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete upload' }, { status: 500 });
  }
}
