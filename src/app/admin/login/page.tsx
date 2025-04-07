"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { setCookie } from "cookies-next";
import { Spinner } from "@/components/ui/spinner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState("");
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    
    try {
      setLoading(true);
      console.log('로그인 시도:', username);
      
      // 서버 API를 통한 로그인 검증
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
      
      console.log('로그인 성공, 서버에서 쿠키 설정 완료');
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError("");
    
    if (!username) {
      setChangePasswordError("아이디를 입력해주세요.");
      return;
    }
    
    if (!password) {
      setChangePasswordError("현재 비밀번호를 입력해주세요.");
      return;
    }
    
    if (!newPassword || !confirmPassword) {
      setChangePasswordError("새 비밀번호와 확인을 모두 입력해주세요.");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setChangePasswordError("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }
    
    try {
      setChangePasswordLoading(true);
      
      const response = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username, 
          currentPassword: password, 
          newPassword 
        }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "비밀번호 변경에 실패했습니다.");
      }
      
      setChangePasswordSuccess(true);
      setTimeout(() => {
        setShowChangePassword(false);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setChangePasswordSuccess(false);
      }, 2000);
    } catch (error: any) {
      console.error('비밀번호 변경 실패:', error);
      setChangePasswordError(error.message || "비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setChangePasswordLoading(false);
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
          {showChangePassword ? (
            <>
              {changePasswordError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{changePasswordError}</p>
                </div>
              )}
              
              {changePasswordSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-start gap-2 text-green-600">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">비밀번호가 성공적으로 변경되었습니다.</p>
                </div>
              )}
              
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="change-username">아이디</Label>
                  <Input
                    id="change-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="current-password">현재 비밀번호</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">새 비밀번호</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-rose-600 hover:bg-rose-700"
                    disabled={changePasswordLoading}
                  >
                    {changePasswordLoading ? (
                      <span className="flex items-center gap-2">
                        <Spinner size="sm" className="text-white" /> 변경 중...
                      </span>
                    ) : "비밀번호 변경"}
                  </Button>
                  
                  <Button 
                    type="button" 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => setShowChangePassword(false)}
                  >
                    취소
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
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
                    placeholder="관리자 아이디 입력"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">비밀번호</Label>
                    <Button 
                      variant="link" 
                      className="h-auto p-0 text-sm" 
                      onClick={() => setShowChangePassword(true)}
                    >
                      비밀번호 변경
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호 입력"
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 