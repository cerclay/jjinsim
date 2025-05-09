import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mysimli.com';
  
  // 테스트 페이지 목록 (실제 프로젝트에서는 DB나 파일에서 동적으로 가져오는 것이 좋습니다)
  const tests = [
    'dog-compatibility', 
    'pet-match', 
    'iq-test', 
    'mbti', 
    'color-blindness',
    'memory-test', 
    'life-genre', 
    'travel-match', 
    'personal-color',
    'polsok-character', 
    'attachment-style', 
    't-power', 
    'past-life-character',
    'marriage-type', 
    'stress-check', 
    'tarot-consultation',
    'social-character', 
    'multiple-personality', 
    'healing-moment',
    'flirting-style', 
    'boomer-test', 
    'adhd-test'
  ];

  // 기본 페이지 목록
  const basePages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/tests`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/dementia-test`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/dementia-test/videos`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ];

  // 테스트 페이지 목록 생성
  const testPages = tests.map(testId => ({
    url: `${baseUrl}/tests/${testId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...basePages, ...testPages];
} 