import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_KR, Roboto } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { AuthProvider } from '@/components/auth/auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: '찐심(JJinSim) - 당신의 내면을 비추는 심리테스트',
  description: '다양한 카테고리의 심리 테스트로 자신의 성격, 연애 스타일, 심리 상태를 탐색해보세요.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '찐심(JJinSim)',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansKr.variable} ${roboto.variable} antialiased min-h-screen flex flex-col overscroll-none`}
      >
        <Providers>
          <AuthProvider>
            <Header />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
