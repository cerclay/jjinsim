import { NextRequest, NextResponse } from 'next/server';
import { createServerOnlyClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerOnlyClient();
    
    // 활성화된 테스트 카드만 가져오기
    const { data, error } = await supabase
      .from('test_card_stats')
      .select('*')
      .eq('is_active', true);
    
    if (error) {
      throw error;
    }
    
    // 인기 테스트와 새 테스트 분리 및 정렬
    const popularTests = data
      .filter(test => test.is_popular)
      .sort((a, b) => {
        // 우선 popular_order로 정렬 (0이면 맨 뒤로)
        if (a.popular_order === 0 && b.popular_order !== 0) return 1;
        if (a.popular_order !== 0 && b.popular_order === 0) return -1;
        if (a.popular_order !== b.popular_order) return a.popular_order - b.popular_order;
        
        // 다음으로 참가자 수로 정렬 (참가자 많은 순)
        if (a.participation_count !== b.participation_count) {
          return b.participation_count - a.participation_count;
        }
        
        // 마지막으로 생성일로 정렬 (최신순)
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    
    const newTests = data
      .filter(test => test.is_new)
      .sort((a, b) => {
        // 우선 new_order로 정렬 (0이면 맨 뒤로)
        if (a.new_order === 0 && b.new_order !== 0) return 1;
        if (a.new_order !== 0 && b.new_order === 0) return -1;
        if (a.new_order !== b.new_order) return a.new_order - b.new_order;
        
        // 다음으로 생성일로 정렬 (최신순)
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    
    // 모든 테스트 (카테고리별로 그룹화)
    const categoryGroups: Record<string, any[]> = {};
    
    data.forEach(test => {
      const category = test.category || 'others';
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(test);
    });
    
    // 각 카테고리 내에서 정렬 (참가자 수 기준)
    Object.keys(categoryGroups).forEach(category => {
      categoryGroups[category].sort((a, b) => b.participation_count - a.participation_count);
    });
    
    return NextResponse.json({
      popularTests,
      newTests,
      allTests: data,
      categoryGroups
    });
  } catch (error) {
    console.error('테스트 데이터 로딩 오류:', error);
    return NextResponse.json(
      { error: "테스트 데이터를 로드하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 