'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export const ADSENSE_CLIENT_ID = 'ca-pub-6875778877992723';

export default function AdSense() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // 클라이언트에서만 로드 표시
    setIsMounted(true);
  }, []);
  
  // 개발 환경이거나 서버 사이드 렌더링 중이라면 아무것도 렌더링하지 않음
  if (!isMounted || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="lazyOnload"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      onError={(e) => {
        console.error('AdSense 스크립트 로드 오류:', e);
      }}
    />
  );
}

// AdSense 광고 컴포넌트
export function AdSenseAd({ slot, style = {} }: { slot: string; style?: React.CSSProperties }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // 안전하게 시간 간격을 두고 광고 초기화
      const timer = setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('애드센스 광고 초기화 오류:', e);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  if (!isMounted || process.env.NODE_ENV !== 'production') {
    return (
      <div 
        style={{ 
          border: '1px dashed #ccc',
          background: '#f8f8f8',
          padding: '10px',
          textAlign: 'center',
          margin: '10px 0',
          ...style 
        }}
      >
        <p>광고 영역 (슬롯: {slot})</p>
      </div>
    );
  }

  return (
    <div 
      suppressHydrationWarning 
      style={{ display: 'block', textAlign: 'center', ...style }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
