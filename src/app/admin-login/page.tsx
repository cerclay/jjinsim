'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 관리자 로그인 상태 체크
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/admin/auth/check', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.isAdmin) {
            router.push('/admin');
          }
        }
      } catch (error) {
        console.error('관리자 상태 확인 중 오류:', error);
      }
    };
    
    checkAdminStatus();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    
    try {
      setLoading(true);
      
      // 테스트용 하드코딩 로그인 처리
      if (username === 'admin' && password === 'password') {
        const adminUser = {
          id: '1',
          username: 'admin',
          role: 'admin',
        };
        
        // 로컬 스토리지에 저장
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        
        // 서버에도 인증 정보 저장
        await fetch('/api/admin/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            isTestLogin: true,
            username,
            password 
          }),
          credentials: 'include',
        });
        
        setSuccess(true);
        
        // 즉시 리다이렉트
        router.push('/admin');
        router.refresh();
        return;
      }
      
      // 서버 API를 통한 로그인
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "로그인에 실패했습니다.");
      }
      
      setSuccess(true);
      
      // 즉시 리다이렉트
      router.push('/admin');
      router.refresh();
    } catch (error: any) {
      console.error('로그인 실패:', error);
      setError(error.message || "로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
        <Spinner size="xl" className="mb-4 text-rose-600" />
        <h2 className="text-2xl font-bold mb-2">로그인 성공!</h2>
        <p className="text-gray-600 mb-4">관리자 페이지로 이동합니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">관리자 로그인</CardTitle>
          <CardDescription>테스트 카드 관리 시스템에 오신 것을 환영합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2 text-red-600">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">아이디</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-rose-600 hover:bg-rose-700"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" className="text-white" /> 로그인 중...
                </span>
              ) : "로그인"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 