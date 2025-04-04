"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from "@/lib/supabase/database.types";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { 
  BarChart3, 
  FileText, 
  Plus, 
  Users, 
  ArrowRight,
  Eye,
  ThumbsUp 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface TestCard {
  id: string;
  title: string;
  category: string | null;
  created_at: string | null;
  is_active: boolean | null;
  participation_count: number | null;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCards: 0,
    activeCards: 0,
    totalParticipants: 0
  });
  const [recentTests, setRecentTests] = useState<TestCard[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const supabase = createClientComponentClient<Database>();
        
        // 테스트 카드 통계 가져오기
        const { data: testCards, error: testsError } = await supabase
          .from('test_card_stats')
          .select('*');
        
        if (testsError) throw testsError;
        
        // 최근 테스트 5개 가져오기
        const { data: recentTestCards, error: recentError } = await supabase
          .from('test_card_stats')
          .select('id, title, category, created_at, is_active, participation_count')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (recentError) throw recentError;
        
        // 통계 계산
        const totalCards = testCards?.length || 0;
        const activeCards = testCards?.filter(card => card.is_active).length || 0;
        const totalParticipants = testCards?.reduce((sum, card) => sum + (card.participation_count || 0), 0) || 0;
        
        setStats({
          totalCards,
          activeCards,
          totalParticipants
        });
        
        setRecentTests(recentTestCards || []);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">관리자 대시보드</h1>
        <Button asChild className="bg-rose-600 hover:bg-rose-700">
          <Link href="/admin/tests/new">
            <Plus className="mr-2 h-4 w-4" />
            새 테스트 카드
          </Link>
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="테스트 카드 수"
          value={stats.totalCards}
          loading={loading}
          icon={<FileText className="h-5 w-5 text-blue-600" />}
          description="등록된 총 테스트 카드 수"
        />
        
        <StatCard
          title="활성화된 테스트"
          value={stats.activeCards}
          loading={loading}
          icon={<Eye className="h-5 w-5 text-green-600" />}
          description="현재 활성화된 테스트 카드 수"
        />
        
        <StatCard
          title="총 참여자 수"
          value={stats.totalParticipants}
          loading={loading}
          icon={<ThumbsUp className="h-5 w-5 text-rose-600" />}
          description="모든 테스트 총 참여자 수"
        />
      </div>

      {/* 최근 테스트 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">최근 테스트 카드</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-5 w-1/6" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {recentTests.length > 0 ? (
                <div className="space-y-4">
                  {recentTests.map((test) => (
                    <div key={test.id} className="flex flex-col md:flex-row md:justify-between md:items-center py-2">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${test.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          <h3 className="font-medium">{test.title}</h3>
                        </div>
                        <div className="text-sm text-gray-500 flex flex-wrap items-center gap-2 mt-1">
                          <span>
                            카테고리: {test.category || '미분류'}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span>
                            생성일: {test.created_at ? format(new Date(test.created_at), 'yyyy.MM.dd', { locale: ko }) : '—'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <div className="text-sm text-gray-500 mr-4">
                          <span className="font-medium text-gray-700">{test.participation_count?.toLocaleString() || 0}</span> 참여
                        </div>
                        <Button asChild variant="outline" size="sm" className="ml-auto md:ml-0">
                          <Link href={`/admin/tests/${test.id}`}>
                            편집
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  등록된 테스트 카드가 없습니다.
                </div>
              )}
              
              <Separator className="my-4" />
              
              <div className="flex justify-end">
                <Button asChild variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                  <Link href="/admin/tests" className="flex items-center">
                    모든 테스트 카드 보기
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* 바로가기 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">빠른 바로가기</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/admin/tests" className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-rose-600" />
                테스트 카드 관리
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/admin/tests/new" className="flex items-center">
                <Plus className="mr-2 h-4 w-4 text-blue-600" />
                새 테스트 카드 추가
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/admin/users" className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-green-600" />
                사용자 관리
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/admin/statistics" className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4 text-purple-600" />
                통계 보기
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  loading: boolean;
  icon: React.ReactNode;
  description?: string;
}

function StatCard({ title, value, loading, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-500">{title}</h3>
          <div className="p-2 bg-gray-50 rounded-full">{icon}</div>
        </div>
        <div className="mt-3">
          {loading ? (
            <Skeleton className="h-10 w-24" />
          ) : (
            <p className="text-3xl font-bold">{value.toLocaleString()}</p>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-500 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
} 