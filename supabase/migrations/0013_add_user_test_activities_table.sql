-- 0013_add_user_test_activities_table.sql
-- 사용자 테스트 활동 기록 테이블 추가 및 테스트 카드 순서 필드 설정

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
        RETURNS TRIGGER AS $trigger$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $trigger$ LANGUAGE plpgsql;

        CREATE TRIGGER set_user_test_activities_updated_at
        BEFORE UPDATE ON public.user_test_activities
        FOR EACH ROW
        EXECUTE FUNCTION update_user_test_activities_updated_at();
    END IF;
END $$;

-- test_card_stats 테이블에 순서 필드 추가
DO $$
BEGIN
    -- popular_order 필드 추가
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'test_card_stats' AND column_name = 'popular_order'
    ) THEN
        ALTER TABLE public.test_card_stats ADD COLUMN popular_order INTEGER DEFAULT 0;
        
        -- 인덱스 생성
        CREATE INDEX idx_test_card_stats_popular_order 
        ON public.test_card_stats(popular_order) 
        WHERE is_active = TRUE;
        
        -- 컬럼 설명 추가
        COMMENT ON COLUMN public.test_card_stats.popular_order IS '인기 테스트 표시 순서 (낮을수록 상위 노출)';
    END IF;
    
    -- new_order 필드 추가
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'test_card_stats' AND column_name = 'new_order'
    ) THEN
        ALTER TABLE public.test_card_stats ADD COLUMN new_order INTEGER DEFAULT 0;
        
        -- 인덱스 생성
        CREATE INDEX idx_test_card_stats_new_order 
        ON public.test_card_stats(new_order) 
        WHERE is_active = TRUE;
        
        -- 컬럼 설명 추가
        COMMENT ON COLUMN public.test_card_stats.new_order IS '새 테스트 표시 순서 (낮을수록 상위 노출)';
    END IF;
END $$;

-- 사용자 테스트 활동 RLS 정책 설정
DO $$
BEGIN
    -- 사용자 활동 RLS 활성화
    ALTER TABLE public.user_test_activities ENABLE ROW LEVEL SECURITY;
    
    -- 기존 정책이 있다면 삭제
    DROP POLICY IF EXISTS user_test_activities_user_policy ON public.user_test_activities;
    DROP POLICY IF EXISTS user_test_activities_admin_policy ON public.user_test_activities;
    
    -- 사용자 자신의 활동만 볼 수 있도록 설정
    CREATE POLICY user_test_activities_user_policy ON public.user_test_activities
    FOR SELECT USING (auth.uid() = user_id);
    
    -- 사용자 자신이 활동 기록 추가 가능
    CREATE POLICY user_test_activities_insert_policy ON public.user_test_activities
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
    -- 관리자에게 전체 권한 부여 (JWT 역할 기반)
    CREATE POLICY user_test_activities_admin_policy ON public.user_test_activities
    FOR ALL USING (auth.jwt()->>'role' = 'admin');
END $$;

-- 테스트 API 함수 추가
-- 인기 테스트 가져오기 함수
CREATE OR REPLACE FUNCTION public.get_popular_tests()
RETURNS SETOF public.test_card_stats
LANGUAGE sql
SECURITY DEFINER
AS $popular_tests$
    SELECT *
    FROM public.test_card_stats
    WHERE is_active = TRUE 
    ORDER BY 
        CASE WHEN popular_order = 0 THEN 999999 ELSE popular_order END,
        participation_count DESC,
        created_at DESC
    LIMIT 10;
$popular_tests$;

-- 새 테스트 가져오기 함수
CREATE OR REPLACE FUNCTION public.get_new_tests()
RETURNS SETOF public.test_card_stats
LANGUAGE sql
SECURITY DEFINER
AS $new_tests$
    SELECT *
    FROM public.test_card_stats
    WHERE is_active = TRUE 
    ORDER BY 
        CASE WHEN new_order = 0 THEN 999999 ELSE new_order END,
        created_at DESC
    LIMIT 10;
$new_tests$;

-- 사용자별 테스트 활동 가져오기 함수
CREATE OR REPLACE FUNCTION public.get_user_activities(user_uuid UUID)
RETURNS SETOF public.user_test_activities
LANGUAGE sql
SECURITY INVOKER
AS $user_activities$
    SELECT *
    FROM public.user_test_activities
    WHERE user_id = user_uuid
    ORDER BY created_at DESC;
$user_activities$;

-- 테스트 완료 후 통계 업데이트 함수
CREATE OR REPLACE FUNCTION public.register_test_completion(
    p_user_id UUID,
    p_test_id TEXT,
    p_test_title TEXT,
    p_result_summary TEXT,
    p_image_url TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $register_completion$
DECLARE
    activity_id UUID;
BEGIN
    -- 사용자 활동 기록 추가
    INSERT INTO public.user_test_activities (
        user_id, test_id, test_title, result_summary, image_url
    ) VALUES (
        p_user_id, p_test_id, p_test_title, p_result_summary, p_image_url
    )
    RETURNING id INTO activity_id;
    
    -- 테스트 카드 통계 업데이트
    UPDATE public.test_card_stats
    SET 
        participation_count = participation_count + 1,
        updated_at = NOW()
    WHERE id = p_test_id;
    
    RETURN activity_id;
END;
$register_completion$;

-- 기존 테스트 참여 데이터 마이그레이션 (테스트 결과 테이블이 있는 경우)
DO $$
BEGIN
    -- 기존 테이블에서 데이터 가져와서 마이그레이션 (기존 테이블이 있는 경우에만)
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'test_results') THEN
        INSERT INTO public.user_test_activities (
            user_id, test_id, test_title, result_summary, image_url, created_at, updated_at
        )
        SELECT 
            user_id, 
            test_id, 
            test_name, 
            result_text, 
            result_image_url, 
            created_at, 
            updated_at
        FROM 
            public.test_results
        WHERE
            NOT EXISTS (
                SELECT 1 FROM public.user_test_activities 
                WHERE user_test_activities.user_id = test_results.user_id 
                AND user_test_activities.created_at = test_results.created_at
            );
    END IF;
END $$; 