'use client';

import { useAppSession } from '@/components/auth/session-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Loader2, User, LogOut, ArrowLeft, Settings, Bell, 
  Heart, Clock, BarChart2, History, Calendar 
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

interface UserProfileData {
  profile: {
    userId: string;
    name: string;
    email: string;
    role: string;
    joinDate: string | null;
    image: string | null;
  };
  statistics: {
    totalTests: number;
    completedUniqueTests: number;
    favoriteTest: {
      id: string;
      title: string;
      count: number;
    } | null;
    averageCompletionTime: string;
    lastActivityDate: string | null;
  };
}

interface Activity {
  id: string;
  test_id: string;
  test_title: string;
  result_summary: string;
  created_at: string;
}

export default function ProfilePage() {
  const { isLoading, isAuthenticated, user } = useAppSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('인증되지 않은 사용자, 로그인 페이지로 이동');
      router.replace('/auth/signin?callbackUrl=/profile');
    }
  }, [isLoading, isAuthenticated, router]);

  // API에서 프로필 데이터 가져오기
  useEffect(() => {
    if (isAuthenticated) {
      const fetchProfileData = async () => {
        try {
          setIsLoadingData(true);
          // 프로필 정보와 통계 가져오기
          const profileResponse = await fetch('/api/user-profile');
          if (!profileResponse.ok) {
            throw new Error('프로필 데이터를 가져오는데 실패했습니다');
          }
          const profileData = await profileResponse.json();
          setProfileData(profileData);

          // 활동 내역 가져오기
          const activitiesResponse = await fetch('/api/user-activity');
          if (activitiesResponse.ok) {
            const activityData = await activitiesResponse.json();
            setActivities(activityData.activities || []);
          }
        } catch (error) {
          console.error('데이터 로딩 오류:', error);
        } finally {
          setIsLoadingData(false);
        }
      };

      fetchProfileData();
    }
  }, [isAuthenticated]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // 로딩 중일 때의 UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    );
  }

  // 인증되지 않은 상태일 때는 빈 페이지 반환 (리다이렉트가 이루어질 것임)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-gray-600">로그인 페이지로 이동 중...</p>
      </div>
    );
  }

  // 가입일 포맷팅 함수
  const formatJoinDate = (dateString: string | null) => {
    if (!dateString) return '정보 없음';
    try {
      return format(new Date(dateString), 'yyyy년 MM월 dd일', { locale: ko });
    } catch {
      return '정보 없음';
    }
  };

  // 애니메이션 설정
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const renderStatisticSkeleton = () => (
    <div className="grid grid-cols-2 gap-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-6 w-12" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* 모바일 최적화 헤더 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link 
                href="/" 
                className="inline-flex items-center text-gray-700 hover:text-rose-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">홈으로</span>
              </Link>
            </div>
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">내 프로필</h1>
            </div>
            <div className="flex items-center justify-end">
              <Link 
                href="/profile/settings" 
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* 프로필 헤더 카드 */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6 overflow-hidden border-none shadow-md">
            <div className="h-32 bg-gradient-to-r from-rose-500 to-pink-500"></div>
            <CardContent className="relative px-6 pb-6 -mt-16">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <Avatar className="h-24 w-24 ring-4 ring-white bg-white shadow-md">
                    <AvatarImage src={user?.image || ''} />
                    <AvatarFallback className="bg-rose-100">
                      <User className="h-12 w-12 text-rose-500" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-4 sm:mt-0 sm:ml-6">
                    <h2 className="text-2xl font-bold text-gray-900">{user?.name || '사용자'}</h2>
                    <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary" className="bg-rose-100 text-rose-800 hover:bg-rose-200">
                        {profileData?.profile.role === 'admin' ? '관리자' : '일반 회원'}
                      </Badge>
                      <Badge variant="outline" className="border-gray-200 text-gray-600">
                        가입일: {isLoadingData ? '로딩중...' : formatJoinDate(profileData?.profile.joinDate || null)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-0 flex gap-2">
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    로그아웃
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 탭 메뉴 */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 sm:grid-cols-4 lg:w-auto lg:inline-flex bg-white p-1 rounded-lg shadow-sm">
              <TabsTrigger value="overview" className="text-xs sm:text-sm flex items-center gap-1">
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">요약</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-xs sm:text-sm flex items-center gap-1">
                <History className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">활동</span>
              </TabsTrigger>
              <TabsTrigger value="results" className="text-xs sm:text-sm flex items-center gap-1">
                <BarChart2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">결과</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="text-xs sm:text-sm flex items-center gap-1">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">찜한 테스트</span>
              </TabsTrigger>
            </TabsList>

            {/* 요약 탭 */}
            <TabsContent value="overview">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={activeTab === 'overview' ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* 통계 요약 카드 */}
                <motion.div variants={itemVariants}>
                  <Card className="shadow-sm border-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold flex items-center">
                        <BarChart2 className="mr-2 h-5 w-5 text-rose-500" />
                        통계 요약
                      </CardTitle>
                      <CardDescription>나의 테스트 활동 통계</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoadingData ? (
                        renderStatisticSkeleton()
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">총 테스트 수</p>
                            <p className="text-2xl font-bold text-gray-900">{profileData?.statistics.totalTests || 0}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">완료한 테스트</p>
                            <p className="text-2xl font-bold text-gray-900">{profileData?.statistics.completedUniqueTests || 0}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">평균 완료 시간</p>
                            <p className="text-2xl font-bold text-gray-900">{profileData?.statistics.averageCompletionTime || '-'}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">가장 많이 한 테스트</p>
                            <p className="text-lg font-bold text-gray-900 truncate">
                              {profileData?.statistics.favoriteTest?.title || '-'}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* 최근 활동 카드 */}
                <motion.div variants={itemVariants}>
                  <Card className="shadow-sm border-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-rose-500" />
                        최근 활동
                      </CardTitle>
                      <CardDescription>최근에 진행한 테스트</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoadingData ? (
                        <div className="space-y-4">
                          {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                              <Skeleton className="h-8 w-8 rounded-full" />
                              <div className="flex-1">
                                <Skeleton className="h-4 w-3/4 mb-2" />
                                <Skeleton className="h-3 w-1/2" />
                              </div>
                              <Skeleton className="h-3 w-16" />
                            </div>
                          ))}
                        </div>
                      ) : activities.length > 0 ? (
                        <div className="space-y-4">
                          {activities.slice(0, 3).map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                              <div className="rounded-full bg-rose-100 p-2">
                                <Calendar className="h-4 w-4 text-rose-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{activity.test_title}</p>
                                <p className="text-xs text-gray-500">
                                  결과: {activity.result_summary || '결과 없음'}
                                </p>
                              </div>
                              <div className="text-xs text-gray-500">
                                {format(new Date(activity.created_at), 'yyyy.MM.dd', { locale: ko })}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <Clock className="h-12 w-12 text-gray-300 mb-2" />
                          <p className="text-gray-500">아직 활동 내역이 없습니다</p>
                        </div>
                      )}
                    </CardContent>
                    {activities.length > 0 && (
                      <CardFooter className="pt-0">
                        <Link 
                          href="/my-results" 
                          className="text-rose-600 hover:text-rose-800 text-sm font-medium"
                        >
                          모든 결과 보기
                        </Link>
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* 활동 탭 */}
            <TabsContent value="activity">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={activeTab === 'activity' ? "visible" : "hidden"}
              >
                <motion.div variants={itemVariants}>
                  <Card className="shadow-sm border-none">
                    <CardHeader>
                      <CardTitle>나의 활동 기록</CardTitle>
                      <CardDescription>모든 테스트 기록을 확인하세요</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoadingData ? (
                        <div className="space-y-6">
                          {[...Array(5)].map((_, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                              <div className="flex items-center gap-3">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <div className="flex-1">
                                  <Skeleton className="h-4 w-2/3 mb-2" />
                                  <Skeleton className="h-3 w-1/3" />
                                </div>
                                <Skeleton className="h-6 w-16 rounded-md" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : activities.length > 0 ? (
                        <div className="space-y-6">
                          {activities.map((activity, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                              <div className="flex items-center gap-3">
                                <div className="rounded-full bg-gray-100 p-2">
                                  <Calendar className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{activity.test_title}</p>
                                  <p className="text-sm text-gray-500">
                                    {format(new Date(activity.created_at), 'yyyy년 MM월 dd일', { locale: ko })}
                                  </p>
                                </div>
                                <Badge>{activity.result_summary || '결과 없음'}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                          <History className="h-16 w-16 text-gray-300 mb-4" />
                          <p className="text-gray-500 mb-2">아직 활동 내역이 없습니다</p>
                          <Link href="/">
                            <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 cursor-pointer px-4 py-2">
                              테스트 시작하기
                            </Badge>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                    {activities.length > 5 && (
                      <CardFooter>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          더 보기
                        </button>
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* 결과 탭 */}
            <TabsContent value="results">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={activeTab === 'results' ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {isLoadingData ? (
                  [...Array(6)].map((_, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="shadow-sm border-none overflow-hidden">
                        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300"></div>
                        <CardHeader className="pb-2">
                          <Skeleton className="h-5 w-1/2 mb-1" />
                          <Skeleton className="h-4 w-1/3" />
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div>
                              <Skeleton className="h-4 w-32 mb-2" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                            <Skeleton className="h-6 w-16 rounded-md" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="shadow-sm hover:shadow-md transition-shadow border-none overflow-hidden">
                        <div className="h-3 bg-gradient-to-r from-rose-500 to-pink-500"></div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">테스트 결과 #{index + 1}</CardTitle>
                          <CardDescription className="text-xs">
                            {format(new Date(activity.created_at), 'yyyy.MM.dd', { locale: ko })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">{activity.test_title}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true, locale: ko })}
                              </p>
                            </div>
                            <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                              {activity.result_summary || '결과 없음'}
                            </Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Link 
                            href={`/results/${activity.id}`}
                            className="text-xs text-rose-600 hover:text-rose-800"
                          >
                            결과 자세히 보기
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 lg:col-span-3">
                    <Card className="shadow-sm border-none p-8 text-center">
                      <BarChart2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <CardTitle className="mb-2">아직 테스트 결과가 없습니다</CardTitle>
                      <CardDescription className="mb-6">테스트를 완료하면 여기에 결과가 표시됩니다</CardDescription>
                      <Link href="/">
                        <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 cursor-pointer px-4 py-2">
                          테스트 시작하기
                        </Badge>
                      </Link>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>

            {/* 찜 목록 탭 */}
            <TabsContent value="favorites">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={activeTab === 'favorites' ? "visible" : "hidden"}
              >
                <motion.div variants={itemVariants}>
                  <Card className="shadow-sm border-none">
                    <CardHeader>
                      <CardTitle>찜한 테스트</CardTitle>
                      <CardDescription>나중에 해볼 테스트 목록입니다</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <Heart className="h-16 w-16 text-gray-300 mb-4" />
                        <p className="text-gray-500 mb-6">아직 찜한 테스트가 없습니다</p>
                        <Link href="/">
                          <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 cursor-pointer px-4 py-2">
                            테스트 둘러보기
                          </Badge>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
} 