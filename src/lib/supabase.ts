'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

// 클라이언트 컴포넌트에서 Supabase 클라이언트 생성
export const createClient = () => {
  return createClientComponentClient<Database>();
}

// 테스트 통계 데이터 가져오기
export async function fetchTestStatistics() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('test_statistics')
    .select('*');
  
  if (error) {
    console.error('Error fetching test statistics:', error);
    throw new Error('테스트 통계 데이터를 가져오는 중 오류가 발생했습니다.');
  }
  
  return data || [];
}

// 특정 테스트의 참여자 수 가져오기
export async function fetchTestParticipantsCount(testId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('test_statistics')
    .select('participants_count')
    .eq('id', testId)
    .single();
  
  if (error) {
    console.error(`Error fetching participants count for test ${testId}:`, error);
    return 0;
  }
  
  return data?.participants_count || 0;
}

// 테스트 참여 기록 저장하기
export async function recordTestParticipation(testId: string, completed: boolean = false, satisfactionRating?: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from('test_participants')
    .insert({
      test_id: testId,
      completed,
      satisfaction_rating: satisfactionRating
    });
  
  if (error) {
    console.error(`Error recording test participation for test ${testId}:`, error);
    throw new Error('테스트 참여 기록을 저장하는 중 오류가 발생했습니다.');
  }
  
  return true;
}

// 모든 테스트 데이터 가져오기
export async function fetchAllTests() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tests')
    .select('*');
  
  if (error) {
    console.error('Error fetching all tests:', error);
    throw new Error('테스트 데이터를 가져오는 중 오류가 발생했습니다.');
  }
  
  return data || [];
}

// 인기 테스트 가져오기
export async function fetchPopularTests() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('test_statistics')
    .select('*')
    .eq('isPopular', true)
    .order('participants_count', { ascending: false });
  
  if (error) {
    console.error('Error fetching popular tests:', error);
    throw new Error('인기 테스트 데이터를 가져오는 중 오류가 발생했습니다.');
  }
  
  return data || [];
}

// 신규 테스트 가져오기
export async function fetchNewTests() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .eq('isNew', true);
  
  if (error) {
    console.error('Error fetching new tests:', error);
    throw new Error('신규 테스트 데이터를 가져오는 중 오류가 발생했습니다.');
  }
  
  return data || [];
}

// 특정 테스트 가져오기
export async function fetchTestById(testId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .eq('id', testId)
    .single();
  
  if (error) {
    console.error(`Error fetching test ${testId}:`, error);
    throw new Error('테스트 데이터를 가져오는 중 오류가 발생했습니다.');
  }
  
  return data;
}

// 카테고리별 테스트 가져오기
export async function fetchTestsByCategory(category: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .eq('category', category);
  
  if (error) {
    console.error(`Error fetching tests for category ${category}:`, error);
    throw new Error('카테고리별 테스트 데이터를 가져오는 중 오류가 발생했습니다.');
  }
  
  return data || [];
} 