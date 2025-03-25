'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt="프로필 이미지" 
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-primary" />
              )}
            </div>

            <h1 className="text-2xl font-bold mb-1">
              {session?.user?.name || '사용자'}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              {session?.user?.email || '이메일 정보 없음'}
            </p>

            <div className="w-full border-t border-gray-200 my-4"></div>

            <div className="w-full space-y-3">
              <Link
                href="/my-results"
                className="block w-full py-2.5 px-4 bg-white border border-gray-300 rounded-md text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                내 테스트 결과
              </Link>

              <button
                onClick={handleSignOut}
                disabled={loading}
                className="flex items-center justify-center w-full py-2.5 px-4 bg-red-50 border border-red-200 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                로그아웃
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">계정 정보</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">가입 유형</p>
              <p className="font-medium">
                {session?.user?.role === 'admin' ? '관리자' : '일반 사용자'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="font-medium">{session?.user?.id || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 