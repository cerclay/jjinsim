import { ChannelIO } from '@/third-parties/Channelio';
import Clarity from '@/third-parties/Clarity';
import { GoogleAnalytics } from '@next/third-parties/google'
import { GA_MEASUREMENT_ID } from './gtag';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_KR, Roboto } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { AuthProvider } from '@/components/auth/auth-provider';
import { Inter, Caveat, Gaegu } from 'next/font/google';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

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

const inter = Inter({ subsets: ['latin'] });

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const gaegu = Gaegu({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-gaegu',
  display: 'swap',
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
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ko">
      <ChannelIO />
      <head>
        <link 
          rel="icon" 
          href="/favicon.png" 
          type="image/png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansKr.variable} ${roboto.variable} ${inter.className} ${caveat.variable} ${gaegu.variable} antialiased min-h-screen flex flex-col overscroll-none bg-gray-50`}
        suppressHydrationWarning
      >
        <Clarity />
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        <Providers>
          <div className="flex flex-col min-h-screen">
            <div 
              className="w-full flex justify-center sticky top-0 z-50"
              id="header-container"
            >
              <Header />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-0.5 w-full max-w-[500px] bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </div>
            <main className="flex-grow flex flex-col items-center">
              <div className="w-full max-w-[500px] mx-auto bg-white min-h-screen">
                {children}
              </div>
            </main>
            <div className="flex flex-col items-center">
              <div className="h-0.5 w-full max-w-[500px] bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </div>
            <div className="w-full">
              <Footer />
            </div>
            <div className="language-switcher-container fixed bottom-4 right-4 z-30">
              <LanguageSwitcher />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
