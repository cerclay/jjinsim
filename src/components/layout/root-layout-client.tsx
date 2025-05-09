'use client';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  // 카카오 SDK 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      const kakaoAppKey = window.__ENV__?.NEXT_PUBLIC_KAKAO_CLIENT_ID || '';
      if (kakaoAppKey) {
        window.Kakao.init(kakaoAppKey);
        console.log('Kakao SDK initialized');
      }
    }
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      {/* 언어 전환 버튼 */}
      <div className="fixed top-4 right-4 z-[9999]">
        <LanguageSwitcher />
      </div>
      <div className="bg-white min-h-screen w-full">
        {children}
      </div>
    </>
  );
} 