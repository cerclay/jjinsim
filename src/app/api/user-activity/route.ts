import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: "인증이 필요합니다" },
      { status: 401 }
    );
  }
  
  const supabase = createServerComponentClient({ cookies });
  
  try {
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
        { error: '데이터를 불러오는 중 오류가 발생했습니다' },
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
        { error: '통계를 계산하는 중 오류가 발생했습니다' },
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
      const { data: testData } = await supabase
        .from('test_card_stats')
        .select('title, category')
        .eq('id', favoriteTestId)
        .single();
      
      favoriteTest = testData;
    }
    
    return NextResponse.json({
      activities,
      statistics: {
        totalTests,
        favoriteTest,
        testCount: Object.keys(testCounts).length
      }
    });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: "인증이 필요합니다" },
      { status: 401 }
    );
  }
  
  try {
    const body = await req.json();
    const { testId, testTitle, resultSummary, imageUrl } = body;
    
    if (!testId || !testTitle) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다" },
        { status: 400 }
      );
    }
    
    const supabase = createServerComponentClient({ cookies });
    
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
        { error: '활동을 저장하는 중 오류가 발생했습니다' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
} 