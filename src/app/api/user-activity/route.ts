import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerOnlyClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "인증이 필요합니다" },
        { status: 401 }
      );
    }
    
    const supabase = createServerOnlyClient();
    
    // 최근 테스트 활동 가져오기
    const { data: activities, error } = await supabase
      .from('user_test_activities')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) {
      console.error('테스트 활동 조회 오류:', error);
      return NextResponse.json(
        { error: '데이터를 불러오는 중 오류가 발생했습니다: ' + error.message },
        { status: 500 }
      );
    }
    
    // 테스트 통계 계산하기
    // 총 테스트 수
    const { count: totalTests, error: countError } = await supabase
      .from('user_test_activities')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id);
    
    if (countError) {
      console.error('테스트 카운트 오류:', countError);
      return NextResponse.json(
        { error: '통계를 계산하는 중 오류가 발생했습니다: ' + countError.message },
        { status: 500 }
      );
    }
    
    // 가장 많이 수행한 테스트 카테고리 (여기서는 테스트 ID 기반으로 간단하게 계산)
    const testCounts: Record<string, number> = {};
    activities?.forEach(activity => {
      testCounts[activity.test_id] = (testCounts[activity.test_id] || 0) + 1;
    });
    
    let favoriteTestId = '';
    let maxCount = 0;
    
    Object.entries(testCounts).forEach(([testId, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favoriteTestId = testId;
      }
    });
    
    // 가장 많이 한 테스트 정보 가져오기
    let favoriteTest = null;
    if (favoriteTestId) {
      const { data: testData, error: testError } = await supabase
        .from('test_card_stats')
        .select('title, category')
        .eq('id', favoriteTestId)
        .single();
      
      if (testError) {
        console.error('테스트 정보 조회 오류:', testError);
        // 이 오류는 중요하지 않으므로 계속 진행
      } else {
        favoriteTest = testData;
      }
    }
    
    // 캐시 방지 헤더 추가
    return NextResponse.json(
      {
        activities,
        statistics: {
          totalTests,
          favoriteTest,
          testCount: Object.keys(testCounts).length
        }
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    console.error('API 오류:', error);
    const errorMessage = error instanceof Error ? error.message : '서버 오류가 발생했습니다';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "인증이 필요합니다" },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    const { testId, testTitle, resultSummary, imageUrl } = body;
    
    if (!testId || !testTitle) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다" },
        { status: 400 }
      );
    }
    
    const supabase = createServerOnlyClient();
    
    const { error } = await supabase
      .from('user_test_activities')
      .insert({
        user_id: session.user.id,
        test_id: testId,
        test_title: testTitle,
        result_summary: resultSummary || '',
        image_url: imageUrl || ''
      });
    
    if (error) {
      console.error('테스트 활동 저장 오류:', error);
      return NextResponse.json(
        { error: '활동을 저장하는 중 오류가 발생했습니다: ' + error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0, must-revalidate'
        }
      }
    );
  } catch (error) {
    console.error('API 오류:', error);
    const errorMessage = error instanceof Error ? error.message : '서버 오류가 발생했습니다';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 