import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerOnlyClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { username, currentPassword, newPassword } = await request.json();

    // 필수 필드 검증
    if (!username || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Supabase 클라이언트 생성
    const supabase = createServerOnlyClient();

    // 사용자 정보 조회
    const { data: user, error: userError } = await supabase
      .from('account')
      .select('*')
      .eq('username', username)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // Supabase Auth를 사용하여 인증 (관리자용 임시 이메일 생성)
    const tempEmail = `${username}@admin.internal`;
    
    // 현재 비밀번호로 로그인 시도
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: tempEmail,
      password: currentPassword,
    });

    if (signInError) {
      return NextResponse.json(
        { error: '현재 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 비밀번호 업데이트 - Supabase Auth API 사용
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      console.error('비밀번호 업데이트 오류:', updateError);
      return NextResponse.json(
        { error: '비밀번호 변경 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (error) {
    console.error('비밀번호 변경 API 오류:', error);
    return NextResponse.json(
      { error: '비밀번호 변경 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 