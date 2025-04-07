"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase/database.types";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const TEST_CATEGORIES = [
  "성격", "심리", "관계", "능력", "MBTI", "연애", "직업", "취향", "여행", "기타"
];

const TEST_DURATIONS = [
  "1분 미만", "1-3분", "3-5분", "5-10분", "10분 이상"
];

interface TestCardFormData {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  imageUrl: string;
  isPopular: boolean;
  isNew: boolean;
  isActive: boolean;
  participation_count: number;
  like_count: number;
  popular_order: number;
  new_order: number;
}

export default function EditTestCardPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState<TestCardFormData>({
    id: params.id,
    title: "",
    description: "",
    category: "",
    duration: "",
    imageUrl: "",
    isPopular: false,
    isNew: false,
    isActive: true,
    participation_count: 0,
    like_count: 0,
    popular_order: 0,
    new_order: 0
  });

  // 데이터 가져오기
  useEffect(() => {
    async function fetchTestCard() {
      try {
        setFetchLoading(true);
        const supabase = createClientComponentClient<Database>();
        
        const { data, error } = await supabase
          .from('test_card_stats')
          .select('*')
          .eq('id', params.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setFormData({
            id: data.id,
            title: data.title || "",
            description: data.description || "",
            category: data.category || "",
            duration: data.duration || "",
            imageUrl: data.image_url || "",
            isPopular: data.is_popular || false,
            isNew: data.is_new || false,
            isActive: data.is_active || false,
            participation_count: data.participation_count || 0,
            like_count: data.like_count || 0,
            popular_order: data.popular_order || 0,
            new_order: data.new_order || 0
          });
        }
      } catch (error) {
        console.error('테스트 카드 데이터 로딩 실패:', error);
        alert('테스트 카드를 찾을 수 없습니다.');
        router.push('/admin/tests');
      } finally {
        setFetchLoading(false);
      }
    }
    
    fetchTestCard();
  }, [params.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.title) {
      alert("제목은 필수 입력 항목입니다.");
      return;
    }
    
    try {
      setLoading(true);
      const supabase = createClientComponentClient<Database>();
      
      // 테스트 카드 업데이트
      const { error } = await supabase
        .from('test_card_stats')
        .update({
          title: formData.title,
          description: formData.description || null,
          image_url: formData.imageUrl || null,
          is_popular: formData.isPopular,
          is_new: formData.isNew,
          is_active: formData.isActive,
          category: formData.category,
          duration: formData.duration,
          popular_order: formData.popular_order,
          new_order: formData.new_order,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.id);
      
      if (error) throw error;
      
      alert('테스트 카드가 성공적으로 업데이트되었습니다!');
      router.push('/admin/tests');
    } catch (error) {
      console.error('테스트 카드 업데이트 실패:', error);
      alert('테스트 카드 업데이트에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <Link 
            href="/admin/tests" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            테스트 카드 목록으로 돌아가기
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full md:col-span-2" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link 
          href="/admin/tests" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          테스트 카드 목록으로 돌아가기
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">테스트 카드 편집</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="id">테스트 ID</Label>
                <Input
                  id="id"
                  name="id"
                  value={formData.id}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-sm text-gray-500">
                  ID는 변경할 수 없습니다.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">테스트 제목</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="테스트 제목을 입력하세요"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">테스트 설명</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="테스트에 대한 간략한 설명을 입력하세요"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEST_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">테스트 소요 시간</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="소요 시간 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEST_DURATIONS.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="imageUrl">썸네일 URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isPopular}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPopular: checked }))}
                  id="isPopular"
                />
                <Label htmlFor="isPopular">인기 테스트</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isNew}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isNew: checked }))}
                  id="isNew"
                />
                <Label htmlFor="isNew">새 테스트</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                  id="isActive"
                />
                <Label htmlFor="isActive">활성 상태</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">참여자 수</p>
                  <p className="text-xl font-bold">{formData.participation_count.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">좋아요 수</p>
                  <p className="text-xl font-bold">{formData.like_count.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 mt-4 border-t">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-2">테스트 노출 순서 관리</h3>
                <p className="text-sm text-gray-500 mb-4">
                  숫자가 작을수록 먼저 표시됩니다. 0은 기본값이며, 같은 값일 경우 생성일 순으로 정렬됩니다.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="popular_order">인기 테스트 순서</Label>
                <Input
                  id="popular_order"
                  name="popular_order"
                  type="number"
                  min="0"
                  value={formData.popular_order}
                  onChange={(e) => 
                    setFormData((prev) => ({ 
                      ...prev, 
                      popular_order: parseInt(e.target.value) || 0 
                    }))
                  }
                />
                <p className="text-xs text-gray-500">
                  인기 테스트 목록에서의 표시 순서 (숫자가 작을수록 먼저 표시)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new_order">새 테스트 순서</Label>
                <Input
                  id="new_order"
                  name="new_order"
                  type="number"
                  min="0"
                  value={formData.new_order}
                  onChange={(e) => 
                    setFormData((prev) => ({ 
                      ...prev, 
                      new_order: parseInt(e.target.value) || 0 
                    }))
                  }
                />
                <p className="text-xs text-gray-500">
                  새 테스트 목록에서의 표시 순서 (숫자가 작을수록 먼저 표시)
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => router.push('/admin/tests')}>
                취소
              </Button>
              <Button type="submit" disabled={loading} className="bg-rose-600 hover:bg-rose-700">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    변경사항 저장
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 