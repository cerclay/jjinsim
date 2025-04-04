import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/lib/supabase/database.types";
import { compare } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, isTestLogin, isLocalStorageAuth, adminUser } = body;
    
    let userData;
    
    // 로컬 스토리지 기반 인증
    if (isLocalStorageAuth && adminUser) {
      if (adminUser.role === 'admin') {
        userData = adminUser;
      } else {
        return NextResponse.json(
          { error: "관리자 권한이 없습니다." },
          { status: 403 }
        );
      }
    }
    // 테스트 로그인 처리
    else if (isTestLogin && username === 'admin' && password === 'password') {
      console.log('테스트 계정으로 로그인 처리 중');
      userData = {
        id: '1',
        username: 'admin',
        role: 'admin',
      };
    }
    // 일반 로그인 처리
    else if (username && password) {
      // 실제 DB 로그인 처리
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
      
      // 비밀번호 검증
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
      
      userData = {
        id: account.id,
        username: account.username,
        role: account.role,
      };
    } else {
      return NextResponse.json(
        { error: "로그인 정보가 잘못되었습니다." },
        { status: 400 }
      );
    }
    
    if (!userData) {
      return NextResponse.json(
        { error: "인증 처리 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }
    
    // JSON 문자열로 변환 및 인코딩
    const jsonString = JSON.stringify(userData);
    const encodedJsonString = encodeURIComponent(jsonString);
    
    // 응답 객체 생성
    const response = NextResponse.json({ 
      success: true,
      message: "로그인 성공",
    });
    
    // 응답에 HTTP-Only 쿠키 추가
    response.cookies.set({
      name: 'adminUser',
      value: encodedJsonString,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24시간
      path: '/',
      sameSite: 'lax',
    });
    
    console.log('서버에서 관리자 쿠키 설정 완료');
    
    return response;
  } catch (error) {
    console.error('로그인 처리 중 오류 발생:', error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 