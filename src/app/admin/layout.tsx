"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Sidebar } from "./components/sidebar";

// 안전한 로컬 스토리지 접근 유틸리티
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

// 쿠키 유틸리티
const getCookieValue = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split('; ');
  const cookieEntry = cookies.find(row => row.startsWith(`${name}=`));
  return cookieEntry ? cookieEntry.split('=')[1] : null;
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        console.log('관리자 권한 확인 중...');
        
        // 1. 서버 API로 쿠키 기반 인증 확인
        const response = await fetch('/api/admin/auth/check', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store'
        });
        
        const data = await response.json();
        
        if (data.isAdmin) {
          console.log('인증 성공:', data.user?.username || '관리자');
          setIsAdmin(true);
          setLoading(false);
          return;
        }
        
        // 2. 로컬 스토리지 확인 (쿠키 대안)
        if (typeof window !== 'undefined') {
          const adminUserJson = localStorage.getItem('adminUser');
          if (adminUserJson) {
            try {
              const adminUser = JSON.parse(adminUserJson);
              if (adminUser && adminUser.role === 'admin') {
                console.log('로컬 스토리지 인증 성공');
                
                // 서버에 인증 정보 설정
                await fetch('/api/admin/auth/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    isLocalStorageAuth: true,
                    adminUser
                  }),
                  credentials: 'include',
                });
                
                setIsAdmin(true);
                setLoading(false);
                return;
              }
            } catch (e) {
              console.error('로컬 스토리지 파싱 오류:', e);
            }
          }
        }
        
        // 인증 실패 - 로그인 페이지로 이동
        console.log('관리자 인증 실패, 로그인 페이지로 이동');
        router.push('/admin-login');
      } catch (error) {
        console.error('관리자 인증 확인 중 오류:', error);
        router.push('/admin-login');
      }
    };

    checkAdminAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Spinner size="xl" className="mb-6 text-rose-600" />
        <p className="text-xl font-medium text-gray-700 mb-2">권한 확인 중</p>
        <p className="text-gray-500">잠시만 기다려주세요...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // 로그인 페이지로 리다이렉트 중
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
} 