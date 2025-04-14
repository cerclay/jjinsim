"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CalendarDays, Settings, Share2, Award, TrendingUp, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface UserProfileProps {
  name: string;
  email: string | null;
  image: string | null;
}

export function UserProfile({ name, email, image }: UserProfileProps) {
  // 로딩 상태 관리
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  
  // Next-Auth 세션 정보 가져오기
  const { data: session, status } = useSession();
  
  // 카카오 로그인 여부 확인
  const isKakaoUser = email?.startsWith('kakao_') || false;
  
  // 프로필 이미지 로딩 상태
  const [imageError, setImageError] = useState(false);
  
  // 세션 상태에 따라 로그인/로그아웃 상태 관리
  useEffect(() => {
    if (isLoggingOut && status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, isLoggingOut, router]);
  
  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      if (isKakaoUser) {
        // 카카오 로그아웃 페이지로 이동 - 직접 signOut 호출
        await signOut({ 
          redirect: true,
          callbackUrl: '/auth/kakao-logout'
        });
        return;
      }
      
      // 일반 로그아웃 처리
      await signOut({ 
        redirect: true, 
        callbackUrl: '/' 
      });
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error);
      toast({
        title: '로그아웃 오류',
        description: '로그아웃 처리 중 문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive'
      });
      setIsLoggingOut(false);
    }
  };
  
  // 예시 데이터 - 실제로는 API에서 가져오거나 props로 받을 수 있습니다
  const joinDate = new Date('2023-01-15');
  const level = 3;
  const badges = [
    { name: '테스트 마스터', icon: <Award className="h-3 w-3" />, color: 'bg-amber-100 text-amber-800' },
    { name: '커뮤니티 멤버', icon: <Share2 className="h-3 w-3" />, color: 'bg-blue-100 text-blue-800' },
    { name: '급성장', icon: <TrendingUp className="h-3 w-3" />, color: 'bg-green-100 text-green-800' },
  ];
  
  return (
    <Card className="overflow-hidden">
      <div className="h-20 sm:h-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
      <CardContent className="pt-0 relative p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-end -mt-10 sm:-mt-12 mb-4">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden bg-white p-1 mx-auto sm:mx-0 shadow-md flex-shrink-0">
            {image && !imageError ? (
              <Image
                src={image}
                alt={name || '사용자'}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                priority
                className="object-cover rounded-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 bg-gray-100 rounded-full">
                <span className="text-2xl">👤</span>
              </div>
            )}
            <div className="absolute bottom-1 right-1 h-4 w-4 sm:h-5 sm:w-5 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-1 text-center sm:text-left sm:ml-4 mt-2 sm:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-bold text-base sm:text-lg">{name || '사용자'}</h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate max-w-[200px] sm:max-w-none">
                  {email || ''}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto text-xs h-8"
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        <span className="truncate">프로필 설정</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>프로필 정보를 수정합니다</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`w-full sm:w-auto text-xs h-8 ${isKakaoUser ? 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100' : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'}`}
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                      >
                        <LogOut className="h-3 w-3 mr-1" />
                        <span className="truncate">
                          {isLoggingOut ? '로그아웃 중...' : (isKakaoUser ? '카카오 로그아웃' : '로그아웃')}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isKakaoUser ? '카카오 계정에서 로그아웃합니다' : '로그아웃합니다'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <CalendarDays className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">가입일: {format(joinDate, 'yyyy년 MM월 dd일')}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3">
          <div className="flex-1 w-full">
            <div className="text-xs font-medium mb-1">레벨 {level}</div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${level * 10}%` }}
              ></div>
            </div>
          </div>
          <div className="text-xs text-gray-500 whitespace-nowrap ml-0 sm:ml-2">
            다음 레벨까지 <span className="font-medium">2</span> 테스트
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 sm:gap-2 mt-3">
          {badges.map((badge, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={`${badge.color} flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs`}
                  >
                    {badge.icon}
                    <span className="hidden sm:inline">{badge.name}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{badge.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 