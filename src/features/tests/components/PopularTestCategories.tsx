"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock } from "lucide-react";
import Image from "next/image";

interface TestCardData {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  tags: string[];
  participation_count: number;
  like_count: number;
  accurate_count: number;
  save_count: number;
  categories: string;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  display_name: string;
  test_count: number;
}

export default function PopularTestCategories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTests, setAllTests] = useState<TestCardData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      // 인기 카테고리 불러오기 (테스트 수 기준으로 내림차순 정렬)
      const { data: categoriesData, error: categoriesError } = await supabase
        .rpc('get_popular_categories')
        .limit(10);
      
      if (categoriesError) {
        console.error("카테고리 조회 오류:", categoriesError);
      } else if (categoriesData) {
        setCategories(categoriesData);
      }
      
      // 모든 테스트 카드 불러오기 (참여수 기준 내림차순)
      const { data: testsData, error: testsError } = await supabase
        .from('test_card_stats')
        .select('*')
        .order('participation_count', { ascending: false })
        .limit(50);
      
      if (testsError) {
        console.error("테스트 카드 조회 오류:", testsError);
      } else if (testsData) {
        setAllTests(testsData);
      }
      
      setLoading(false);
    }
    
    fetchData();
  }, [supabase]);

  // 선택된 카테고리에 따라 테스트 필터링
  const filteredTests = selectedCategory === "all" 
    ? allTests 
    : allTests.filter(test => test.categories?.includes(selectedCategory));

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">📊 인기 카테고리별 테스트</h2>
      
      <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
        <TabsList className="flex flex-wrap h-auto mb-4 gap-1">
          <TabsTrigger value="all" className="mb-1">
            전체
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.name} className="mb-1">
              {category.display_name} ({category.test_count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-0">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <TestCardItem key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">이 카테고리에 테스트가 없습니다.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TestCardItem({ test }: { test: TestCardData }) {
  // 날짜 포맷 헬퍼 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "오늘";
    } else if (diffDays === 1) {
      return "어제";
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)}주 전`;
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)}개월 전`;
    }
    return `${Math.floor(diffDays / 365)}년 전`;
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={test.thumbnail_url || `https://picsum.photos/seed/${test.id}/400/200`}
            alt={test.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate(test.created_at)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{test.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{test.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {test.tags?.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {test.tags?.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{test.tags.length - 3}
            </Badge>
          )}
        </div>
        <div className="text-sm text-gray-500 flex items-center justify-between">
          <span>{test.participation_count.toLocaleString()}명 참여</span>
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-1 text-red-500" />
            <span>{test.like_count}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/test/${test.id}`} className="w-full">
          <Button variant="secondary" className="w-full">
            테스트 시작하기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 