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
        '/auth/'
      ],
    },
    sitemap: 'https://jjinsim.com/sitemap.xml',
  };
} 