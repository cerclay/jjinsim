import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { testId, testTitle, resultSummary, imageUrl, resultData } = body;
    
    if (!testId || !testTitle) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다" },
        { status: 400 }
      );
    }
    
    const session = await getServerSession(authOptions);
    const supabase = createServerComponentClient({ cookies });
    
    // 결과 저장
    const result = {
      testId,
      testTitle,
      resultSummary,
      imageUrl,
      timestamp: new Date().toISOString(),
      userId: session?.user?.id || null,
      resultData: resultData || {}
    };
    
    // 1. Supabase에 테스트 결과 저장 (익명 사용자 포함)
    const { error: resultError } = await supabase
      .from('test_results')
      .insert({
        test_id: testId,
        user_id: session?.user?.id || null,
        result_summary: resultSummary,
        image_url: imageUrl,
        result_data: resultData
      });
    
    if (resultError) {
      console.error('테스트 결과 저장 오류:', resultError);
      return NextResponse.json(
        { error: '결과를 저장하는 중 오류가 발생했습니다' },
        { status: 500 }
      );
    }
    
    // 2. 인증된 사용자인 경우 활동 기록 저장
    if (session?.user) {
      try {
        await fetch('/api/user-activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            testId,
            testTitle,
            resultSummary,
            imageUrl
          }),
        });
      } catch (activityError) {
        console.error('사용자 활동 기록 저장 오류:', activityError);
        // 활동 기록 저장 실패는 전체 결과에 영향을 주지 않도록 함
      }
    }
    
    // 3. 로컬 스토리지에 저장할 수 있도록 데이터 반환
    return NextResponse.json({
      success: true,
      result,
      message: "테스트 결과가 저장되었습니다"
    });
    
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
} 