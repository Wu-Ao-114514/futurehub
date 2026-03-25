import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// 初始化数据库
const dbPath = path.join(process.cwd(), 'data', 'reflections.db');
const db = new Database(dbPath);

// 创建表（如果不存在）
db.exec(`
  CREATE TABLE IF NOT EXISTS reflections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id TEXT NOT NULL,
    question TEXT NOT NULL,
    name TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export async function POST(request: Request) {
  try {
    const { question_id, question, name, response } = await request.json();

    if (!question_id || !name || !response) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const stmt = db.prepare(`
      INSERT INTO reflections (question_id, question, name, response, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      question_id,
      question,
      name,
      response,
      new Date().toISOString()
    );

    return NextResponse.json({
      success: true,
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM reflections ORDER BY created_at DESC').all();
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
