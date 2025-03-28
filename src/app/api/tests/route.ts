import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    
    // 인기 테스트 가져오기
    const { data: popularTestsData, error: popularError } = await supabase
      .from('test_statistics')
      .select('id, title, imageUrl, participants_count, isPopular, isNew')
      .eq('isPopular', true)
      .order('participants_count', { ascending: false });
      
    // 새로운 테스트 가져오기
    const { data: newTestsData, error: newError } = await supabase
      .from('tests')
      .select('id, title, imageUrl, created_at, isNew, isPopular, description')
      .eq('isNew', true)
      .order('created_at', { ascending: false });
      
    if (popularError || newError) {
      throw new Error('Failed to fetch tests');
    }
    
    // 데이터 매핑
    const popularTests = popularTestsData?.map(test => ({
      id: test.id,
      title: test.title,
      imageUrl: test.imageUrl,
      participants: test.participants_count,
      isPopular: test.isPopular,
      isNew: test.isNew
    })) || [];
    
    const newTests = newTestsData?.map(test => ({
      id: test.id,
      title: test.title,
      imageUrl: test.imageUrl,
      participants: 0,
      isNew: test.isNew,
      isPopular: test.isPopular,
      description: test.description
    })) || [];
    
    return NextResponse.json({ popularTests, newTests });
  } catch (error) {
    console.error('Error fetching tests:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 