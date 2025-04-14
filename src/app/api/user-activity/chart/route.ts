import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerOnlyClient } from '@/lib/supabase/server';
import { format, subDays } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: '인증되지 않은 요청입니다.' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    const supabase = createServerOnlyClient();
    
    // 실제 데이터베이스 쿼리를 구현할 수 있지만, 
    // 여기서는 예제 데이터로 제공합니다.
    
    // 카테고리 분포 데이터 생성
    const categoryDistribution = [
      { name: '성격', count: 8 },
      { name: '관계', count: 5 },
      { name: '직업', count: 3 },
      { name: 'IQ', count: 6 },
      { name: '심리', count: 4 },
      { name: '재미', count: 7 }
    ];
    
    // 일별 활동 데이터 생성
    const dailyActivity = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      return {
        date: format(date, 'MM-dd'),
        count: Math.floor(Math.random() * 5)
      };
    }).reverse();
    
    // 월별 추세 데이터 생성
    const monthlyTrend = [
      { month: '1월', count: 10 },
      { month: '2월', count: 15 },
      { month: '3월', count: 12 },
      { month: '4월', count: 18 },
      { month: '5월', count: 22 },
      { month: '6월', count: 28 }
    ];
    
    return NextResponse.json({
      chartData: {
        categoryDistribution,
        dailyActivity,
        monthlyTrend
      }
    });
    
  } catch (error) {
    console.error('차트 데이터 가져오기 오류:', error);
    return NextResponse.json(
      { error: '차트 데이터를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 