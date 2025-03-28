import { createBrowserClient } from "@supabase/ssr";

// 환경 변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 환경 변수 로깅
console.log("Supabase 환경 변수 확인:");
console.log("URL 존재 여부:", !!supabaseUrl);
console.log("Anon Key 존재 여부:", !!supabaseAnonKey);

// 안전한 클라이언트 생성 함수
export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase 환경 변수가 설정되지 않았습니다');
    return createEmptyClient();
  }
  
  try {
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Supabase 클라이언트 생성 오류:', error);
    return createEmptyClient();
  }
}

// 빈 클라이언트 생성 (오류 발생 시 사용)
function createEmptyClient() {
  console.warn('Supabase 연결 실패로 빈 클라이언트를 반환합니다. 기본 데이터가 표시됩니다.');
  return {
    from: () => ({
      select: () => ({ data: null, error: new Error('Supabase 연결 실패') }),
      order: () => ({ data: null, error: new Error('Supabase 연결 실패') }),
      limit: () => ({ data: null, error: new Error('Supabase 연결 실패') }),
      gt: () => ({ data: null, error: new Error('Supabase 연결 실패') }),
    }),
  } as any;
}

// 브라우저에서 사용할 기본 클라이언트 생성
let supabaseClient;

try {
  console.log('Supabase 전역 클라이언트 초기화 시도...');
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('환경 변수 누락으로 빈 클라이언트를 생성합니다');
    supabaseClient = createEmptyClient();
  } else {
    supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase 클라이언트 초기화 성공');
  }
} catch (error) {
  console.error('Supabase 클라이언트 초기화 오류:', error);
  supabaseClient = createEmptyClient();
}

export const supabase = supabaseClient;

// IQ 테스트 데이터를 test_card_stats 테이블에 추가하는 함수
export async function addIQTestCardToStats() {
  // Supabase가 제대로 초기화되었는지 확인
  if (!supabaseClient || typeof supabaseClient.from !== 'function') {
    console.error('Supabase 클라이언트가 초기화되지 않았습니다.');
    return { error: 'Supabase 클라이언트 오류' };
  }

  try {
    // 먼저 해당 ID의 레코드가 이미 존재하는지 확인
    const { data: existingData, error: checkError } = await supabaseClient
      .from('test_card_stats')
      .select('id')
      .eq('id', 'iq-test')
      .maybeSingle();

    if (checkError) {
      console.error('IQ 테스트 데이터 확인 중 오류:', checkError);
      return { error: checkError };
    }

    // 이미 존재하면 업데이트, 없으면 새로 생성
    if (existingData) {
      console.log('IQ 테스트 데이터가 이미 존재합니다. 업데이트합니다.');
      const { error: updateError } = await supabaseClient
        .from('test_card_stats')
        .update({
          title: '나의 진짜 IQ테스트 - 유머버전',
          description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!',
          thumbnail_url: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
          updated_at: new Date().toISOString(),
          is_active: true,
          category: 'iq',
          duration: '3분'
        })
        .eq('id', 'iq-test');

      if (updateError) {
        console.error('IQ 테스트 데이터 업데이트 중 오류:', updateError);
        return { error: updateError };
      }

      return { success: true, operation: 'update' };
    } else {
      console.log('새로운 IQ 테스트 데이터를 생성합니다.');
      const { error: insertError } = await supabaseClient
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
        console.error('IQ 테스트 데이터 생성 중 오류:', insertError);
        return { error: insertError };
      }

      return { success: true, operation: 'insert' };
    }
  } catch (error) {
    console.error('IQ 테스트 데이터 처리 중 오류:', error);
    return { error };
  }
}
