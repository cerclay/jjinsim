import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/lib/supabase/database.types";
import { compare } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: "아이디와 비밀번호를 모두 입력해주세요." },
        { status: 400 }
      );
    }
    
    const cookieStore = cookies();
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
    
    // account 테이블에서 사용자 정보 조회
    const { data: account, error: accountError } = await supabase
      .from('account')
      .select('*')
      .eq('username', username)
      .eq('is_active', true)
      .single();
    
    if (accountError || !account) {
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }
    
    // 비밀번호 검증 (서버에서 해시 비교)
    const isPasswordValid = await compare(password, account.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }
    
    // 관리자 권한 확인
    if (account.role !== 'admin') {
      return NextResponse.json(
        { error: "관리자 권한이 없습니다." },
        { status: 403 }
      );
    }
    
    // 클라이언트에 전달할 사용자 정보
    const user = {
      id: account.id,
      username: account.username,
      role: account.role,
    };
    
    return NextResponse.json({ 
      message: "로그인 성공",
      user
    });
  } catch (error) {
    console.error('로그인 처리 중 오류 발생:', error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 