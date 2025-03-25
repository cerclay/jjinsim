'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function ErrorContent() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');
  const error = searchParams.get('error');

  useEffect(() => {
    // 간단하게 모든 오류를 하나의 메시지로 통합
    setErrorMessage('로그인을 완료할 수 없습니다. 다시 시도해주세요.');
    
    // 오류 정보 로깅
    console.log('인증 오류 타입:', error);
  }, [error]);

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl font-semibold text-red-600 mb-2">로그인 오류</h1>
      <p className="text-gray-700 mb-4">{errorMessage}</p>
      
      <div className="mt-6 flex flex-col space-y-3">
        <Link 
          href="/auth/signin"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition duration-200"
        >
          로그인 페이지로 돌아가기
        </Link>
        
        <Link 
          href="/"
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-center hover:bg-gray-300 transition duration-200"
        >
          홈페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700">로딩 중...</p>
        </div>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  );
} 