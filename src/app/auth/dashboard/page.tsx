'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSession } from '@/components/auth/session-provider';
import { UserActivityList } from '@/features/user-activity/components/UserActivityList';
import { UserStatistics } from '@/features/user-activity/components/UserStatistics';
import { DashboardIntro } from '@/features/user-activity/components/DashboardIntro';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { UserActivityChart } from '@/features/user-activity/components/UserActivityChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { isLoading, isAuthenticated, user } = useAppSession();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isLoading, isAuthenticated, router]);
  
  // 로딩 상태일 때 표시
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // 인증되지 않은 경우
  if (!isAuthenticated) {
    return null; // useEffect에서 리다이렉트 처리
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-700 hover:text-rose-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">홈으로 돌아가기</span>
          </Link>
        </div>

        <DashboardIntro userName={user?.name || '사용자'} />

        <div className="mt-8">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList>
              <TabsTrigger value="activity" className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                활동 내역
              </TabsTrigger>
              <TabsTrigger value="statistics" className="flex items-center">
                <BarChart className="w-4 h-4 mr-2" />
                통계
              </TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="mt-6">
              <UserActivityList />
            </TabsContent>
            <TabsContent value="statistics" className="mt-6">
              <div className="grid gap-6">
                <UserStatistics />
                <UserActivityChart />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 