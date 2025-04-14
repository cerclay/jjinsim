'use client';

import React, { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { UserActivityList } from '@/features/user-activity/components/UserActivityList';
import { UserStatistics } from '@/features/user-activity/components/UserStatistics';
import { DashboardIntro } from '@/features/user-activity/components/DashboardIntro';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { UserActivityChart } from '@/features/user-activity/components/UserActivityChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);
  
  // 로딩 상태일 때 표시
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // 인증되지 않은 경우
  if (status === 'unauthenticated') {
    return null; // useEffect에서 리다이렉트 처리
  }
  
  const userName = session?.user?.name || '사용자';
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 모바일 백 버튼 */}
      <div className="lg:hidden p-3 flex items-center border-b bg-white">
        <Link href="/" className="flex items-center text-sm text-gray-700">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>홈으로</span>
        </Link>
      </div>
      
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
        {/* 대시보드 소개 */}
        <DashboardIntro username={userName} />
        
        {/* 모바일 최적화된 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* 왼쪽 사이드바: 프로필 및 통계 */}
          <div className="space-y-4 sm:space-y-6">
            {/* 프로필 카드 */}
            <UserProfile 
              name={userName}
              email={userEmail}
              image={userImage}
            />
            
            {/* 통계 컴포넌트 */}
            <UserStatistics />
          </div>
          
          {/* 오른쪽 메인 콘텐츠: 차트 및 활동 내역 */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* 차트 섹션 */}
            <UserActivityChart />
            
            {/* 활동 내역 섹션 */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                최근 테스트 활동
              </h2>
              
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="mb-3 sm:mb-4 w-full max-w-md grid grid-cols-2">
                  <TabsTrigger value="recent" className="flex items-center gap-1 text-xs sm:text-sm">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>최근 활동</span>
                  </TabsTrigger>
                  <TabsTrigger value="all" className="flex items-center gap-1 text-xs sm:text-sm">
                    <BarChart className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>모든 활동</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="recent" className="mt-0">
                  <UserActivityList />
                </TabsContent>
                
                <TabsContent value="all" className="mt-0">
                  <UserActivityList />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 