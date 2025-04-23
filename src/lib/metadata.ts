import { Metadata } from 'next';
import { baseMetadata } from '@/app/metadata';

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
};

/**
 * 동적 메타데이터를 생성하는 함수
 * 
 * @param props 메타데이터 속성
 * @returns Metadata 객체
 */
export function createMetadata(props: MetadataProps): Metadata {
  const {
    title,
    description,
    keywords,
    image = 'https://www.mysimli.com/images/og-image.png',
    url = 'https://www.mysimli.com',
    type = 'website',
  } = props;
  
  const siteTitle = title 
    ? `${title} | 찐심(JJinSim)` 
    : baseMetadata.title as string;
  
  const siteDescription = description || baseMetadata.description as string;
  const siteKeywords = keywords || (baseMetadata.keywords as string[]);
  
  const metadata: Metadata = {
    ...baseMetadata,
    title: siteTitle,
    description: siteDescription,
    keywords: siteKeywords,
    openGraph: {
      type,
      url,
      title: siteTitle,
      description: siteDescription,
      siteName: '찐심 심리테스트',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || '찐심 심리테스트',
        },
      ],
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [image],
    },
  };
  
  return metadata;
} 