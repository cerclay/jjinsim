import type { Metadata, Viewport } from 'next';

// 제목과 설명은 한글로 작성하는 것이 한국 SEO에 더 효과적입니다
export const baseMetadata: Metadata = {
  title: '찐심(JJinSim) - 당신의 내면을 비추는 심리테스트',
  description: '찐심 테스트로 당신의 성격, 심리, 적성, MBTI 등을 무료로 알아보세요. 재미있고 정확한 심리테스트로 자신을 발견하는 시간!',
  keywords: ['심리테스트', '성격테스트', '무료테스트', 'MBTI', '심리검사', '성격검사', '적성검사', '연애테스트', '찐심', 'jjinsim'],
  authors: [{ name: '찐심', url: 'https://jjinsim.com' }],
  creator: '찐심 테스트',
  publisher: '찐심 테스트',
  applicationName: '찐심',
  category: '심리테스트',
  openGraph: {
    type: 'website',
    url: 'https://jjinsim.com',
    title: '찐심(JJinSim) - 당신의 내면을 비추는 심리테스트',
    description: '찐심 테스트로 당신의 성격, 심리, 적성, MBTI 등을 무료로 알아보세요. 재미있고 정확한 심리테스트로 자신을 발견하는 시간!',
    siteName: '찐심 심리테스트',
    images: [
      {
        url: '/images/og-image.png', // OpenGraph 이미지 경로 설정
        width: 1200,
        height: 630,
        alt: '찐심 심리테스트',
      },
    ],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '찐심(JJinSim) - 당신의 내면을 비추는 심리테스트',
    description: '찐심 테스트로 당신의 성격, 심리, 적성, MBTI 등을 무료로 알아보세요. 재미있고 정확한 심리테스트로 자신을 발견하는 시간!',
    images: ['/images/twitter-image.png'], // 트위터 카드 이미지 경로 설정
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://jjinsim.com',
    languages: {
      'ko-KR': 'https://jjinsim.com',
      'en-US': 'https://jjinsim.com/en',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon.png' }
    ],
    shortcut: [
      { url: '/favicon.ico' }
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '찐심(JJinSim)',
  },
};

// 기본 메타데이터를 유지 (하위 호환성을 위해)
export const metadata = baseMetadata;

// 뷰포트 설정을 별도로 분리
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
}; 