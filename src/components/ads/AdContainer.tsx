'use client';

import { useEffect, useRef, useState } from 'react';
import { ADSENSE_CLIENT_ID } from '@/third-parties/AdSense';

type AdContainerProps = {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
};

export default function AdContainer({
  slot,
  format = 'auto',
  style = {},
  className = '',
  responsive = true,
}: AdContainerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // 컴포넌트가 마운트되었고, 프로덕션 환경이며, 아직 초기화되지 않은 경우에만 실행
    if (!isMounted || process.env.NODE_ENV !== 'production' || isInitialized.current) {
      return;
    }

    try {
      // 안전하게 광고 초기화 (충분한 시간 간격을 두고)
      const timer = setTimeout(() => {
        try {
          if (typeof window === 'undefined') return;
          
          const adsbygoogle = (window as any).adsbygoogle || [];
          adsbygoogle.push({});
          
          isInitialized.current = true;
          console.log(`광고 슬롯 ${slot} 초기화 완료`);
        } catch (err) {
          console.error(`광고 슬롯 ${slot} 초기화 실패:`, err);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('광고 초기화 중 오류 발생:', error);
    }
  }, [slot, isMounted]);

  // 개발 환경이거나 아직 마운트되지 않은 경우 개발용 컨테이너 표시
  if (!isMounted || process.env.NODE_ENV !== 'production') {
    return (
      <div 
        className={`ad-container-dev ${className}`}
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
      ref={adRef}
      suppressHydrationWarning
      className={`ad-container ${className}`}
      style={{ 
        display: 'block', 
        textAlign: 'center', 
        overflow: 'hidden',
        ...style 
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
} 