'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

interface SessionContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
}

const SessionContext = createContext<SessionContextType>({
  isLoading: true,
  isAuthenticated: false,
  user: null,
});

export function useAppSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useAppSession must be used within a SessionProvider');
  }
  return context;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // 로그인/로그아웃 페이지에서는 로딩 상태를 빠르게 해제
    if (pathname.includes('/auth/signin') || pathname.includes('/auth/login')) {
      setIsLoading(false);
      return;
    }

    // 세션 상태가 확정되면 로딩 상태 해제
    if (session.status !== 'loading') {
      setIsLoading(false);
    }
  }, [session.status, pathname]);

  const value = {
    isLoading: isLoading,
    isAuthenticated: session.status === 'authenticated',
    user: session.data?.user || null,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
} 