-- 테스트 카드 테이블 (이미 있다면 생략)
CREATE TABLE IF NOT EXISTS public.test_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 테스트 카드 참여 기록 테이블
CREATE TABLE IF NOT EXISTS public.test_participations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_card_id UUID NOT NULL REFERENCES public.test_cards(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    participated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_anonymous BOOLEAN DEFAULT FALSE
);

-- 테스트 카드 상호작용 테이블
CREATE TABLE IF NOT EXISTS public.test_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_card_id UUID NOT NULL REFERENCES public.test_cards(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    interaction_type TEXT NOT NULL CHECK (interaction_type IN ('share', 'save', 'like', 'accurate')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 테스트 카드 카테고리 테이블
CREATE TABLE IF NOT EXISTS public.test_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 테스트 카드와 카테고리 연결 테이블
CREATE TABLE IF NOT EXISTS public.test_card_categories (
    test_card_id UUID REFERENCES public.test_cards(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.test_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (test_card_id, category_id)
);

-- 참여 횟수 집계를 위한 뷰 생성
CREATE OR REPLACE VIEW public.test_card_stats AS
SELECT
    tc.id,
    tc.title,
    tc.description,
    tc.tags,
    tc.thumbnail_url,
    (
        SELECT COUNT(*) 
        FROM public.test_participations tp 
        WHERE tp.test_card_id = tc.id
    ) AS participation_count,
    (
        SELECT COUNT(*) 
        FROM public.test_interactions ti 
        WHERE ti.test_card_id = tc.id AND ti.interaction_type = 'share'
    ) AS share_count,
    (
        SELECT COUNT(*) 
        FROM public.test_interactions ti 
        WHERE ti.test_card_id = tc.id AND ti.interaction_type = 'save'
    ) AS save_count,
    (
        SELECT COUNT(*) 
        FROM public.test_interactions ti 
        WHERE ti.test_card_id = tc.id AND ti.interaction_type = 'like'
    ) AS like_count,
    (
        SELECT COUNT(*) 
        FROM public.test_interactions ti 
        WHERE ti.test_card_id = tc.id AND ti.interaction_type = 'accurate'
    ) AS accurate_count,
    (
        SELECT STRING_AGG(tc2.name, ', ')
        FROM public.test_card_categories tcc
        JOIN public.test_categories tc2 ON tcc.category_id = tc2.id
        WHERE tcc.test_card_id = tc.id
    ) AS categories,
    tc.created_at,
    tc.updated_at
FROM public.test_cards tc
ORDER BY participation_count DESC;

-- RLS 정책 설정
ALTER TABLE public.test_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_card_categories ENABLE ROW LEVEL SECURITY;

-- 기존 정책이 있으면 먼저 삭제
DROP POLICY IF EXISTS "테스트 카드 조회 허용" ON "public"."test_cards";

-- 그 다음 새로운 정책 생성
CREATE POLICY "테스트 카드 조회 허용" ON "public"."test_cards"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- 기존 정책 삭제
DROP POLICY IF EXISTS "테스트 참여 기록 생성 허용" ON public.test_participations;

-- 참여 기록을 생성할 수 있는 정책
CREATE POLICY "테스트 참여 기록 생성 허용" ON public.test_participations
    FOR INSERT WITH CHECK (true);

-- 자신의 상호작용만 조회 정책 생성 전
DROP POLICY IF EXISTS "자신의 상호작용만 조회" ON public.test_interactions;

-- 상호작용 생성 허용 정책 생성 전
DROP POLICY IF EXISTS "상호작용 생성 허용" ON public.test_interactions;

-- 카테고리 조회 허용 정책 생성 전
DROP POLICY IF EXISTS "카테고리 조회 허용" ON public.test_categories;

-- 테스트 카드 카테고리 연결 조회 허용 정책 생성 전
DROP POLICY IF EXISTS "테스트 카드 카테고리 연결 조회 허용" ON public.test_card_categories;

-- 사용자는 자신의 상호작용만 볼 수 있음
CREATE POLICY "자신의 상호작용만 조회" ON public.test_interactions
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- 상호작용 생성 허용
CREATE POLICY "상호작용 생성 허용" ON public.test_interactions
    FOR INSERT WITH CHECK (true);

-- 카테고리 조회 허용
CREATE POLICY "카테고리 조회 허용" ON public.test_categories
    FOR SELECT USING (true);

-- 테스트 카드 카테고리 연결 조회 허용
CREATE POLICY "테스트 카드 카테고리 연결 조회 허용" ON public.test_card_categories
    FOR SELECT USING (true); 