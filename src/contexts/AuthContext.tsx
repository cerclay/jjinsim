"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

// AuthContext 인터페이스 정의
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

// 기본 컨텍스트 생성
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
  refreshSession: async () => {},
});

// AuthProvider 속성 인터페이스
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider 컴포넌트
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 세션 새로고침 함수
  const refreshSession = async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('세션 가져오기 오류:', error);
        return;
      }
      
      // 세션과 사용자 상태 업데이트
      setSession(data.session);
      setUser(data.session?.user || null);
    } catch (e) {
      console.error('인증 데이터 새로고침 중 오류:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수
  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (e) {
      console.error('로그아웃 중 오류:', e);
    }
  };

  // 컴포넌트 마운트 시 세션 확인
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return;
    
    const initAuth = async () => {
      try {
        await refreshSession();
        
        // 인증 상태 변경에 대한 리스너 설정
        const supabase = createClient();
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, currentSession) => {
            console.log('인증 상태 변경:', event);
            
            // 세션과 사용자 상태 업데이트
            setSession(currentSession);
            setUser(currentSession?.user || null);
          }
        );
        
        // 컴포넌트 언마운트 시 리스너 정리
        return () => {
          subscription.unsubscribe();
        };
      } catch (e) {
        console.error('인증 초기화 중 오류:', e);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // AuthContext 값 제공
  const value = {
    user,
    session,
    isLoading,
    signOut,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 인증 컨텍스트 사용을 위한 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
} 