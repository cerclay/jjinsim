'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 관리자 로그인 페이지로 바로 이동
    router.replace('/admin/login');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">관리자 로그인 페이지로 이동 중...</p>
    </div>
  );
} 