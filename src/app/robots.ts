import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/admin-login/',
        '/api/',
      ],
    },
    // 구글 애드센스 크롤러를 명시적으로 허용
    sitemap: 'https://www.mysimli.com/sitemap.xml',
  };
} 