'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function KakaoLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/auth/dashboard';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 페이지 로드 시 자동으로 카카오 로그인 시도
  useEffect(() => {
    handleKakaoLogin();
  }, []);

  const handleKakaoLogin = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('카카오 로그인 시도... 콜백 URL:', callbackUrl);
      
      // NextAuth의 signIn 함수를 사용하여 카카오 로그인
      // redirect: true로 변경하여 NextAuth가 직접 리다이렉트 처리하도록 함
      await signIn('kakao', { 
        callbackUrl, 
        redirect: true 
      });
      
      // redirect: true를 사용하면 아래 코드는 실행되지 않음
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
      console.error('카카오 로그인 오류:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            카카오 로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            카카오 계정으로 로그인 중입니다...
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
            <button
              onClick={handleKakaoLogin}
              className="mt-2 rounded-md bg-yellow-400 py-2 px-3 text-sm font-semibold text-gray-800 hover:bg-yellow-300"
            >
              다시 시도하기
            </button>
          </div>
        )}
        
        {loading && !error && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        )}
      </div>
    </div>
  );
}
