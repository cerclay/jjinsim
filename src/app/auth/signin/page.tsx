'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';
  const [loading, setLoading] = useState({ credentials: false, kakao: false });
  const [error, setError] = useState<string | null>(null);

  const handleKakaoSignIn = async () => {
    setLoading(prev => ({ ...prev, kakao: true }));
    setError(null);
    try {
      console.log('카카오 로그인 시도... 콜백 URL:', callbackUrl);
      await signIn("kakao", { 
        callbackUrl, 
        redirect: true
      });
    } catch (err) {
      console.error("카카오 로그인 오류:", err);
      setError("로그인 처리 중 오류가 발생했습니다.");
      setLoading(prev => ({ ...prev, kakao: false }));
    }
  };

  return (
    <div className="w-full max-w-md space-y-5 sm:space-y-6 px-4 sm:px-0">
      <div className="text-center">
        <h2 className="mt-2 text-center text-xl sm:text-2xl font-extrabold text-gray-900 sm:text-3xl">
          로그인
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-gray-600">
          서비스 이용을 위해 로그인해주세요
        </p>
        {error && (
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-red-100 text-red-700 rounded-md text-xs sm:text-sm">
            {error}
          </div>
        )}
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {/* 소셜 로그인 버튼 */}
        <div>
          <button
            type="button"
            onClick={handleKakaoSignIn}
            disabled={loading.kakao}
            className="group relative w-full flex justify-center py-2 sm:py-2.5 px-3 sm:px-4 border border-transparent text-sm font-medium rounded-md bg-yellow-400 hover:bg-yellow-500 text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 disabled:bg-yellow-200 disabled:cursor-not-allowed transition-colors"
          >
            {loading.kakao ? (
              <span className="absolute left-0 inset-y-0 flex items-center pl-2 sm:pl-3">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : (
              <span className="absolute left-0 inset-y-0 flex items-center pl-2 sm:pl-3">
                <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path fillRule="evenodd" clipRule="evenodd" d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50 34.2C41 34.2 33.6 41.6 33.6 50.6C33.6 56.3 37.3 61.3 42.8 63.5L40.5 71.4C40.2 72.2 40.9 73 41.7 72.5L51.1 66.2C51.4 66.2 51.7 66.2 52 66.2C61 66.2 68.4 58.8 68.4 49.8C68.4 40.8 60.9 34.2 50 34.2Z" fill="black"/>
                </svg>
              </span>
            )}
            <span className="ml-6">{loading.kakao ? '카카오 로그인 중...' : '카카오 로그인'}</span>
          </button>
        </div>
        
        <div className="relative my-2 sm:my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">또는</span>
          </div>
        </div>
        
        {/* 이동 버튼 */}
        <div>
          <Link
            href="/auth/login-idpw"
            className="w-full flex justify-center py-2 sm:py-2.5 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            아이디/비밀번호로 로그인
          </Link>
        </div>
        
        <div>
          <Link
            href="/auth/register"
            className="w-full flex justify-center py-2 sm:py-2.5 px-3 sm:px-4 border border-indigo-500 rounded-md shadow-sm bg-indigo-50 text-sm font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            회원가입
          </Link>
        </div>
      </div>
      
      <div className="text-xs sm:text-sm text-center mt-3 sm:mt-4">
        <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center">
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="w-full max-w-md space-y-5 sm:space-y-6 px-4 sm:px-0">
          <div className="text-center">
            <h2 className="mt-2 text-center text-xl sm:text-2xl font-extrabold text-gray-900 sm:text-3xl">
              로그인
            </h2>
            <p className="mt-2 text-center text-xs sm:text-sm text-gray-600">
              로딩 중...
            </p>
          </div>
        </div>
      }>
        <SignInContent />
      </Suspense>
    </div>
  );
} 