import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/lib/supabase/database.types";

export async function GET(req: NextRequest) {
  try {
    // 관리자 쿠키 확인
    const cookieStore = cookies();
    const adminUserCookie = cookieStore.get('adminUser');
    
    if (!adminUserCookie) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }
    
    // 관리자 권한 확인
    try {
      const adminUser = JSON.parse(adminUserCookie.value);
      
      if (!adminUser || adminUser.role !== 'admin') {
        return NextResponse.json(
          { error: "관리자 권한이 없습니다." },
          { status: 403 }
        );
      }
      
      // 유효성 검증을 위해 Supabase에서 계정 정보 조회
      const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
      const { data: account, error } = await supabase
        .from('account')
        .select('*')
        .eq('id', adminUser.id)
        .eq('role', 'admin')
        .eq('is_active', true)
        .single();
      
      if (error || !account) {
        return NextResponse.json(
          { error: "유효하지 않은 관리자 계정입니다." },
          { status: 403 }
        );
      }
      
      return NextResponse.json({
        user: {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role,
        },
        isAdmin: true,
      });
    } catch (error) {
      console.error('쿠키 파싱 중 오류:', error);
      return NextResponse.json(
        { error: "인증 정보가 손상되었습니다." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('관리자 인증 확인 중 오류 발생:', error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 