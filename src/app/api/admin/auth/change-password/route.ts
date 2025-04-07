import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerOnlyClient } from '@/lib/supabase/server';
import { hash, compare } from 'bcryptjs';

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

    // 현재 비밀번호 확인
    const isPasswordValid = await compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: '현재 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 새 비밀번호 해싱
    const hashedPassword = await hash(newPassword, 10);

    // 비밀번호 업데이트
    const { error: updateError } = await supabase
      .from('account')
      .update({ password: hashedPassword })
      .eq('id', user.id);

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