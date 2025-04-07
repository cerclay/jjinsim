"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServerOnlyClient } from "@/lib/supabase-server";

export interface UserActivity {
  id: string;
  test_id: string;
  test_title: string;
  result_summary: string;
  image_url: string; 
  created_at: string;
}

/**
 * 사용자 테스트 활동 기록을 저장하는 함수
 */
export async function recordUserTestActivity(
  testId: string,
  testTitle: string,
  resultSummary: string,
  imageUrl: string
) {
  const supabase = createServerOnlyClient();
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { success: false, error: "로그인이 필요합니다." };
  }
  
  try {
    const { error } = await supabase
      .from('user_test_activities')
      .insert({
        user_id: session.user.id,
        test_id: testId,
        test_title: testTitle,
        result_summary: resultSummary,
        image_url: imageUrl
      });
    
    if (error) {
      console.error("테스트 활동 기록 오류:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error("테스트 활동 기록 서버 오류:", error);
    return { success: false, error: "서버 오류가 발생했습니다." };
  }
}

/**
 * 사용자의 테스트 활동 기록을 가져오는 함수
 */
export async function getUserTestActivities() {
  const supabase = createServerOnlyClient();
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { success: false, error: "로그인이 필요합니다.", data: [] };
  }
  
  try {
    const { data, error } = await supabase
      .from('user_test_activities')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("테스트 활동 조회 오류:", error);
      return { success: false, error: error.message, data: [] };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("테스트 활동 조회 서버 오류:", error);
    return { success: false, error: "서버 오류가 발생했습니다.", data: [] };
  }
}

/**
 * 사용자의 테스트 통계를 가져오는 함수
 */
export async function getUserTestStatistics() {
  const supabase = createServerOnlyClient();
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { success: false, error: "로그인이 필요합니다." };
  }
  
  try {
    // 사용자가 완료한 테스트 수
    const { count: totalTests, error: countError } = await supabase
      .from('user_test_activities')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id);
    
    if (countError) {
      throw countError;
    }
    
    // 가장 많이 수행한 테스트 카테고리 (카테고리 정보는 테스트 별로 저장되어 있다고 가정)
    const { data: categoryData, error: categoryError } = await supabase
      .from('user_test_activities')
      .select('test_id, tests!inner(category)')
      .eq('user_id', session.user.id);
      
    if (categoryError) {
      throw categoryError;
    }
    
    // 카테고리별 카운트
    const categoryCounts: Record<string, number> = {};
    categoryData?.forEach(item => {
      const category = (item as any).tests?.category;
      if (category) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });
    
    // 가장 많이 수행한 카테고리 찾기
    let favoriteCategory = '없음';
    let maxCount = 0;
    
    Object.entries(categoryCounts).forEach(([category, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favoriteCategory = category;
      }
    });
    
    // 최근 테스트 참여일
    const { data: recentActivity, error: recentError } = await supabase
      .from('user_test_activities')
      .select('created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1);
      
    if (recentError) {
      throw recentError;
    }
    
    const lastTestDate = recentActivity && recentActivity.length > 0
      ? new Date(recentActivity[0].created_at)
      : null;
    
    return {
      success: true,
      data: {
        totalTests: totalTests || 0,
        favoriteCategory,
        lastTestDate: lastTestDate ? lastTestDate.toISOString() : null,
        categories: categoryCounts
      }
    };
  } catch (error) {
    console.error("테스트 통계 조회 서버 오류:", error);
    return { success: false, error: "서버 오류가 발생했습니다." };
  }
} 