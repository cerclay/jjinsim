/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'picsum.photos',
      'blogger.googleusercontent.com',
      'k.kakaocdn.net',
      'developers.kakao.com',
    ],
  },
  serverExternalPackages: ['bcryptjs'],
  // 개발 서버 포트 3000으로 설정
  devIndicators: {
    buildActivity: true,
  },
  // 외부 URL 설정
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 