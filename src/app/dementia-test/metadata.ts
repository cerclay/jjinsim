import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3분 치매 간이 테스트 | 무료 온라인 치매 선별 검사',
  description: '3분만에 완료하는 무료 치매 간이 테스트입니다. 7가지 인지 영역을 평가하여 인지 건강 상태를 확인해보세요.',
  openGraph: {
    title: '3분 치매 간이 테스트 | 무료 온라인 치매 선별 검사',
    description: '3분만에 완료하는 무료 치매 간이 테스트입니다. 7가지 인지 영역을 평가하여 인지 건강 상태를 확인해보세요.',
    images: [
      {
        url: '/images/dementia-test/thumbnail.jpg',
        width: 1280,
        height: 720,
        alt: '치매 간이 테스트',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3분 치매 간이 테스트 | 무료 온라인 치매 선별 검사',
    description: '3분만에 완료하는 무료 치매 간이 테스트입니다. 7가지 인지 영역을 평가하여 인지 건강 상태를 확인해보세요.',
    images: ['/images/dementia-test/thumbnail.jpg'],
  }
}; 