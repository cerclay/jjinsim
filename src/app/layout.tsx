import { Metadata, Viewport } from 'next';
import AdSense from '@/third-parties/AdSense';
import { GoogleAnalytics } from '@next/third-parties/google'
import { GA_MEASUREMENT_ID } from './gtag';
import { Noto_Sans_KR, Roboto, Inter } from 'next/font/google';
import { Caveat } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import { metadata as baseMetadata, viewport } from './metadata';
import { ClientLayout } from '@/components/layout/client-layout';

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

const gmarketSans = localFont({
  src: [
    {
      path: '../fonts/GmarketSansOTF/GmarketSansLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/GmarketSansOTF/GmarketSansMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/GmarketSansOTF/GmarketSansBold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gmarket-sans',
  display: 'swap',
});

// 메타데이터와 뷰포트 내보내기
export const metadata: Metadata = baseMetadata;
export const viewportExport: Viewport = viewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ko" className="light">
      <head>
        <meta name="naver-site-verification" content="68df3cca1368ab0533c08b01ae13d42b63bfc12a" />
        {/* 캐시 제어 및 업데이트 강제 메타 태그 */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        {/* 오픈그래프 이미지 미리 로드 */}
        <link rel="preload" as="image" href="https://www.mysimli.com/images/og-share.png" />
        
        {/* 환경변수 설정 스크립트 - Next.js 15 호환성 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__ENV__ = {
                NEXT_PUBLIC_KAKAO_CLIENT_ID: '${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || ''}',
                NEXT_PUBLIC_NEXTAUTH_URL: '${process.env.NEXT_PUBLIC_NEXTAUTH_URL || ''}'
              };
            `
          }}
        />
        
        {/* 오픈그래프 메타태그 직접 추가 */}
        <meta property="og:title" content="찐심(JJinSim) - 당신의 내면을 비추는 심리테스트" />
        <meta property="og:description" content="찐심 테스트로 당신의 성격, 심리, 적성, MBTI 등을 무료로 알아보세요. 재미있고 정확한 심리테스트로 자신을 발견하는 시간!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mysimli.com" />
        <meta property="og:image" content="https://www.mysimli.com/images/og-share.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="찐심 심리테스트" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* 트위터 카드 메타태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="찐심(JJinSim) - 당신의 내면을 비추는 심리테스트" />
        <meta name="twitter:description" content="찐심 테스트로 당신의 성격, 심리, 적성, MBTI 등을 무료로 알아보세요. 재미있고 정확한 심리테스트로 자신을 발견하는 시간!" />
        <meta name="twitter:image" content="https://www.mysimli.com/images/og-share.png" />
        
        {/* canonical URL 설정 */}
        <link rel="canonical" href="https://www.mysimli.com" />
        
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
        
        {/* Paperlogy 폰트 추가 */}
        <link 
          rel="preload" 
          href="https://pcbdobocfcxhwpgfgydh.supabase.co/storage/v1/object/public/pont//Paperlogy-6SemiBold.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous" 
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
              document.addEventListener('DOMContentLoaded', () => {
                if (window.Kakao) {
                  // 카카오 SDK 초기화
                  if (!window.Kakao.isInitialized()) {
                    try {
                      // Next.js 15 이상에서는 process.env 직접 접근 불가
                      const kakaoAppKey = window.__ENV__?.NEXT_PUBLIC_KAKAO_CLIENT_ID || '';
                      if (kakaoAppKey) {
                        window.Kakao.init(kakaoAppKey);
                        console.log('Kakao SDK initialized');
                        
                        // 카카오톡 디폴트 공유 설정
                        if (document.getElementById('kakao-share-btn')) {
                          window.Kakao.Share.createDefaultButton({
                            container: '#kakao-share-btn',
                            objectType: 'feed',
                            content: {
                              title: '찐심(JJinSim) - 당신의 내면을 비추는 심리테스트',
                              description: '찐심 테스트로 당신의 성격, 심리, 적성, MBTI 등을 무료로 알아보세요.',
                              imageUrl: 'https://www.mysimli.com/images/og-share.png',
                              link: {
                                mobileWebUrl: 'https://www.mysimli.com',
                                webUrl: 'https://www.mysimli.com'
                              }
                            },
                            buttons: [
                              {
                                title: '웹으로 보기',
                                link: {
                                  mobileWebUrl: 'https://www.mysimli.com',
                                  webUrl: 'https://www.mysimli.com'
                                }
                              }
                            ]
                          });
                        }
                      } else {
                        console.warn('카카오 App Key가 설정되지 않았습니다.');
                      }
                    } catch (error) {
                      console.error('카카오 SDK 초기화 중 오류 발생:', error);
                    }
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
                  document.addEventListener('DOMContentLoaded', async () => {
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
      </head>
      <body
        className={cn(
          'min-h-screen font-sans antialiased font-paperlogy',
          inter.variable,
          notoSansKr.variable,
          roboto.variable,
          caveat.variable,
          gmarketSans.variable,
        )}
      >
        <ClientLayout>{children}</ClientLayout>
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        <AdSense />
      </body>
    </html>
  );
}
