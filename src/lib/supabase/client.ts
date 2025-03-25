import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL과 익명 키가 설정되어 있지 않습니다. 환경 변수를 확인하세요.');
}

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// 브라우저에서 직접 사용할 수 있는 인스턴스도 제공
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
