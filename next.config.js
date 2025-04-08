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
        protocol: 'https',
        hostname: 'k.kakaocdn.net'
      }
    ]
  },
  env: {
    NEXT_PUBLIC_KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
  },
  serverExternalPackages: ['bcryptjs'],
  // 외부 URL 설정
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
  experimental: {
    serverActions: true,
  },
};

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  nextConfig,
  {
    org: "jjinsim",
    project: "javascript-nextjs",
    silent: true,
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    disableLogger: true,
    automaticVercelMonitors: true,
  }
);
