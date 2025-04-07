-- 0001_initial_tables.sql
-- 초기 테이블 생성 및 기본 설정

BEGIN;

-- 사용자 테스트 활동 테이블 생성
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_test_activities') THEN
        CREATE TABLE public.user_test_activities (
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
        CREATE INDEX idx_user_test_activities_user_id ON public.user_test_activities(user_id);
        CREATE INDEX idx_user_test_activities_test_id ON public.user_test_activities(test_id);
        CREATE INDEX idx_user_test_activities_created_at ON public.user_test_activities(created_at);

        -- 테이블 설명 추가
        COMMENT ON TABLE public.user_test_activities IS '사용자 테스트 활동 기록';
        COMMENT ON COLUMN public.user_test_activities.id IS '고유 식별자';
        COMMENT ON COLUMN public.user_test_activities.user_id IS '사용자 ID';
        COMMENT ON COLUMN public.user_test_activities.test_id IS '테스트 ID';
        COMMENT ON COLUMN public.user_test_activities.test_title IS '테스트 제목';
        COMMENT ON COLUMN public.user_test_activities.result_summary IS '테스트 결과 요약';
        COMMENT ON COLUMN public.user_test_activities.image_url IS '결과 이미지 URL';
        
        -- updated_at 자동 업데이트 트리거 생성
        CREATE OR REPLACE FUNCTION update_user_test_activities_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER set_user_test_activities_updated_at
        BEFORE UPDATE ON public.user_test_activities
        FOR EACH ROW
        EXECUTE FUNCTION update_user_test_activities_updated_at();
    END IF;
END $$;

-- 테스트 카드 통계 테이블 생성
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'test_card_stats') THEN
        CREATE TABLE public.test_card_stats (
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
            popular_order INTEGER DEFAULT 0,
            new_order INTEGER DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- 인덱스 생성
        CREATE INDEX idx_test_card_stats_category ON public.test_card_stats(category);
        CREATE INDEX idx_test_card_stats_is_popular ON public.test_card_stats(is_popular) WHERE is_popular = TRUE;
        CREATE INDEX idx_test_card_stats_is_new ON public.test_card_stats(is_new) WHERE is_new = TRUE;
        CREATE INDEX idx_test_card_stats_popular_order ON public.test_card_stats(popular_order) WHERE is_popular = TRUE;
        CREATE INDEX idx_test_card_stats_new_order ON public.test_card_stats(new_order) WHERE is_new = TRUE;

        -- 테이블 설명 추가
        COMMENT ON TABLE public.test_card_stats IS '테스트 카드 통계 및 메타데이터';
        COMMENT ON COLUMN public.test_card_stats.id IS '테스트 고유 ID (디렉토리 이름 기반)';
        COMMENT ON COLUMN public.test_card_stats.title IS '테스트 제목';
        COMMENT ON COLUMN public.test_card_stats.description IS '테스트 설명';
        COMMENT ON COLUMN public.test_card_stats.category IS '테스트 카테고리';
        COMMENT ON COLUMN public.test_card_stats.image_url IS '테스트 썸네일 이미지 URL';
        COMMENT ON COLUMN public.test_card_stats.participation_count IS '참여자 수';
        COMMENT ON COLUMN public.test_card_stats.like_count IS '좋아요 수';
        COMMENT ON COLUMN public.test_card_stats.is_popular IS '인기 테스트 여부';
        COMMENT ON COLUMN public.test_card_stats.is_new IS '새 테스트 여부';
        COMMENT ON COLUMN public.test_card_stats.is_active IS '활성화 여부';
        COMMENT ON COLUMN public.test_card_stats.duration IS '테스트 소요 시간';
        COMMENT ON COLUMN public.test_card_stats.popular_order IS '인기 테스트 표시 순서 (낮을수록 상위 노출)';
        COMMENT ON COLUMN public.test_card_stats.new_order IS '새 테스트 표시 순서 (낮을수록 상위 노출)';
        
        -- updated_at 자동 업데이트 트리거 생성
        CREATE OR REPLACE FUNCTION update_test_card_stats_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER set_test_card_stats_updated_at
        BEFORE UPDATE ON public.test_card_stats
        FOR EACH ROW
        EXECUTE FUNCTION update_test_card_stats_updated_at();
    END IF;
END $$;

-- RLS 정책 설정 (Row Level Security)
-- 테스트 카드는 공개 읽기 가능, 관리자만 쓰기 가능
DO $$
BEGIN
    -- 테스트 카드 RLS 활성화
    ALTER TABLE public.test_card_stats ENABLE ROW LEVEL SECURITY;
    
    -- 기존 정책이 있다면 삭제
    DROP POLICY IF EXISTS test_card_stats_select_policy ON public.test_card_stats;
    DROP POLICY IF EXISTS test_card_stats_admin_policy ON public.test_card_stats;
    
    -- 모든 사용자에게 읽기 권한 부여
    CREATE POLICY test_card_stats_select_policy ON public.test_card_stats
    FOR SELECT USING (true);
    
    -- 관리자에게만 전체 권한 부여 (관리자 역할 기반)
    CREATE POLICY test_card_stats_admin_policy ON public.test_card_stats
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));
    
    -- 사용자 활동 RLS 활성화
    ALTER TABLE public.user_test_activities ENABLE ROW LEVEL SECURITY;
    
    -- 기존 정책이 있다면 삭제
    DROP POLICY IF EXISTS user_test_activities_user_policy ON public.user_test_activities;
    DROP POLICY IF EXISTS user_test_activities_admin_policy ON public.user_test_activities;
    
    -- 사용자 자신의 활동만 볼 수 있도록 설정
    CREATE POLICY user_test_activities_user_policy ON public.user_test_activities
    FOR SELECT USING (auth.uid() = user_id);
    
    -- 관리자에게 전체 권한 부여
    CREATE POLICY user_test_activities_admin_policy ON public.user_test_activities
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));
END $$;

-- admin_users 테이블이 없는 경우 생성 (관리자 사용자 관리용)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_users') THEN
        CREATE TABLE public.admin_users (
            id SERIAL PRIMARY KEY,
            user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
            email TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'admin',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- 테이블 설명 추가
        COMMENT ON TABLE public.admin_users IS '관리자 사용자 목록';
        
        -- updated_at 자동 업데이트 트리거 생성
        CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER set_admin_users_updated_at
        BEFORE UPDATE ON public.admin_users
        FOR EACH ROW
        EXECUTE FUNCTION update_admin_users_updated_at();
    END IF;
END $$;

COMMIT; 