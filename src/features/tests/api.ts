"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function recordTestParticipation(testCardId: string) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getServerSession(authOptions);
  
  try {
    // 사용자가 로그인한 경우 사용자 ID 포함, 그렇지 않으면 익명으로 기록
    const participation = {
      test_card_id: testCardId,
      user_id: session?.user?.id || null,
      is_anonymous: !session?.user?.id
    };
    
    const { error } = await supabase
      .from('test_participations')
      .insert(participation);
    
    if (error) {
      console.error("테스트 참여 기록 오류:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error("테스트 참여 기록 서버 오류:", error);
    return { success: false, error: "서버 오류가 발생했습니다." };
  }
}

export async function getPopularTests(limit = 10) {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    const { data, error } = await supabase
      .from('test_card_stats')
      .select('*')
      .order('participation_count', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error("인기 테스트 조회 오류:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("인기 테스트 조회 서버 오류:", error);
    return [];
  }
}

export async function getCategoriesWithCount() {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    const { data, error } = await supabase.rpc('get_popular_categories');
    
    if (error) {
      console.error("카테고리 조회 오류:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("카테고리 조회 서버 오류:", error);
    return [];
  }
}

export async function getUserInteractions(testCardId: string) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return { liked: false, saved: false, accurate: false };
  }
  
  try {
    const { data, error } = await supabase
      .from('test_interactions')
      .select('interaction_type')
      .eq('test_card_id', testCardId)
      .eq('user_id', session.user.id);
    
    if (error) {
      console.error("사용자 상호작용 조회 오류:", error);
      return { liked: false, saved: false, accurate: false };
    }
    
    return {
      liked: data?.some(item => item.interaction_type === 'like') || false,
      saved: data?.some(item => item.interaction_type === 'save') || false,
      accurate: data?.some(item => item.interaction_type === 'accurate') || false
    };
  } catch (error) {
    console.error("사용자 상호작용 조회 서버 오류:", error);
    return { liked: false, saved: false, accurate: false };
  }
} 