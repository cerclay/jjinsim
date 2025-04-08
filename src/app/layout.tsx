import AdSense from '@/third-parties/AdSense';
import { ChannelIO } from '@/third-parties/Channelio';
import Clarity from '@/third-parties/Clarity';
import { GoogleAnalytics } from '@next/third-parties/google'
import { GA_MEASUREMENT_ID } from './gtag';
import type { Metadata } from 'next';
import { Noto_Sans_KR, Roboto, Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { AuthProvider } from '@/components/auth/auth-provider';
import { Caveat } from 'next/font/google';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ui/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
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
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon.png' }
    ],
    shortcut: [
      { url: '/favicon.ico' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ko" className="light">
      <ChannelIO />
      <head>
        <meta name="naver-site-verification" content="68df3cca1368ab0533c08b01ae13d42b63bfc12a" />
        <link 
          rel="icon" 
          href="/favicon.ico" 
          type="image/x-icon"
        />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon.png"
        />
        {/* 카카오톡 공유 SDK */}
        <script 
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
          async
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', () => {
                if (window.Kakao) {
                  // 카카오 SDK 초기화
                  if (!window.Kakao.isInitialized()) {
                    window.Kakao.init('PASTE_YOUR_KAKAO_APP_KEY_HERE');
                    console.log('Kakao SDK initialized');
                  }
                }
              });
            `
          }}
        />
        {/* IQ 테스트 카드 초기화 스크립트 */}
        <script 
          dangerouslySetInnerHTML={{ 
            __html: `
              (async () => {
                try {
                  // 애플리케이션이 로드된 후 실행
                  window.addEventListener('load', async () => {
                    try {
                      // 페이지 로드 후 바로 API 호출
                      setTimeout(async () => {
                        try {
                          console.log('IQ 테스트 카드 초기화 API 호출 중...');
                          
                          try {
                            const response = await fetch('/api/init-test-card', {
                              method: 'GET',
                              headers: {
                                'Cache-Control': 'no-cache',
                                'Pragma': 'no-cache'
                              }
                            });
                            
                            console.log('API 응답 상태:', response.status);
                            
                            if (response.ok) {
                              const result = await response.json();
                              console.log('IQ 테스트 카드 초기화 결과:', result);
                            } else {
                              console.error('IQ 테스트 카드 초기화 API 오류 코드:', response.status);
                              
                              try {
                                // 오류 응답의 내용 확인 시도
                                const errorData = await response.text();
                                console.error('API 오류 상세 내용:', errorData);
                              } catch (textError) {
                                console.error('API 오류 내용을 읽을 수 없음:', textError);
                              }
                              
                              // API 호출 실패 시 로컬 폴백 동작 실행
                              console.log('IQ 테스트 데이터를 클라이언트 측에서 초기화합니다...');
                              
                              // 클라이언트에서 Supabase 객체를 사용할 수 있는지 확인
                              if (window.supabase && typeof window.supabase.from === 'function') {
                                await addIQTestCardLocally();
                              } else {
                                console.log('Supabase 클라이언트를 사용할 수 없어 폴백 실행을 건너뜁니다.');
                              }
                            }
                          } catch (fetchError) {
                            console.error('IQ 테스트 카드 초기화 API 통신 중 오류:', fetchError);
                            
                            // 네트워크 오류 등의 경우 로컬 폴백 실행
                            console.log('IQ 테스트 데이터를 클라이언트 측에서 초기화합니다...');
                            if (window.supabase && typeof window.supabase.from === 'function') {
                              await addIQTestCardLocally();
                            }
                          }
                        } catch (e) {
                          console.error('IQ 테스트 카드 초기화 전체 과정 중 오류:', e);
                        }
                      }, 2000); // 약간의 지연 후 호출
                    } catch (e) {
                      console.error('IQ 테스트 카드 초기화 호출 중 오류:', e);
                    }
                  });
                  
                  // 클라이언트 측에서 IQ 테스트 카드를 추가하는 함수
                  async function addIQTestCardLocally() {
                    try {
                      // 이미 존재하는지 확인
                      const { data: existingData, error: checkError } = await window.supabase
                        .from('test_card_stats')
                        .select('id')
                        .eq('id', 'iq-test')
                        .maybeSingle();
                        
                      if (checkError) {
                        console.error('클라이언트: IQ 테스트 데이터 확인 중 오류:', checkError);
                        return;
                      }
                      
                      if (!existingData) {
                        console.log('클라이언트: 새로운 IQ 테스트 카드 데이터를 생성합니다.');
                        const { error: insertError } = await window.supabase
                          .from('test_card_stats')
                          .insert({
                            id: 'iq-test',
                            title: '나의 진짜 IQ테스트 - 유머버전',
                            description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!',
                            thumbnail_url: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                            participation_count: 8752,
                            like_count: 423,
                            is_active: true,
                            category: 'iq',
                            duration: '3분'
                          });
                          
                        if (insertError) {
                          console.error('클라이언트: IQ 테스트 데이터 추가 중 오류:', insertError);
                        } else {
                          console.log('클라이언트: IQ 테스트 카드가 성공적으로 추가되었습니다.');
                        }
                      } else {
                        console.log('클라이언트: IQ 테스트 카드가 이미 존재합니다.');
                      }
                    } catch (e) {
                      console.error('클라이언트: IQ 테스트 카드 처리 중 오류:', e);
                    }
                  }
                } catch (e) {
                  console.error('IQ 테스트 카드 스크립트 오류:', e);
                }
              })();
            `
          }}
        />
          <AdSense />
  </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className,
        notoSansKr.variable,
        roboto.variable,
        caveat.variable
      )}>
        <Toaster position="top-center" />
        <Clarity />
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Providers>
            <AuthProvider>
              <Header />
              {/* 언어 전환 버튼 */}
              <div className="fixed top-4 right-4 z-[9999]">
                <LanguageSwitcher />
              </div>
              <main className="flex-grow flex flex-col bg-white">
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
