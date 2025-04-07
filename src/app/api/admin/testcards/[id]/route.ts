import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkAdminAuth } from '@/lib/admin-auth';

// 테스트 카드 상세 조회
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const id = params.id;
    
    const { data, error } = await supabase
      .from('test_card_stats')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ testCard: data });
  } catch (error) {
    console.error('테스트 카드 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: "테스트 카드를 조회하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 테스트 카드 업데이트
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const id = params.id;
    const body = await req.json();
    
    // 순서 필드 추가
    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    };
    
    const { data, error } = await supabase
      .from('test_card_stats')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ testCard: data });
  } catch (error) {
    console.error('테스트 카드 업데이트 중 오류 발생:', error);
    return NextResponse.json(
      { error: "테스트 카드를 업데이트하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 테스트 카드 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const id = params.id;
    
    const { error } = await supabase
      .from('test_card_stats')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('테스트 카드 삭제 중 오류 발생:', error);
    return NextResponse.json(
      { error: "테스트 카드를 삭제하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 