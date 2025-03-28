"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 번역 타입 정의
interface Translations {
  // 공통
  welcome: string;
  hello: string;
  description: string;
  current_locale: string;
  change_language: string;
  
  // 네비게이션
  home: string;
  all_tests: string;
  categories: string;
  sign_in: string;
  sign_out: string;
  profile: string;
  search: string;
  open_menu: string;
  close_menu: string;
  
  // 메인 페이지
  hero_title: string;
  hero_subtitle: string;
  get_started: string;
  popular_tests_heading: string;
  new_tests_heading: string;
  
  // 푸터
  all_rights_reserved: string;
  about_us: string;
  privacy_policy: string;
  terms_of_service: string;
  contact_us: string;
}

// 한국어 번역
const koTranslations: Translations = {
  // 공통
  welcome: '환영합니다',
  hello: '안녕하세요',
  description: '다국어 지원 예제입니다',
  current_locale: '현재 언어',
  change_language: '언어 변경',
  
  // 네비게이션
  home: '홈',
  all_tests: '모든 테스트',
  categories: '카테고리',
  sign_in: '로그인',
  sign_out: '로그아웃',
  profile: '프로필',
  search: '검색',
  open_menu: '메뉴 열기',
  close_menu: '메뉴 닫기',
  
  // 메인 페이지
  hero_title: '당신의 내면을 비추는 심리테스트',
  hero_subtitle: '재미있고 통찰력 있는 테스트로 자신을 더 깊이 이해해보세요',
  get_started: '시작하기',
  popular_tests_heading: '인기 테스트',
  new_tests_heading: '새로운 테스트',
  
  // 푸터
  all_rights_reserved: '모든 권리 보유',
  about_us: '회사 소개',
  privacy_policy: '개인정보 처리방침',
  terms_of_service: '이용약관',
  contact_us: '문의하기'
};

// 영어 번역
const enTranslations: Translations = {
  // 공통
  welcome: 'Welcome',
  hello: 'Hello',
  description: 'This is a multilingual example',
  current_locale: 'Current language',
  change_language: 'Change language',
  
  // 네비게이션
  home: 'Home',
  all_tests: 'All Tests',
  categories: 'Categories',
  sign_in: 'Sign In',
  sign_out: 'Sign Out',
  profile: 'Profile',
  search: 'Search',
  open_menu: 'Open Menu',
  close_menu: 'Close Menu',
  
  // 메인 페이지
  hero_title: 'Psychological Tests That Reflect Your Inner Self',
  hero_subtitle: 'Understand yourself more deeply with fun and insightful tests',
  get_started: 'Get Started',
  popular_tests_heading: 'Popular Tests',
  new_tests_heading: 'New Tests',
  
  // 푸터
  all_rights_reserved: 'All rights reserved',
  about_us: 'About Us',
  privacy_policy: 'Privacy Policy',
  terms_of_service: 'Terms of Service',
  contact_us: 'Contact Us'
};

// 번역 사전 타입
type TranslationDictionary = typeof koTranslations;

// I18n 컨텍스트 타입
interface I18nContextType {
  t: TranslationDictionary;
  language: string;
  setLanguage: (lang: string) => void;
}

// 컨텍스트 생성
const I18nContext = createContext<I18nContextType>({
  t: koTranslations,
  language: 'ko',
  setLanguage: () => {}
});

// 로컬 스토리지 키 정의
const LANGUAGE_KEY = 'jjinsim-language';

// Provider 컴포넌트
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState('ko'); // 기본 언어는 한국어
  const [translations, setTranslations] = useState<TranslationDictionary>(koTranslations);
  
  // 초기 언어 로드
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return;
    
    const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (storedLanguage && (storedLanguage === 'ko' || storedLanguage === 'en')) {
      setLanguageState(storedLanguage);
    }
  }, []);
  
  // 언어 변경 시 번역 업데이트
  useEffect(() => {
    if (language === 'en') {
      setTranslations(enTranslations);
    } else {
      setTranslations(koTranslations);
    }
  }, [language]);
  
  // 언어 설정 함수
  const setLanguage = (lang: string) => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return;
    
    // 지원되는 언어만 설정
    if (lang === 'ko' || lang === 'en') {
      localStorage.setItem(LANGUAGE_KEY, lang);
      setLanguageState(lang);
    }
  };
  
  return (
    <I18nContext.Provider value={{ t: translations, language, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

// 훅 사용
export function useI18n() {
  return useContext(I18nContext);
} 