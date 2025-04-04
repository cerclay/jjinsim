"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase/database.types";
import { Edit, Plus, Search, Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";

// 테스트 카드 타입 정의
interface TestCard {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  participation_count: number | null;
  like_count: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  category: string | null;
  duration: string | null;
}

export default function TestCardsPage() {
  const router = useRouter();
  const [testCards, setTestCards] = useState<TestCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<TestCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // 테스트 카드 데이터 가져오기
  const fetchTestCards = async () => {
    try {
      setLoading(true);
      const supabase = createClientComponentClient<Database>();
      
      const { data, error } = await supabase
        .from('test_card_stats')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setTestCards(data || []);
      setFilteredCards(data || []);
    } catch (error) {
      console.error('테스트 카드 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTestCards();
  }, []);
  
  // 검색 및 필터링
  useEffect(() => {
    let filtered = [...testCards];
    
    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(card => 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (card.description && card.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // 카테고리 필터링
    if (categoryFilter !== "all") {
      filtered = filtered.filter(card => card.category === categoryFilter);
    }
    
    // 상태 필터링
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter(card => card.is_active === isActive);
    }
    
    setFilteredCards(filtered);
  }, [searchTerm, categoryFilter, statusFilter, testCards]);
  
  // 카테고리 목록 추출
  const categories = [...new Set(testCards.map(card => card.category))].filter(Boolean);

  // 상태 변경 함수
  const toggleCardStatus = async (id: string, currentStatus: boolean | null) => {
    try {
      setActionLoading(id);
      const supabase = createClientComponentClient<Database>();
      
      const { error } = await supabase
        .from('test_card_stats')
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      
      // 상태 업데이트 후 데이터 갱신
      setTestCards(prevCards => prevCards.map(card => 
        card.id === id ? { ...card, is_active: !currentStatus } : card
      ));
    } catch (error) {
      console.error('테스트 카드 상태 변경 실패:', error);
      alert('테스트 카드 상태 변경에 실패했습니다.');
    } finally {
      setActionLoading(null);
    }
  };
  
  // 테스트 카드 삭제 함수
  const deleteTestCard = async (id: string) => {
    if (!confirm('정말로 이 테스트 카드를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }
    
    try {
      setActionLoading(id);
      const supabase = createClientComponentClient<Database>();
      
      const { error } = await supabase
        .from('test_card_stats')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // 삭제 후 데이터 갱신
      setTestCards(prevCards => prevCards.filter(card => card.id !== id));
      alert('테스트 카드가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('테스트 카드 삭제 실패:', error);
      alert('테스트 카드 삭제에 실패했습니다.');
    } finally {
      setActionLoading(null);
    }
  };

  // 테스트 카드 수정 페이지로 이동
  const editTestCard = (id: string) => {
    router.push(`/admin/tests/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">테스트 카드 관리</h1>
        <Link href="/admin/tests/new">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <Plus className="h-4 w-4 mr-2" />
            새 테스트 카드
          </Button>
        </Link>
      </div>
      
      {/* 필터링 및 검색 */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="search" className="mb-2 block">검색</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="search"
                type="search"
                placeholder="제목 또는 설명으로 검색"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="category" className="mb-2 block">카테고리</Label>
            <Select 
              value={categoryFilter} 
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 카테고리</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category || ""}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="status" className="mb-2 block">상태</Label>
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="active">활성</SelectItem>
                <SelectItem value="inactive">비활성</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* 테스트 카드 테이블 */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableCaption>총 {filteredCards.length}개의 테스트 카드</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">상태</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead className="text-right">참여자 수</TableHead>
                <TableHead>생성일</TableHead>
                <TableHead className="text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>
                      <Badge 
                        className={`${card.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        {card.is_active ? '활성' : '비활성'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{card.title}</div>
                      {card.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {card.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{card.category || '미분류'}</TableCell>
                    <TableCell className="text-right">
                      {card.participation_count?.toLocaleString() || 0}
                    </TableCell>
                    <TableCell>
                      {card.created_at ? 
                        format(new Date(card.created_at), 'yyyy.MM.dd', { locale: ko }) : 
                        '—'
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => toggleCardStatus(card.id, card.is_active)}
                          disabled={actionLoading === card.id}
                          title={card.is_active ? '비활성화하기' : '활성화하기'}
                        >
                          {actionLoading === card.id ? (
                            <Spinner size="sm" />
                          ) : card.is_active ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          title="수정하기"
                          onClick={() => editTestCard(card.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          title="삭제하기"
                          onClick={() => deleteTestCard(card.id)}
                          disabled={actionLoading === card.id}
                        >
                          {actionLoading === card.id ? (
                            <Spinner size="sm" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' ? 
                      '검색 조건에 맞는 테스트 카드가 없습니다.' : 
                      '등록된 테스트 카드가 없습니다.'
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
} 