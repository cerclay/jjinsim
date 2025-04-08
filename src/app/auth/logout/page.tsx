'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // 로그아웃 처리 후 홈으로 리다이렉트
    const handleLogout = async () => {
      await signOut({ callbackUrl: '/' });
    };

    handleLogout();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>로그아웃 중입니다...</p>
    </div>
  );
} 