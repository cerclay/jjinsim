import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/lib/supabase/database.types";

// 관리자 권한 확인 함수
async function checkAdminAuth(cookieStore: any) {
  try {
    const adminUserCookie = cookieStore.get('adminUser');
    
    if (!adminUserCookie) {
      return { error: "인증되지 않은 사용자입니다.", status: 401 };
    }
    
    const adminUser = JSON.parse(adminUserCookie.value);
    
    if (!adminUser || adminUser.role !== 'admin') {
      return { error: "관리자 권한이 없습니다.", status: 403 };
    }
    
    // 유효성 검증을 위해 Supabase에서 계정 정보 조회
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
    const { data: account, error } = await supabase
      .from('account')
      .select('*')
      .eq('id', adminUser.id)
      .eq('role', 'admin')
      .eq('is_active', true)
      .single();
    
    if (error || !account) {
      return { error: "유효하지 않은 관리자 계정입니다.", status: 403 };
    }
    
    return { adminUser: account, supabase };
  } catch (error) {
    console.error('관리자 권한 확인 중 오류:', error);
    return { error: "인증 정보가 손상되었습니다.", status: 400 };
  }
}

// 테스트 카드 목록 가져오기
export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const auth = await checkAdminAuth(cookieStore);
    
    if (auth.error) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }
    
    const supabase = auth.supabase;
    
    // 테스트 카드 목록 조회
    const { data, error } = await supabase
      .from('test_card_stats')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ testCards: data });
  } catch (error) {
    console.error('테스트 카드 목록 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: "테스트 카드 목록을 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 테스트 카드 상태 토글
export async function PATCH(req: NextRequest) {
  try {
    const { id, is_active } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "테스트 카드 ID가 필요합니다." },
        { status: 400 }
      );
    }
    
    const cookieStore = cookies();
    const auth = await checkAdminAuth(cookieStore);
    
    if (auth.error) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }
    
    const supabase = auth.supabase;
    
    // 테스트 카드 상태 업데이트
    const { data, error } = await supabase
      .from('test_card_stats')
      .update({ is_active, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ testCard: data });
  } catch (error) {
    console.error('테스트 카드 상태 업데이트 중 오류 발생:', error);
    return NextResponse.json(
      { error: "테스트 카드 상태를 업데이트하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 테스트 카드 삭제
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "테스트 카드 ID가 필요합니다." },
        { status: 400 }
      );
    }
    
    const cookieStore = cookies();
    const auth = await checkAdminAuth(cookieStore);
    
    if (auth.error) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }
    
    const supabase = auth.supabase;
    
    // 테스트 카드 삭제
    const { error } = await supabase
      .from('test_card_stats')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('테스트 카드 삭제 중 오류 발생:', error);
    return NextResponse.json(
      { error: "테스트 카드를 삭제하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 