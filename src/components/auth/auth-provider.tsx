"use client";

import { useSession, SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
}

// 세션 상태 자동 새로고침 컴포넌트
function SessionRefresher() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'nextauth.message' && event.newValue?.includes('session-updated')) {
        // 세션 변경 이벤트 감지 시 페이지 새로고침
        if (pathname !== '/auth/signin' && pathname !== '/auth/login-kakao') {
          window.location.reload();
        }
      }
    };

    // 스토리지 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [pathname]);

  // 세션 상태 로깅
  useEffect(() => {
    console.log("현재 세션 상태:", status, session);
  }, [session, status]);

  return null;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={true}>
      <SessionRefresher />
      {children}
    </SessionProvider>
  );
}
