import { NextResponse } from 'next/server';
import { createServerOnlyClient } from '@/lib/supabase/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { migrationFile } = await request.json();
    
    if (!migrationFile) {
      return NextResponse.json(
        { error: '마이그레이션 파일 이름이 필요합니다' }, 
        { status: 400 }
      );
    }
    
    // 마이그레이션 파일 경로
    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', migrationFile);
    
    // 마이그레이션 파일 존재 확인
    if (!fs.existsSync(migrationPath)) {
      return NextResponse.json(
        { error: `마이그레이션 파일을 찾을 수 없습니다: ${migrationFile}` }, 
        { status: 404 }
      );
    }
    
    // SQL 파일 읽기
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Supabase 클라이언트 생성
    const supabase = createServerOnlyClient();
    
    // SQL 명령 실행
    const { data, error } = await supabase.rpc('execute_sql', { query: sql });
    
    if (error) {
      console.error('마이그레이션 실행 오류:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: `마이그레이션 성공적으로 실행됨: ${migrationFile}`,
        data 
      }, 
      { status: 200 }
    );
  } catch (error: any) {
    console.error('마이그레이션 API 오류:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 