"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  BarChart3, 
  Layout, 
  FileSpreadsheet, 
  Users, 
  Settings, 
  LogOut,
  Library
} from "lucide-react";

// 메뉴 아이템 정의
const menuItems = [
  {
    title: "대시보드",
    path: "/admin",
    icon: <Layout className="h-5 w-5" />,
  },
  {
    title: "테스트 카드 관리",
    path: "/admin/tests",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "사용자 관리",
    path: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "통계",
    path: "/admin/statistics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "설정",
    path: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  
  const handleLogout = async () => {
    // 로컬 스토리지 및 쿠키 정리
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminUser');
    }
    
    // 서버에 로그아웃 요청
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    }
    
    // Next-Auth 로그아웃 (필요시)
    try {
      await signOut({ redirect: false });
    } catch (e) {
      // Next-Auth가 설정되지 않은 경우 무시
    }
    
    // 로그인 페이지로 이동
    window.location.href = '/admin-login';
  };

  return (
    <aside className="bg-white w-64 min-h-screen shadow-md">
      <div className="px-6 py-6 border-b">
        <div className="flex items-center gap-2">
          <Library className="h-6 w-6 text-rose-600" />
          <h1 className="text-xl font-bold text-gray-900">관리자 콘솔</h1>
        </div>
      </div>
      
      <nav className="mt-6 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md ${
                  pathname === item.path
                    ? "bg-rose-50 text-rose-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="px-4 mt-auto absolute bottom-0 w-full pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">로그아웃</span>
        </button>
      </div>
    </aside>
  );
} 