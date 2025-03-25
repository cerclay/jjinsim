import { NextResponse } from 'next/server';
import { createServerOnlyClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    
    // 필수 필드 검증
    if (!username || !password) {
      return NextResponse.json(
        { message: '아이디와 비밀번호는 필수 항목입니다.' },
        { status: 400 }
      );
    }
    
    // Supabase 서비스 클라이언트 생성
    const supabase = createServerOnlyClient();
    
    // 사용자 등록
    const { data, error } = await supabase
      .from('account')
      .insert([
        {
          username,
          email,
          password, // 이미 해시된 비밀번호
          role: 'user',
          is_active: true
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('계정 생성 오류:', error);
      
      // 중복 키 오류 처리
      if (error.code === '23505') {
        return NextResponse.json(
          { message: '이미 사용 중인 아이디 또는 이메일입니다.' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { message: `계정 생성 중 오류: ${error.message}` },
        { status: 500 }
      );
    }
    
    // 비밀번호 필드 제외하고 응답
    const { password: _, ...userData } = data;
    
    return NextResponse.json(
      { message: '회원가입이 완료되었습니다.', user: userData },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('회원가입 처리 중 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 