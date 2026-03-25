import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 数据文件路径
const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'reflections.json');

// 确保数据目录存在
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 初始化数据文件（如果不存在）
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, '[]', 'utf-8');
}

// 读取数据
function readData() {
  const content = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(content);
}

// 写入数据
function writeData(data: any[]) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: Request) {
  try {
    const { question_id, question, name, response } = await request.json();

    if (!question_id || !name || !response) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = readData();
    const newEntry = {
      id: Date.now().toString(),
      question_id,
      question,
      name,
      response,
      created_at: new Date().toISOString(),
    };

    data.push(newEntry);
    writeData(data);

    return NextResponse.json({ success: true, id: newEntry.id });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = readData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Read error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
