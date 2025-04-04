"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase/database.types";
import { Spinner } from "@/components/ui/spinner";

const TEST_CATEGORIES = [
  "성격", "심리", "관계", "능력", "MBTI", "연애", "직업", "취향", "기타"
];

const TEST_DURATIONS = [
  "1분 미만", "1-3분", "3-5분", "5-10분", "10분 이상"
];

interface FormData {
  title: string;
  description: string;
  category: string;
  duration: string;
  thumbnail_url: string;
  is_active: boolean;
}

export default function EditTestCardPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    duration: "",
    thumbnail_url: "",
    is_active: true,
  });

  // 테스트 카드 데이터 가져오기
  useEffect(() => {
    async function fetchTestCard() {
      try {
        const supabase = createClientComponentClient<Database>();
        
        const { data, error } = await supabase
          .from('test_card_stats')
          .select('*')
          .eq('id', params.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setFormData({
            title: data.title,
            description: data.description || "",
            category: data.category || "",
            duration: data.duration || "",
            thumbnail_url: data.thumbnail_url || "",
            is_active: data.is_active || false,
          });
        }
      } catch (error) {
        console.error('테스트 카드 로딩 실패:', error);
        alert('테스트 카드 정보를 불러오는데 실패했습니다.');
      } finally {
        setInitialLoading(false);
      }
    }
    
    fetchTestCard();
  }, [params.id]);

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
          thumbnail_url: formData.thumbnail_url || null,
          is_active: formData.is_active,
          category: formData.category,
          duration: formData.duration,
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
  
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spinner size="lg" />
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
          <CardTitle className="text-2xl">
            테스트 카드 수정: {params.id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
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
                <Label htmlFor="thumbnail_url">썸네일 URL</Label>
                <Input
                  id="thumbnail_url"
                  name="thumbnail_url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.thumbnail_url}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))}
                  id="is_active"
                />
                <Label htmlFor="is_active">활성 상태</Label>
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
                    처리 중...
                  </>
                ) : (
                  "테스트 카드 수정"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 