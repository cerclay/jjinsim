'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function KakaoLogoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }
    
    if (status === 'authenticated') {
      handleKakaoLogout();
    }
  }, [status, router]);
  
  const handleKakaoLogout = async () => {
    try {
      setIsProcessing(true);
      
      // 카카오 사용자인지 확인
      const isKakaoUser = session?.user?.email?.startsWith('kakao_') || false;
      
      if (isKakaoUser) {
        // 카카오 로그아웃 API 호출
        try {
          const response = await fetch('/api/auth/kakao-logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('카카오 로그아웃 API 오류:', errorData);
            setError('카카오 로그아웃 처리 중 오류가 발생했습니다.');
          }
        } catch (error) {
          console.error('카카오 로그아웃 요청 중 오류:', error);
          setError('카카오 로그아웃 요청 중 오류가 발생했습니다.');
        }
      } else {
        setError('카카오 계정으로 로그인한 사용자가 아닙니다.');
      }
      
      // Next-Auth 로그아웃 처리 - 항상 홈으로 리다이렉트
      setTimeout(() => {
        signOut({ 
          redirect: true, 
          callbackUrl: '/'
        });
      }, 500);
      
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error);
      setError('로그아웃 처리 중 오류가 발생했습니다.');
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          {isProcessing ? (
            <>
              <Loader2 className="h-12 w-12 text-yellow-500 animate-spin mb-4" />
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">카카오 로그아웃 중</h1>
              <p className="text-center text-gray-600">
                카카오 계정에서 로그아웃하고 있습니다. 잠시만 기다려주세요...
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">로그아웃 오류</h1>
              <p className="text-center text-red-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  signOut({ 
                    redirect: true, 
                    callbackUrl: '/'
                  });
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                다시 로그아웃 시도
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 