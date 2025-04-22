-- Description: 사용자 통계 기능 확장 및 테스트 활동 추적 강화
-- Created at: 2024-07-25

-- 1. 테스트 활동 테이블 확장 - 완료 시간 추적 
DO $$
BEGIN
    -- 완료 시간 추적 필드 추가
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'user_test_activities' AND column_name = 'completion_time'
    ) THEN
        ALTER TABLE public.user_test_activities ADD COLUMN completion_time INTEGER DEFAULT NULL;
        COMMENT ON COLUMN public.user_test_activities.completion_time IS '테스트 완료 시간 (초 단위)';
    END IF;
END $$;

-- 2. 사용자 통계 함수 개선
CREATE OR REPLACE FUNCTION public.get_user_statistics(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_total_tests INT;
    v_unique_tests INT;
    v_avg_completion_time NUMERIC;
    v_favorite_test RECORD;
    v_result JSON;
    v_account_info RECORD;
    v_last_activity TIMESTAMP WITH TIME ZONE;
BEGIN
    -- 총 테스트 활동 수
    SELECT COUNT(*) INTO v_total_tests
    FROM public.user_test_activities
    WHERE user_id = p_user_id;
    
    -- 고유 테스트 수 (중복 제거)
    SELECT COUNT(DISTINCT test_id) INTO v_unique_tests
    FROM public.user_test_activities
    WHERE user_id = p_user_id;
    
    -- 평균 완료 시간 (초 단위)
    SELECT AVG(completion_time) INTO v_avg_completion_time
    FROM public.user_test_activities
    WHERE user_id = p_user_id AND completion_time IS NOT NULL;
    
    -- 가장 많이 수행한 테스트
    SELECT t.test_id, t.test_title, COUNT(*) as count
    INTO v_favorite_test
    FROM public.user_test_activities t
    WHERE t.user_id = p_user_id
    GROUP BY t.test_id, t.test_title
    ORDER BY COUNT(*) DESC
    LIMIT 1;
    
    -- 계정 정보 가져오기 (가입일 등)
    SELECT created_at, role
    INTO v_account_info
    FROM public.account
    WHERE id = p_user_id;
    
    -- 마지막 활동 시간
    SELECT created_at INTO v_last_activity
    FROM public.user_test_activities
    WHERE user_id = p_user_id
    ORDER BY created_at DESC
    LIMIT 1;
    
    -- 결과 구성
    v_result = json_build_object(
        'totalTests', v_total_tests,
        'uniqueTests', v_unique_tests,
        'avgCompletionTime', v_avg_completion_time,
        'favoriteTest', CASE WHEN v_favorite_test.test_id IS NOT NULL 
                        THEN json_build_object(
                            'id', v_favorite_test.test_id,
                            'title', v_favorite_test.test_title,
                            'count', v_favorite_test.count
                        )
                        ELSE NULL END,
        'accountInfo', json_build_object(
            'joinDate', v_account_info.created_at,
            'role', v_account_info.role
        ),
        'lastActivity', v_last_activity
    );
    
    RETURN v_result;
END;
$$;

-- 3. 테스트 완료 시간 기록 함수 생성
CREATE OR REPLACE FUNCTION public.record_test_completion(
    p_user_id UUID,
    p_test_id TEXT,
    p_test_title TEXT,
    p_result_summary TEXT DEFAULT NULL,
    p_image_url TEXT DEFAULT NULL,
    p_completion_time INTEGER DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_activity_id UUID;
BEGIN
    -- 테스트 활동 저장
    INSERT INTO public.user_test_activities (
        user_id, 
        test_id, 
        test_title, 
        result_summary, 
        image_url, 
        completion_time
    ) VALUES (
        p_user_id,
        p_test_id,
        p_test_title,
        p_result_summary,
        p_image_url,
        p_completion_time
    )
    RETURNING id INTO v_activity_id;
    
    -- 테스트 카드 통계 업데이트
    UPDATE public.test_card_stats
    SET 
        participation_count = participation_count + 1,
        updated_at = NOW()
    WHERE id = p_test_id;
    
    RETURN v_activity_id;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE '테스트 완료 기록 오류: %', SQLERRM;
        RETURN NULL;
END;
$$;

-- 4. RLS 정책 추가 검증
DO $$
BEGIN
    -- 함수에 대한 RLS 정책 확인 - 이미 설정되어 있다면 건너뜀
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'user_test_activities' AND policyname = 'user_test_activities_user_policy'
    ) THEN
        -- 사용자 자신의 활동만 볼 수 있도록 설정
        CREATE POLICY user_test_activities_user_policy ON public.user_test_activities
        FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'user_test_activities' AND policyname = 'user_test_activities_insert_policy'
    ) THEN
        -- 사용자 자신이 활동 기록 추가 가능
        CREATE POLICY user_test_activities_insert_policy ON public.user_test_activities
        FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$; 