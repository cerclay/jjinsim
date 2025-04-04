import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관리자 로그인',
  description: '테스트 카드 관리 시스템 관리자 로그인 페이지입니다.',
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 