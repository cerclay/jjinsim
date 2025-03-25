import "server-only";

import { createServerClient } from "@supabase/ssr";

// App Router와 Pages Router 모두에서 사용 가능한 클라이언트 생성
export async function createClient(cookieStore?: any) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: cookieStore
        ? {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                );
              } catch {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
          }
        : {
            getAll() {
              return [];
            },
            setAll() {},
          },
    }
  );
}

// Pages Router 및 API Routes에서 사용하는 클라이언트 생성
export function createServerOnlyClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    }
  );
}

// 기존 함수 이름 유지 (하위 호환성)
export async function createPureClient() {
  return createServerOnlyClient();
}
