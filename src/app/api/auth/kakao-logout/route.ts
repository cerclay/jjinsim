import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: '인증되지 않은 요청입니다.' },
        { status: 401 }
      );
    }
    
    // 카카오 API 관련 환경 변수
    const clientId = process.env.KAKAO_CLIENT_ID;
    const adminKey = process.env.KAKAO_ADMIN_KEY || ''; // 선택적: 어드민 키가 있으면 추가
    
    // 사용자 이메일이 카카오 형식인지 확인 (kakao_ID@example.com)
    const isKakaoUser = session.user.email?.startsWith('kakao_');
    
    // 카카오 사용자 ID 추출
    let kakaoId = '';
    if (isKakaoUser && session.user.email) {
      kakaoId = session.user.email.split('_')[1].split('@')[0];
    }
    
    if (!isKakaoUser || !kakaoId) {
      return NextResponse.json(
        { error: '카카오 계정으로 로그인한 사용자가 아닙니다.' },
        { status: 400 }
      );
    }
    
    // 카카오 로그아웃 API 호출 (선택적)
    if (kakaoId && adminKey) {
      try {
        // 카카오 연결 해제 API 호출 (어드민 키 사용)
        await fetch(`https://kapi.kakao.com/v1/user/logout?target_id_type=user_id&target_id=${kakaoId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `KakaoAK ${adminKey}`
          }
        });
      } catch (error) {
        console.error('카카오 연결 해제 API 오류:', error);
        // 카카오 API 오류는 무시하고 계속 진행
      }
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('카카오 로그아웃 처리 중 오류:', error);
    return NextResponse.json(
      { error: '로그아웃 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 