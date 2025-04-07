"use client";

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListTodo, ExternalLink, CalendarDays } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface UserActivity {
  id: string;
  test_id: string;
  test_title: string;
  result_summary: string;
  image_url: string;
  created_at: string;
}

export function UserActivityList() {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true);
        const response = await fetch('/api/user-activity');
        
        if (!response.ok) {
          throw new Error('활동 데이터를 불러오는데 실패했습니다');
        }
        
        const data = await response.json();
        setActivities(data.activities || []);
      } catch (err) {
        console.error('활동 데이터 로딩 에러:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Skeleton className="h-16 w-16 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <ListTodo className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-sm text-gray-500">아직 완료한 테스트가 없습니다.</p>
          <Link href="/">
            <Button 
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
            >
              테스트 시작하기
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-xs">
              <CalendarDays className="h-3 w-3 mr-1" />
              {format(new Date(activity.created_at), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
            </CardDescription>
            <CardTitle className="text-lg">{activity.test_title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              {activity.image_url && (
                <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={activity.image_url}
                    alt={activity.test_title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
              )}
              <div>
                <p className="text-sm text-gray-700">{activity.result_summary || '결과가 저장되지 않았습니다.'}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/tests/${activity.test_id}`}>
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                테스트 다시하기
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 