import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// 보호된 경로 설정
const protectedPaths = [
  '/profile',
  '/my-results',
];

// 인증 예외 경로 설정
const authExceptionPaths = [
  '/auth/signin',
  '/auth/login-idpw',
  '/auth/register',
  '/auth/error',
  '/api/auth',
  '/home',
  '/',
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('미들웨어 처리 경로:', path);
  
  // API 경로와 정적 파일 경로는 처리하지 않음
  if (
    path.startsWith('/api/') || 
    path.startsWith('/_next/') || 
    path.startsWith('/static/') ||
    path.includes('.') // 파일 확장자가 있는 경로 (이미지, CSS 등)
  ) {
    return NextResponse.next();
  }
  
  // 인증 예외 경로 확인
  const isAuthException = authExceptionPaths.some(exceptionPath => 
    path === exceptionPath || path.startsWith(`${exceptionPath}/`)
  );
  
  if (isAuthException) {
    console.log('인증 예외 경로:', path);
    return NextResponse.next();
  }
  
  // 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path === protectedPath || path.startsWith(`${protectedPath}/`)
  );
  
  if (isProtectedPath) {
    console.log('보호된 경로 접근:', path);
    try {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      
      console.log('인증 토큰 확인:', !!token);
      
      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      if (!token) {
        const url = new URL('/auth/signin', request.url);
        url.searchParams.set('callbackUrl', encodeURI(request.url));
        console.log('인증되지 않음, 리다이렉트:', url.toString());
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('토큰 확인 중 오류:', error);
      const url = new URL('/auth/error', request.url);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// 미들웨어 설정은 여기에 직접 포함
export const config = {
  matcher: [
    '/profile/:path*',
    '/my-results/:path*',
  ],
}; 