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
    domains: [
      'blogger.googleusercontent.com',
      'images.unsplash.com',
      'picsum.photos',
      'media.tenor.com',
      'media1.giphy.com',
      'media.giphy.com',
      'media0.giphy.com',
      'media2.giphy.com', 
      'media3.giphy.com',
      'media4.giphy.com',
      'picturesque-ox-876.notion.site',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'k.kakaocdn.net',
      'blogger.googleusercontent.com'
    ],
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

module.exports = nextConfig; 

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "jjinsim",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
