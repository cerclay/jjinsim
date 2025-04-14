"use client";

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { format, parseISO, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';

// 카테고리 색상
const CATEGORY_COLORS = {
  personality: '#4F46E5', // 인디고
  relationship: '#10B981', // 에메랄드
  career: '#F59E0B',      // 앰버
  iq: '#8B5CF6',          // 보라
  psychology: '#EC4899',  // 핑크
  fun: '#6366F1',         // 인디고
  default: '#94A3B8'      // 슬레이트
};

interface ActivityChartData {
  categoryDistribution: {
    name: string;
    count: number;
  }[];
  dailyActivity: {
    date: string;
    count: number;
  }[];
  monthlyTrend: {
    month: string;
    count: number;
  }[];
}

export function UserActivityChart() {
  const [chartData, setChartData] = useState<ActivityChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 반응형 처리를 위한 useEffect
  useEffect(() => {
    // 초기값 설정
    setIsMobile(window.innerWidth < 640);
    
    // 리사이즈 이벤트 핸들러
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
    
    // 클린업 함수
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    async function fetchChartData() {
      try {
        setLoading(true);
        const response = await fetch('/api/user-activity/chart');
        
        if (!response.ok) {
          throw new Error('차트 데이터를 불러오는데 실패했습니다');
        }
        
        const data = await response.json();
        
        // 실제 API가 없으므로 더미 데이터로 대체
        const dummyData: ActivityChartData = {
          categoryDistribution: [
            { name: '성격', count: 8 },
            { name: '관계', count: 5 },
            { name: '직업', count: 3 },
            { name: 'IQ', count: 6 },
            { name: '심리', count: 4 },
            { name: '재미', count: 7 }
          ],
          dailyActivity: Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), i);
            return {
              date: format(date, 'MM-dd'),
              count: Math.floor(Math.random() * 5)
            };
          }).reverse(),
          monthlyTrend: [
            { month: '1월', count: 10 },
            { month: '2월', count: 15 },
            { month: '3월', count: 12 },
            { month: '4월', count: 18 },
            { month: '5월', count: 22 },
            { month: '6월', count: 28 }
          ]
        };
        
        setChartData(data.chartData || dummyData);
      } catch (err) {
        console.error('차트 데이터 로딩 에러:', err);
        setError('차트 데이터를 불러오는 중 오류가 발생했습니다.');
        
        // 더미 데이터 설정
        const dummyData: ActivityChartData = {
          categoryDistribution: [
            { name: '성격', count: 8 },
            { name: '관계', count: 5 },
            { name: '직업', count: 3 },
            { name: 'IQ', count: 6 },
            { name: '심리', count: 4 },
            { name: '재미', count: 7 }
          ],
          dailyActivity: Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), i);
            return {
              date: format(date, 'MM-dd'),
              count: Math.floor(Math.random() * 5)
            };
          }).reverse(),
          monthlyTrend: [
            { month: '1월', count: 10 },
            { month: '2월', count: 15 },
            { month: '3월', count: 12 },
            { month: '4월', count: 18 },
            { month: '5월', count: 22 },
            { month: '6월', count: 28 }
          ]
        };
        
        setChartData(dummyData);
      } finally {
        setLoading(false);
      }
    }
    
    fetchChartData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent className="p-2 sm:p-6 pt-0 sm:pt-2">
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error && !chartData) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  // 안전을 위한 체크
  if (!chartData) return null;

  return (
    <Card>
      <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-4">
        <CardTitle className="text-base sm:text-xl">테스트 활동 분석</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          데이터를 통해 본 당신의 테스트 참여 패턴
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 pt-0 sm:pt-2">
        <Tabs defaultValue="category">
          <TabsList className="w-full grid grid-cols-3 mb-2 sm:mb-4">
            <TabsTrigger value="category" className="flex items-center gap-1 text-xs sm:text-sm py-1 sm:py-2">
              <PieChartIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">카테고리</span>
            </TabsTrigger>
            <TabsTrigger value="daily" className="flex items-center gap-1 text-xs sm:text-sm py-1 sm:py-2">
              <BarChart2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">일별</span>
            </TabsTrigger>
            <TabsTrigger value="trend" className="flex items-center gap-1 text-xs sm:text-sm py-1 sm:py-2">
              <LineChartIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">추세</span>
            </TabsTrigger>
          </TabsList>
          
          {/* 카테고리 분포 차트 */}
          <TabsContent value="category" className="h-[200px] sm:h-[250px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={isMobile ? 60 : 80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="name"
                  label={({ name, percent }) => 
                    isMobile
                      ? `${percent > 0.1 ? name : ''} ${(percent * 100).toFixed(0)}%`
                      : `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.categoryDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={CATEGORY_COLORS[Object.keys(CATEGORY_COLORS)[index % Object.keys(CATEGORY_COLORS).length] as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.default} 
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}회`, '테스트 수']} />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          {/* 일별 활동 차트 */}
          <TabsContent value="daily" className="h-[200px] sm:h-[250px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.dailyActivity} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <XAxis dataKey="date" tick={{ fontSize: isMobile ? 10 : 12 }} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                <Tooltip 
                  formatter={(value) => [`${value}회`, '테스트 수']} 
                  contentStyle={{ fontSize: isMobile ? '10px' : '12px' }}
                />
                <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          {/* 월별 추세 차트 */}
          <TabsContent value="trend" className="h-[200px] sm:h-[250px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.monthlyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: isMobile ? 10 : 12 }} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                <Tooltip 
                  formatter={(value) => [`${value}회`, '테스트 수']} 
                  contentStyle={{ fontSize: isMobile ? '10px' : '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#6366F1" 
                  strokeWidth={2}
                  dot={{ r: isMobile ? 3 : 4 }}
                  activeDot={{ r: isMobile ? 4 : 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 