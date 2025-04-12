import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '심리 테스트 모음 | 찐심 심리테스트',
  description: '찐심에서 제공하는 다양한 카테고리의 심리테스트를 경험해보세요. MBTI, 연애, 성격, IQ, 직업 적성 등 다양한 무료 테스트를 즐길 수 있습니다!',
  keywords: ['심리테스트 모음', '무료 심리테스트', 'MBTI 테스트', '성격 테스트', '연애 테스트', '적성 테스트', '취향 테스트', '찐심 테스트'],
  authors: [{ name: '찐심 테스트' }],
  creator: '찐심 테스트',
  publisher: '찐심 테스트',
  openGraph: {
    type: 'website',
    url: 'https://jjinsim.com/tests',
    title: '심리 테스트 모음 | 찐심 심리테스트',
    description: '찐심에서 제공하는 다양한 카테고리의 심리테스트를 경험해보세요. MBTI, 연애, 성격, IQ, 직업 적성 등 다양한 무료 테스트를 즐길 수 있습니다!',
    siteName: '찐심 심리테스트',
    images: [
      {
        url: '/images/tests-og-image.png', // 테스트 목록용 이미지 경로 설정
        width: 1200,
        height: 630,
        alt: '찐심 심리테스트 모음',
      },
    ],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '심리 테스트 모음 | 찐심 심리테스트',
    description: '찐심에서 제공하는 다양한 카테고리의 심리테스트를 경험해보세요. MBTI, 연애, 성격, IQ, 직업 적성 등 다양한 무료 테스트를 즐길 수 있습니다!',
    images: ['/images/tests-twitter-image.png'], // 테스트 목록용 트위터 카드 이미지 경로 설정
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
    canonical: 'https://jjinsim.com/tests',
    languages: {
      'ko-KR': 'https://jjinsim.com/tests',
      'en-US': 'https://jjinsim.com/en/tests',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}; 