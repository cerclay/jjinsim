import { NextResponse } from 'next/server';
import { createServerOnlyClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { sql } = await request.json();
    
    if (!sql) {
      return NextResponse.json({ error: 'SQL 쿼리가 필요합니다' }, { status: 400 });
    }
    
    // 서비스 롤 키를 사용하는 Supabase 클라이언트 생성
    const supabase = createServerOnlyClient();
    
    // SQL 쿼리 실행
    const { data, error } = await supabase.rpc('execute_sql', { query: sql });
    
    if (error) {
      console.error('SQL 쿼리 실행 오류:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error: any) {
    console.error('SQL API 오류:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 