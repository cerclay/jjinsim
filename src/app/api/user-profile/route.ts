import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerOnlyClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  try {
    // 인증 세션 확인
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "인증이 필요합니다" },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    const supabase = createServerOnlyClient();
    
    // 1. 사용자 계정 정보 조회 (가입일 및 역할)
    const { data: accountData, error: accountError } = await supabase
      .from('account')
      .select('id, created_at, role')
      .eq('id', userId)
      .single();
    
    if (accountError && accountError.code !== 'PGRST116') {
      console.error('계정 정보 조회 오류:', accountError);
      // 오류가 있지만 계속 진행 (다른 데이터라도 가져오기 위함)
    }
    
    // 2. 테스트 활동 통계 조회
    // 2.1 총 테스트 수
    const { count: totalTests, error: countError } = await supabase
      .from('user_test_activities')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    if (countError) {
      console.error('테스트 카운트 오류:', countError);
    }
    
    // 2.2 완료한 테스트 수 (중복 제거 - 각 테스트를 한 번씩만 카운트)
    const { data: uniqueTests, error: uniqueError } = await supabase
      .from('user_test_activities')
      .select('test_id')
      .eq('user_id', userId);
    
    if (uniqueError) {
      console.error('테스트 고유 카운트 오류:', uniqueError);
    }
    
    // 중복 제거하여 고유 테스트 수 계산
    const uniqueTestIds = new Set();
    uniqueTests?.forEach(test => uniqueTestIds.add(test.test_id));
    const completedUniqueTests = uniqueTestIds.size;
    
    // 2.3 가장 최근 활동
    const { data: recentActivity, error: recentError } = await supabase
      .from('user_test_activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (recentError && recentError.code !== 'PGRST116') {
      console.error('최근 활동 조회 오류:', recentError);
    }
    
    // 2.4 가장 많이 한 테스트 찾기
    const { data: activities, error: activitiesError } = await supabase
      .from('user_test_activities')
      .select('test_id, test_title')
      .eq('user_id', userId);
    
    if (activitiesError) {
      console.error('활동 조회 오류:', activitiesError);
    }
    
    // 테스트별 카운트 계산
    const testCounts: Record<string, { count: number; title: string }> = {};
    activities?.forEach(activity => {
      if (!testCounts[activity.test_id]) {
        testCounts[activity.test_id] = {
          count: 0,
          title: activity.test_title
        };
      }
      testCounts[activity.test_id].count++;
    });
    
    // 가장 많이 한 테스트 찾기
    let favoriteTest = null;
    let maxCount = 0;
    
    Object.entries(testCounts).forEach(([testId, data]) => {
      if (data.count > maxCount) {
        maxCount = data.count;
        favoriteTest = {
          id: testId,
          title: data.title,
          count: data.count
        };
      }
    });
    
    // 2.5 평균 완료 시간 - 예시로 고정값 사용 (실제로는 각 테스트의 시작-종료 시간 차이를 평균으로 계산해야 함)
    const averageCompletionTime = "4분";
    
    // 3. 응답 데이터 구성
    return NextResponse.json({
      profile: {
        userId: userId,
        name: session.user.name,
        email: session.user.email,
        role: accountData?.role || "user",
        joinDate: accountData?.created_at || null,
        image: session.user.image
      },
      statistics: {
        totalTests: totalTests || 0,
        completedUniqueTests: completedUniqueTests || 0,
        favoriteTest: favoriteTest,
        averageCompletionTime: averageCompletionTime,
        lastActivityDate: recentActivity?.created_at || null
      }
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('API 오류:', error);
    const errorMessage = error instanceof Error ? error.message : '서버 오류가 발생했습니다';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 