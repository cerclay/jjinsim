/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // 타입스크립트 오류가 있어도 빌드를 허용합니다
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint 경고가 있어도 빌드를 허용합니다
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: '**.giphy.com'
      },
      {
        protocol: 'https',
        hostname: '**.notion.site'
      },
      {
        protocol: 'https',
        hostname: '**.s3.us-west-2.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net'
      },
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net'
      },
      {
        protocol: 'https',
        hostname: 'www.mysimli.com'
      },
      {
        protocol: 'https',
        hostname: 'mysimli.com'
      }
    ],
    domains: [
      'blogger.googleusercontent.com',
      'images.unsplash.com',
      'picsum.photos',
      'img.youtube.com',
      'k.kakaocdn.net',
      'www.mysimli.com',
      'mysimli.com'
    ],
  },
  env: {
    NEXT_PUBLIC_KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXTAUTH_URL
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
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' *.kakao.com *.kakao.co.kr;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: blob: https://*.googleusercontent.com https://k.kakaocdn.net https://*.kakao.com https://*.kakao.co.kr;
              font-src 'self' https://fonts.gstatic.com;
              frame-src 'self' https://*.kakao.com https://*.kakao.co.kr;
              connect-src 'self' https://*.kakao.com https://*.kakao.co.kr https://kauth.kakao.com;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ];
  },
};

// Sentry 설정 제거
module.exports = nextConfig;
