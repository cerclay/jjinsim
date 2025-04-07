import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerOnlyClient } from '@/lib/supabase-server';
import { UserActivityList } from '@/features/user-activity/components/UserActivityList';
import { UserStatistics } from '@/features/user-activity/components/UserStatistics';
import { DashboardIntro } from '@/features/user-activity/components/DashboardIntro';
import { UserProfile } from '@/components/dashboard/UserProfile';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  // 서버 전용 클라이언트 생성
  const supabase = createServerOnlyClient();
  
  // 사용자 프로필 정보 가져오기
  let profile = null;
  try {
    const { data } = await supabase
      .from('users')
      .select('id, name, image')
      .eq('id', session.user.id)
      .single();
    profile = data;
  } catch (error) {
    console.error('사용자 프로필 정보 조회 오류:', error);
  }
  
  const userName = profile?.name || session.user.name || '사용자';
  const userEmail = session.user.email;
  const userImage = profile?.image || session.user.image;
  
  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-2xl font-bold mb-6">내 대시보드</h1>
      
      {/* 대시보드 소개 */}
      <DashboardIntro username={userName} />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* 프로필 및 통계 영역 */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* 프로필 카드 */}
          <UserProfile 
            name={userName}
            email={userEmail}
            image={userImage}
          />
          
          {/* 통계 컴포넌트 */}
          <UserStatistics />
        </div>
        
        {/* 활동 내역 영역 */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold mb-4">최근 테스트 활동</h2>
          <UserActivityList />
        </div>
      </div>
    </div>
  );
} 