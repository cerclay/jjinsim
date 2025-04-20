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

export async function middleware(req: NextRequest) {
  try {
    // 현재 경로 확인
    const { pathname } = req.nextUrl;
    
    // API 경로는 미들웨어 체크에서 제외
    if (pathname.startsWith('/api/')) {
      return NextResponse.next();
    }
    
    // 정적 자원은 체크에서 제외
    if (pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|json|txt|woff|woff2|ttf|eot)$/)) {
      return NextResponse.next();
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
          return NextResponse.next();
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
    if (!pathname.startsWith('/admin') && protectedPaths.some(path => pathname.startsWith(path))) {
      try {
        // Next-Auth 토큰 확인
        const token = await getToken({ req });
        
        if (!token) {
          const redirectUrl = new URL('/auth/signin', req.url);
          redirectUrl.searchParams.set('callbackUrl', pathname);
          return NextResponse.redirect(redirectUrl);
        }
      } catch (authError) {
        console.error('[Middleware] 인증 확인 중 오류:', authError);
        return NextResponse.redirect(new URL('/auth/error', req.url));
      }
    }
    
    return NextResponse.next();
  } catch (globalError) {
    console.error('[Middleware] 전역 오류 발생:', globalError);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    '/admin/:path*', 
    '/profile/:path*', 
    '/my-results/:path*',
    '/tests/popular',
    '/tests/new',
    '/api/:path*',
  ],
}; 