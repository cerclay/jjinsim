import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // 쿠키나 로컬 스토리지를 통한 인증 체크 로직
    const adminUserCookie = req.cookies.get('adminUser');
    
    if (!adminUserCookie) {
      return NextResponse.json({ isAdmin: false }, { status: 200 });
    }
    
    try {
      const decodedCookie = decodeURIComponent(adminUserCookie.value);
      const adminUser = JSON.parse(decodedCookie);
      
      if (!adminUser || adminUser.role !== 'admin') {
        return NextResponse.json({ isAdmin: false }, { status: 200 });
      }
      
      return NextResponse.json({ 
        isAdmin: true,
        user: {
          username: adminUser.username,
          role: adminUser.role
        }
      }, { status: 200 });
    } catch (parseError) {
      console.error('[API] 관리자 쿠키 파싱 오류:', parseError);
      return NextResponse.json({ isAdmin: false }, { status: 200 });
    }
  } catch (error) {
    console.error('[API] 관리자 상태 확인 중 오류:', error);
    return NextResponse.json({ isAdmin: false }, { status: 200 });
  }
} 