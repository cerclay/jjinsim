import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '나랑 찰떡인 반려동물은? | 찐심 심리테스트',
  description: '당신의 성격과 일상 습관을 바탕으로 운명처럼 맞는 동물 친구를 찾아드립니다! 12개의 질문으로 당신과 가장 잘 맞는 반려동물을 알아보세요.',
  keywords: ['반려동물 궁합', '동물 성격 테스트', '반려동물 추천', '동물 궁합 테스트', '성격 기반 반려동물', '반려동물 성향', '동물 테스트'],
  authors: [{ name: '찐심 테스트' }],
  creator: '찐심 테스트',
  publisher: '찐심 테스트',
  openGraph: {
    type: 'website',
    url: 'https://jjinsim.com/tests/pet-match',
    title: '나랑 찰떡인 반려동물은? | 찐심 심리테스트',
    description: '당신의 성격과 일상 습관을 바탕으로 운명처럼 맞는 동물 친구를 찾아드립니다! 12개의 질문으로 당신과 가장 잘 맞는 반려동물을 알아보세요.',
    siteName: '찐심 심리테스트',
    images: [
      {
        url: 'https://blogger.googleusercontent.com/img/a/AVvXsEg0j8Ns1GMihqct6xNAHgzooZ7aWqWnTPGUL0ZyHCeN8Hl3zRO2eLM3XrD0HZFeRnVG4HF1t7hB6zdqS_3Q_FGJw3zfXgfuIdZnlt1CSwicip9l-OfypNyR-l0_-GvFhCIFpi6vCqm4cBFrpUqhsUaOIbTI9RGCNG756ig-Dg2IqGfN2Tz6bxfUtfWjn9s',
        width: 1200,
        height: 630,
        alt: '나랑 찰떡인 반려동물은?',
      },
    ],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '나랑 찰떡인 반려동물은? | 찐심 심리테스트',
    description: '당신의 성격과 일상 습관을 바탕으로 운명처럼 맞는 동물 친구를 찾아드립니다! 12개의 질문으로 당신과 가장 잘 맞는 반려동물을 알아보세요.',
    images: ['https://blogger.googleusercontent.com/img/a/AVvXsEg0j8Ns1GMihqct6xNAHgzooZ7aWqWnTPGUL0ZyHCeN8Hl3zRO2eLM3XrD0HZFeRnVG4HF1t7hB6zdqS_3Q_FGJw3zfXgfuIdZnlt1CSwicip9l-OfypNyR-l0_-GvFhCIFpi6vCqm4cBFrpUqhsUaOIbTI9RGCNG756ig-Dg2IqGfN2Tz6bxfUtfWjn9s'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: 'https://jjinsim.com/tests/pet-match',
    languages: {
      'ko-KR': 'https://jjinsim.com/tests/pet-match',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}; 