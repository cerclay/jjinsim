import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

// MBTI 페이지 메타데이터
export const metadata: Metadata = createMetadata({
  title: 'MBTI 심리테스트',
  description: '찐심 MBTI 테스트로 당신의 진짜 성격 유형을 알아보세요. 16가지 성격 유형 중 당신은 어떤 유형인지 무료로 테스트해보세요.',
  keywords: ['MBTI', '성격유형테스트', '무료MBTI', '성격테스트', 'MBTI검사', 'ENFP', 'INFJ', 'ENTP', 'INTJ'],
  image: 'https://www.mysimli.com/images/mbti-og-image.png', // 절대 경로로 변경
  url: 'https://www.mysimli.com/mbti',
});

export default function MbtiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 