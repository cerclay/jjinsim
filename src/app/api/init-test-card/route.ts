import { NextRequest, NextResponse } from 'next/server';
import { createServerOnlyClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
    // 서버 전용 Supabase 클라이언트 생성 (쿠키 불필요)
    const supabase = createServerOnlyClient();
    
    console.log('API 라우트: IQ 테스트 카드 초기화 시작');
    
    // IQ 테스트 데이터가 이미 존재하는지 확인
    const { data: existingData, error: checkError } = await supabase
      .from('test_card_stats')
      .select('id')
      .eq('id', 'iq-test')
      .maybeSingle();
      
    if (checkError) {
      console.error('API 라우트: IQ 테스트 데이터 확인 중 오류:', checkError);
      return NextResponse.json({ success: false, error: checkError.message }, { status: 500 });
    }
    
    // 존재하지 않는 경우에만 생성
    if (!existingData) {
      console.log('API 라우트: 새 IQ 테스트 데이터 삽입 중');
      const { error: insertError } = await supabase
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
        console.error('API 라우트: IQ 테스트 데이터 추가 중 오류:', insertError);
        return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
      }
      
      console.log('API 라우트: IQ 테스트 데이터 추가 성공');
      return NextResponse.json({ 
        success: true, 
        message: 'IQ 테스트 카드가 성공적으로 추가되었습니다.',
        operation: 'insert'
      });
    }
    
    // 이미 존재하는 경우 업데이트
    console.log('API 라우트: 기존 IQ 테스트 데이터 업데이트 중');
    const { error: updateError } = await supabase
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
      console.error('API 라우트: IQ 테스트 데이터 업데이트 중 오류:', updateError);
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
    }
    
    console.log('API 라우트: IQ 테스트 데이터 업데이트 성공');
    return NextResponse.json({ 
      success: true, 
      message: 'IQ 테스트 카드가 성공적으로 업데이트되었습니다.',
      operation: 'update'
    });
  } catch (error) {
    console.error('API 라우트: IQ 테스트 카드 초기화 중 오류:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' },
      { status: 500 }
    );
  }
} 