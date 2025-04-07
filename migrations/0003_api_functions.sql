-- 0003_api_functions.sql
-- API 함수 및 인증 관련 기능 추가

BEGIN;

-- 인기 테스트 가져오기 함수
CREATE OR REPLACE FUNCTION public.get_popular_tests()
RETURNS SETOF public.test_card_stats
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT *
    FROM public.test_card_stats
    WHERE is_active = TRUE AND is_popular = TRUE
    ORDER BY 
        CASE WHEN popular_order = 0 THEN 999999 ELSE popular_order END,
        participation_count DESC,
        created_at DESC
    LIMIT 10;
$$;

-- 새 테스트 가져오기 함수
CREATE OR REPLACE FUNCTION public.get_new_tests()
RETURNS SETOF public.test_card_stats
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT *
    FROM public.test_card_stats
    WHERE is_active = TRUE AND is_new = TRUE
    ORDER BY 
        CASE WHEN new_order = 0 THEN 999999 ELSE new_order END,
        created_at DESC
    LIMIT 10;
$$;

-- 카테고리별 테스트 가져오기 함수
CREATE OR REPLACE FUNCTION public.get_tests_by_category(category_name TEXT)
RETURNS SETOF public.test_card_stats
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT *
    FROM public.test_card_stats
    WHERE is_active = TRUE AND category = category_name
    ORDER BY participation_count DESC, created_at DESC;
$$;

-- 사용자별 테스트 활동 가져오기 함수
CREATE OR REPLACE FUNCTION public.get_user_activities(user_uuid UUID)
RETURNS SETOF public.user_test_activities
LANGUAGE sql
SECURITY INVOKER
AS $$
    SELECT *
    FROM public.user_test_activities
    WHERE user_id = user_uuid
    ORDER BY created_at DESC;
$$;

-- 사용자 통계 가져오기 함수 (테스트 횟수, 선호 카테고리 등)
CREATE OR REPLACE FUNCTION public.get_user_statistics(user_uuid UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    result JSON;
BEGIN
    WITH user_stats AS (
        SELECT 
            COUNT(*) as total_tests,
            COUNT(DISTINCT test_id) as test_count,
            MODE() WITHIN GROUP (ORDER BY test_id) as favorite_test_id
        FROM 
            public.user_test_activities
        WHERE 
            user_id = user_uuid
    ),
    favorite_test AS (
        SELECT 
            tc.title,
            tc.category
        FROM 
            user_stats us
        JOIN 
            public.test_card_stats tc ON tc.id = us.favorite_test_id
        WHERE 
            us.favorite_test_id IS NOT NULL
    )
    SELECT 
        json_build_object(
            'totalTests', COALESCE((SELECT total_tests FROM user_stats), 0),
            'testCount', COALESCE((SELECT test_count FROM user_stats), 0),
            'favoriteTest', CASE 
                WHEN EXISTS (SELECT 1 FROM favorite_test) THEN
                    json_build_object(
                        'title', (SELECT title FROM favorite_test),
                        'category', (SELECT category FROM favorite_test)
                    )
                ELSE NULL
            END
        )
    INTO result;
    
    RETURN result;
END;
$$;

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
AS $$
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
$$;

-- 관리자 권한 검사 함수
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE admin_users.user_id = $1
    );
END;
$$;

COMMIT; 