import "server-only";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// 서버 컴포넌트용 클라이언트
export async function createServerClient() {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
}

// 서버 전용 클라이언트 (쿠키 없이 Service Role 키 사용)
export function createServerOnlyClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL 또는 서비스 키가 설정되지 않았습니다.');
  }
  
  return createSupabaseClient(supabaseUrl, supabaseKey);
}

// compatibility
export { createServerClient as createClient }; 