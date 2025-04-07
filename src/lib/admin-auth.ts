import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

// 관리자 권한 체크 함수
export async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return {
      isAdmin: false,
      error: "인증되지 않았습니다.",
      response: NextResponse.json({ error: "인증되지 않았습니다." }, { status: 401 })
    };
  }
  
  if (session.user.role !== "admin") {
    return {
      isAdmin: false,
      error: "관리자 권한이 없습니다.",
      response: NextResponse.json({ error: "관리자 권한이 없습니다." }, { status: 403 })
    };
  }
  
  return {
    isAdmin: true,
    session
  };
} 