import { ChannelIO } from '@/third-parties/Channelio';
import Clarity from '@/third-parties/Clarity';
import { GoogleAnalytics } from '@next/third-parties/google'
import { GA_MEASUREMENT_ID } from './gtag';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_KR, Roboto } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
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
    icon: [
      {
        url: "https://blogger.googleusercontent.com/img/a/AVvXsEg8N_cgIZ0Km4m5cNqzV4L-FX4Xu43G3ASiXH3gj92Vf_aNcICvHx_M5gwl1V0paPO8wHdiTVz60GUsnfcxRcHLJ31Qpww4XogaQiZkbaVMp98L3lGw50o5DPVxXRPmR9MreFnFOVHGoL2HbsOfPiQg-lD1gl0VAKPuU_q0EG8Lu-rugoVMQ-57j-OS1lc",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://blogger.googleusercontent.com/img/a/AVvXsEg8N_cgIZ0Km4m5cNqzV4L-FX4Xu43G3ASiXH3gj92Vf_aNcICvHx_M5gwl1V0paPO8wHdiTVz60GUsnfcxRcHLJ31Qpww4XogaQiZkbaVMp98L3lGw50o5DPVxXRPmR9MreFnFOVHGoL2HbsOfPiQg-lD1gl0VAKPuU_q0EG8Lu-rugoVMQ-57j-OS1lc",
        sizes: "16x16",
        type: "image/png",
      }
    ],
    shortcut: [
      {
        url: "https://blogger.googleusercontent.com/img/a/AVvXsEg8N_cgIZ0Km4m5cNqzV4L-FX4Xu43G3ASiXH3gj92Vf_aNcICvHx_M5gwl1V0paPO8wHdiTVz60GUsnfcxRcHLJ31Qpww4XogaQiZkbaVMp98L3lGw50o5DPVxXRPmR9MreFnFOVHGoL2HbsOfPiQg-lD1gl0VAKPuU_q0EG8Lu-rugoVMQ-57j-OS1lc",
        sizes: "192x192",
      }
    ],
    apple: [
      {
        url: "https://blogger.googleusercontent.com/img/a/AVvXsEg8N_cgIZ0Km4m5cNqzV4L-FX4Xu43G3ASiXH3gj92Vf_aNcICvHx_M5gwl1V0paPO8wHdiTVz60GUsnfcxRcHLJ31Qpww4XogaQiZkbaVMp98L3lGw50o5DPVxXRPmR9MreFnFOVHGoL2HbsOfPiQg-lD1gl0VAKPuU_q0EG8Lu-rugoVMQ-57j-OS1lc",
        sizes: "180x180",
        type: "image/png",
      }
    ],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansKr.variable} ${roboto.variable} ${inter.className} ${caveat.variable} ${gaegu.variable} antialiased min-h-screen flex flex-col overscroll-none`}
      >
        <Clarity />
        {/* Google Analytics */}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        <Providers>
          <AuthProvider>
            <Header />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <Footer />
            {/* 언어 전환 버튼 */}
            <div className="language-switcher-container">
              <LanguageSwitcher />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
