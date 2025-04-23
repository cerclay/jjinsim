import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

// 오픈그래프 테스트 페이지 메타데이터
export const metadata: Metadata = createMetadata({
  title: '오픈그래프 메타태그 테스트',
  description: '찐심 앱에서 사용할 오픈그래프 메타태그를 테스트하고 생성합니다.',
  keywords: ['오픈그래프', 'OG 이미지', '메타태그', 'SNS 공유', '미리보기'],
  image: 'https://www.mysimli.com/api/og?title=오픈그래프%20메타태그%20테스트&description=찐심%20앱에서%20사용할%20오픈그래프%20설정을%20테스트합니다&type=default',
  url: 'https://www.mysimli.com/og-test',
});

export default function OgTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 