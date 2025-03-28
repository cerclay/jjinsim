/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mysimli.com/',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://mysimli.com/server-sitemap.xml',
    ],
  },
  // 사이트맵 생성 빈도 및 우선 순위 설정
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  // 제외할 경로
  exclude: [
    '/api/*', 
    '/404', 
    '/500', 
    '/auth/*',
    '/_*',
  ],
  // 다국어 지원 (추후 확장 가능성)
  alternateRefs: [
    {
      href: 'https://mysimli.com',
      hreflang: 'ko',
    },
  ],
  // 출력 디렉토리
  outDir: './public',
};
