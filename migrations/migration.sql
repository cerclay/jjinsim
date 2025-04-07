-- user_test_activities 테이블 생성
CREATE TABLE IF NOT EXISTS public.user_test_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    test_id TEXT NOT NULL,
    test_title TEXT NOT NULL,
    result_summary TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_user_test_activities_user_id ON public.user_test_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_test_activities_test_id ON public.user_test_activities(test_id);
CREATE INDEX IF NOT EXISTS idx_user_test_activities_created_at ON public.user_test_activities(created_at);

-- 테스트 카드 통계 테이블이 없는 경우 생성
CREATE TABLE IF NOT EXISTS public.test_card_stats (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    participation_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    is_popular BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    duration TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 순서 필드 추가 (인기 테스트 및 새 테스트 순서 관리용)
ALTER TABLE public.test_card_stats 
ADD COLUMN IF NOT EXISTS popular_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS new_order INTEGER DEFAULT 0;

-- 기존 데이터 정리
COMMENT ON TABLE public.user_test_activities IS '사용자 테스트 활동 기록';
COMMENT ON TABLE public.test_card_stats IS '테스트 카드 통계 및 메타데이터'; 