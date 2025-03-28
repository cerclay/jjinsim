import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import TestIntroduction from "@/features/tests/components/TestIntroduction";
import { recordTestParticipation } from "@/features/tests/api";

interface PageParams {
  id: string;
}

export default async function TestPage({ params }: Promise<{ params: PageParams }>) {
  const supabase = createServerComponentClient({ cookies });
  
  // 테스트 카드 정보 가져오기
  const { data: test, error } = await supabase
    .from("test_card_stats")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !test) {
    notFound();
  }

  // 테스트 시작 핸들러 (클라이언트 컴포넌트에서 사용)
  const handleStartTest = async () => {
    "use client";
    
    // 테스트 참여 기록
    await recordTestParticipation(params.id);
    
    // 테스트 시작 로직 (질문 화면으로 이동 등)
    // 여기서는 간단히 테스트 참여만 기록
  };

  return (
    <main className="container py-8">
      <Suspense fallback={<div>로딩 중...</div>}>
        <TestIntroduction 
          id={test.id}
          title={test.title}
          description={test.description}
          thumbnailUrl={test.thumbnail_url}
          tags={test.tags || []}
          participationCount={test.participation_count}
          likeCount={test.like_count}
          accurateCount={test.accurate_count}
          saveCount={test.save_count}
          onStart={handleStartTest}
        />
      </Suspense>
    </main>
  );
} 