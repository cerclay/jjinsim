import { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { createServerOnlyClient } from "./supabase/server";

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
      authorization: {
        url: 'https://kauth.kakao.com/oauth/authorize',
        params: {
          prompt: 'login',
          response_type: 'code',
          auto_approve: true,
          logout_redirect_uri: `${process.env.NEXTAUTH_URL}/auth/logout`
        }
      },
      profile(profile) {
        // 카카오 프로필 로그
        console.log('카카오 프로필 데이터:', JSON.stringify(profile, null, 2));
        console.log('카카오 로그인 환경 변수:', {
          KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
          KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          NODE_ENV: process.env.NODE_ENV
        });
        
        // 카카오 ID로 항상 고유한 가상 이메일 생성
        const virtualEmail = `kakao_${profile.id}@example.com`;
        
        // 아주 기본적인 정보만 반환
        return {
          id: profile.id.toString(),
          name: profile.properties?.nickname || '카카오사용자',
          email: virtualEmail,
          image: profile.properties?.profile_image || null
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.id || !credentials?.password) {
          return null;
        }

        try {
          const supabase = createServerOnlyClient();
          
          // 사용자 이름으로 계정 검색
          const { data, error } = await supabase
            .from('account')
            .select('*')
            .eq('username', credentials.id)
            .eq('is_active', true)
            .single();
          
          if (error || !data) {
            console.error("사용자를 찾을 수 없음:", error);
            return null;
          }
          
          // Supabase Auth API를 사용하여 비밀번호 검증
          // 임시 이메일 형식 생성
          const tempEmail = `${credentials.id}@internal.auth`;
          
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: tempEmail,
            password: credentials.password,
          });
          
          if (signInError) {
            console.error("비밀번호가 일치하지 않음");
            return null;
          }
          
          return {
            id: data.id,
            name: data.username,
            email: data.email,
            role: data.role,
            image: data.profile_image_url
          };
        } catch (error) {
          console.error("인증 중 오류 발생:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // 카카오 로그인 처리
      if (account?.provider === 'kakao') {
        try {
          // 기본 정보만 사용
          const kakaoId = (profile as any).id.toString();
          const virtualEmail = `kakao_${kakaoId}@example.com`;
          
          const supabase = createServerOnlyClient();
          
          // 1. provider_id로 기존 계정 검색
          const { data: existingAccount, error: searchError } = await supabase
            .from('account')
            .select('*')
            .or(`provider_id.eq.${kakaoId},email.eq.${virtualEmail}`)
            .maybeSingle();
          
          // 기존 계정이 있는 경우
          if (existingAccount) {
            // 기본 업데이트만 수행
            await supabase
              .from('account')
              .update({
                provider: 'kakao',
                provider_id: kakaoId,
                access_token: account.access_token || null,
                refresh_token: account.refresh_token || null,
                last_login_at: new Date().toISOString(),
              })
              .eq('id', existingAccount.id);
            
            // 기존 계정 정보 설정
            user.id = existingAccount.id;
            user.name = existingAccount.username || '카카오사용자';
            user.email = virtualEmail;
            user.role = existingAccount.role;
            user.image = existingAccount.profile_image_url || (profile as any).properties?.profile_image;
          } else {
            // 새 계정 생성 (최소한의 정보만)
            const { data: newAccount, error: insertError } = await supabase
              .from('account')
              .insert([{
                username: `kakao_${kakaoId.substring(0, 8)}`,
                email: virtualEmail,
                role: 'user',
                is_active: true,
                provider: 'kakao',
                provider_id: kakaoId,
                access_token: account.access_token || null,
                refresh_token: account.refresh_token || null,
                last_login_at: new Date().toISOString(),
                profile_image_url: (profile as any).properties?.profile_image,
              }])
              .select()
              .single();
            
            if (newAccount) {
              user.id = newAccount.id;
              user.name = newAccount.username;
              user.email = newAccount.email;
              user.role = newAccount.role;
              user.image = newAccount.profile_image_url;
            } else if (insertError) {
              console.error("계정 생성 오류:", insertError);
            }
          }
          
          // 항상 성공 반환
          return true;
        } catch (error) {
          console.error("카카오 로그인 처리 중 오류:", error);
          // 오류가 발생해도 성공으로 처리
          return true;
        }
      }
      
      return true;
    },
    async jwt({ token, user, account }) {
      // 초기 로그인 시 사용자 정보를 토큰에 추가
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // 세션에 추가 정보 포함
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
        path: '/',
        secure: true,
        domain: process.env.NODE_ENV === 'development' ? '127.0.0.1' : undefined,
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
        path: '/',
        secure: true,
        domain: process.env.NODE_ENV === 'development' ? '127.0.0.1' : undefined,
      }
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
        path: '/',
        secure: true,
        domain: process.env.NODE_ENV === 'development' ? '127.0.0.1' : undefined,
      }
    },
  },
  logger: {
    error(code, metadata) {
      console.error(`[Auth] Error ${code}:`, metadata);
      // 환경 변수 디버깅
      console.error(`[Auth] 환경 변수 정보 - NEXTAUTH_URL: ${process.env.NEXTAUTH_URL}, NODE_ENV: ${process.env.NODE_ENV}, KAKAO_REDIRECT_URI: ${process.env.KAKAO_REDIRECT_URI}`);
    },
    warn(code) {
      console.warn(`[Auth] Warning ${code}`);
    },
    debug(code, metadata) {
      console.log(`[Auth] Debug ${code}:`, metadata);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

// 타입 확장
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
  
  interface User {
    id?: string;
    role?: string;
    image?: string;
  }
}
