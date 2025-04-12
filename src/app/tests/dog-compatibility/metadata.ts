import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '나랑 잘 맞는 강아지는? | 찐심 심리테스트',
  description: '당신의 성격과 생활 패턴에 맞는 최고의 반려견을 찾아보세요. 몇 가지 질문에 답하면 당신과 찰떡궁합인 견종을 알려드립니다!',
  keywords: ['강아지 궁합 테스트', '반려견 성향 테스트', '나에게 맞는 강아지', '강아지 성격 테스트', '견종 추천', '강아지 심리테스트', '강아지 상성'],
  authors: [{ name: '찐심 테스트' }],
  creator: '찐심 테스트',
  publisher: '찐심 테스트',
  openGraph: {
    type: 'website',
    url: 'https://jjinsim.com/tests/dog-compatibility',
    title: '나랑 잘 맞는 강아지는? | 찐심 심리테스트',
    description: '당신의 성격과 생활 패턴에 맞는 최고의 반려견을 찾아보세요. 몇 가지 질문에 답하면 당신과 찰떡궁합인 견종을 알려드립니다!',
    siteName: '찐심 심리테스트',
    images: [
      {
        url: 'https://blogger.googleusercontent.com/img/a/AVvXsEhsht18O01e59gK9-0VT-R8DrBYYeIhmX8WAHsAZT1WlceTLF6nqWo6bzGMx3vtC9QZP0hOQ2jXmeSIM7FIZ44Fm1xxZXZFLV2S1UjWcm_ltxFH7SVqBDqv6w7Zck_5-xCg8jGU0GcyEhgJ9WWryfvypKQnnIj659iOtRIUvcYSRkWTEvWGHlX77FVjmLc',
        width: 1200,
        height: 630,
        alt: '나랑 잘 맞는 강아지는?',
      },
    ],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '나랑 잘 맞는 강아지는? | 찐심 심리테스트',
    description: '당신의 성격과 생활 패턴에 맞는 최고의 반려견을 찾아보세요. 몇 가지 질문에 답하면 당신과 찰떡궁합인 견종을 알려드립니다!',
    images: ['https://blogger.googleusercontent.com/img/a/AVvXsEhsht18O01e59gK9-0VT-R8DrBYYeIhmX8WAHsAZT1WlceTLF6nqWo6bzGMx3vtC9QZP0hOQ2jXmeSIM7FIZ44Fm1xxZXZFLV2S1UjWcm_ltxFH7SVqBDqv6w7Zck_5-xCg8jGU0GcyEhgJ9WWryfvypKQnnIj659iOtRIUvcYSRkWTEvWGHlX77FVjmLc'],
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
    canonical: 'https://jjinsim.com/tests/dog-compatibility',
    languages: {
      'ko-KR': 'https://jjinsim.com/tests/dog-compatibility',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}; 