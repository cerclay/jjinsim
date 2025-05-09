import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// 보호된 경로 설정
const protectedPaths = [
  '/profile',
  '/my-results',
];

// 관리자 로그인 경로
const ADMIN_LOGIN_PATH = '/admin/login';

// 프로덕션 환경에서 리다이렉션할 경로
const productionRedirectPaths = [
  '/profile',
];

export async function middleware(req: NextRequest) {
  try {
    // 현재 경로 확인
    const { pathname } = req.nextUrl;
    
    // API 경로는 미들웨어 체크에서 제외
    if (pathname.startsWith('/api/')) {
      return NextResponse.next();
    }
    
    // Content Security Policy 헤더 설정
    let response = NextResponse.next();
    
    // CSP 헤더 설정 - 개발 환경에서는 좀 더 유연하게, 프로덕션에서는 더 엄격하게 설정 가능
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.kakao.com *.kakaocdn.net *.kakao.co.kr *.google.com *.googleusercontent.com *.googlesyndication.com *.googleapis.com *.gstatic.com *.googletagmanager.com *.google-analytics.com *.doubleclick.net pagead2.googlesyndication.com tpc.googlesyndication.com www.googletagservices.com *.g.doubleclick.net partner.googleadservices.com adservice.google.com",
      "style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com fonts.googleapis.com",
      "img-src 'self' data: blob: https: *.googleusercontent.com *.mysimli.com *.blogger.googleusercontent.com picsum.photos *.google.com *.google.co.kr *.doubleclick.net *.g.doubleclick.net *.gstatic.com *.googlesyndication.com pagead2.googlesyndication.com",
      "font-src 'self' data: https: *.googleapis.com *.gstatic.com *.supabase.co fonts.gstatic.com fonts.googleapis.com",
      "connect-src 'self' *.kakao.com *.kakao.co.kr *.google-analytics.com *.googlesyndication.com *.doubleclick.net *.googleapis.com *.gstatic.com *.supabase.co *.adtrafficquality.google *.googletagmanager.com *.g.doubleclick.net pagead2.googlesyndication.com adservice.google.com",
      "frame-src 'self' *.kakao.com *.kakao.co.kr *.youtube.com *.youtu.be *.google.com *.googlesyndication.com *.doubleclick.net tpc.googlesyndication.com googleads.g.doubleclick.net",
      "object-src 'none'",
      "base-uri 'self'",
      "media-src 'self' *.googlesyndication.com *.doubleclick.net",
      "worker-src 'self' blob: *.googlesyndication.com"
    ].join("; ");
    
    // 개발 환경일 경우 CSP를 더 관대하게 설정
    if (process.env.NODE_ENV === 'development') {
      response.headers.set('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; font-src * data:; connect-src *;");
    } else {
      response.headers.set('Content-Security-Policy', csp);
    }
    
    // 정적 자원은 체크에서 제외
    if (pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|json|txt|woff|woff2|ttf|eot)$/)) {
      return response;
    }
    
    // 프로덕션 환경에서 특정 경로 리다이렉션 처리
    if (process.env.NODE_ENV === 'production' && productionRedirectPaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    // 테스트 페이지 리디렉션 처리 (인기 테스트와 신규 테스트를 모든 테스트로 통합)
    if (pathname === '/tests/popular' || pathname === '/tests/new') {
      return NextResponse.redirect(new URL('/tests', req.url));
    }
    
    // 관리자 페이지 접근 체크 (로그인 페이지 제외)
    if (pathname.startsWith('/admin') && !pathname.startsWith(ADMIN_LOGIN_PATH)) {
      try {
        // 쿠키에서 관리자 로그인 정보 가져오기
        const adminUserCookie = req.cookies.get('adminUser');
        
        if (!adminUserCookie) {
          console.log('[Middleware] 관리자 쿠키 없음, 로그인으로 리다이렉트');
          return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, req.url));
        }
        
        try {
          // 관리자 권한 확인
          const decodedCookie = decodeURIComponent(adminUserCookie.value);
          const adminUser = JSON.parse(decodedCookie);
          
          if (!adminUser || adminUser.role !== 'admin') {
            console.log('[Middleware] 관리자 권한 없음, 로그인으로 리다이렉트');
            return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, req.url));
          }
          
          // 관리자 인증 성공
          return response;
        } catch (parseError) {
          console.error('[Middleware] 관리자 쿠키 파싱 오류:', parseError);
          return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, req.url));
        }
      } catch (error) {
        console.error('[Middleware] 관리자 권한 확인 중 오류:', error);
        return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, req.url));
      }
    }

    // 일반 사용자 인증이 필요한 경로 체크
    if (!pathname.startsWith('/admin') && protectedPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))) {
      try {
        // Next-Auth 토큰 확인
        const token = await getToken({ req });
        
        if (!token) {
          console.log(`[Middleware] 인증 필요: ${pathname} 페이지 접근 시도, 로그인으로 리다이렉트`);
          const redirectUrl = new URL('/auth/signin', req.url);
          redirectUrl.searchParams.set('callbackUrl', pathname);
          return NextResponse.redirect(redirectUrl);
        }
        
        // 인증된 사용자, 정상 접근 허용
        console.log(`[Middleware] 인증된 사용자: ${pathname} 접근 허용`);
        return response;
      } catch (authError) {
        console.error('[Middleware] 인증 확인 중 오류:', authError);
        return NextResponse.redirect(new URL('/auth/error', req.url));
      }
    }
    
    return response;
  } catch (globalError) {
    console.error('[Middleware] 전역 오류 발생:', globalError);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    '/',
    '/:path*', // 모든 경로에 CSP 적용
    '/admin/:path*', 
    '/profile/:path*', 
    '/my-results/:path*',
    '/tests/popular',
    '/tests/new',
    '/api/:path*',
  ],
}; 