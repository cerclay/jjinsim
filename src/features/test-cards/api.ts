"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { TestCard, TestCardCategory, TestCardListResponse } from "./types";
import { Database } from "@/lib/supabase/database.types";

export async function getTestCards(category?: TestCardCategory): Promise<TestCardListResponse> {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  try {
    let query = supabase
      .from('test_card_stats')
      .select('*')
      .eq('is_active', true);

    if (category) {
      if (category === 'NEW') {
        // 최근 2주 이내에 생성된 테스트
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        query = query.gte('created_at', twoWeeksAgo.toISOString());
      } else if (category === 'POPULAR') {
        // 참여자 수가 1000 이상인 테스트
        query = query.gte('participation_count', 1000);
      } else {
        // 특정 카테고리의 테스트
        query = query.eq('category', category.toLowerCase());
      }
    }

    const { data: cards, error } = await query;

    if (error) {
      console.error("테스트 카드 조회 오류:", error);
      return { cards: [], totalCount: 0 };
    }

    // 카드 데이터 변환
    const transformedCards: TestCard[] = cards.map(card => ({
      id: card.id,
      title: card.title,
      description: card.description || "",
      thumbnail: card.thumbnail_url || "",
      path: `/${card.category}/${card.id}`,
      category: (card.category?.toUpperCase() as TestCardCategory) || 'NEW',
      createdAt: card.created_at || new Date().toISOString(),
      updatedAt: card.updated_at || new Date().toISOString(),
      participantCount: card.participation_count || 0,
      isPublished: card.is_active || false,
      tags: [],
    }));

    // 카테고리에 따른 정렬
    if (category === 'NEW') {
      transformedCards.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (category === 'POPULAR') {
      transformedCards.sort((a, b) => b.participantCount - a.participantCount);
    }

    return {
      cards: transformedCards,
      totalCount: transformedCards.length,
    };
  } catch (error) {
    console.error("테스트 카드 조회 중 오류 발생:", error);
    return { cards: [], totalCount: 0 };
  }
}

export async function incrementParticipantCount(testId: string): Promise<void> {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  try {
    // 참여 횟수 증가
    const { error } = await supabase.rpc('increment_test_participation', {
      test_id: testId
    });

    if (error) {
      console.error("참여 횟수 증가 오류:", error);
      throw error;
    }
  } catch (error) {
    console.error("참여 횟수 증가 중 오류 발생:", error);
    throw error;
  }
} 