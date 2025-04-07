-- 0002_data_fixes.sql
-- 데이터 마이그레이션 및 통계 테이블 초기 데이터 설정

BEGIN;

-- 기존 테스트 카드 데이터 마이그레이션 (안전하게 수행)
DO $$
DECLARE
    test_ids TEXT[] := ARRAY['memory-test', 'iq-test', 'adhd-test', 'boomer-test'];
    test_id TEXT;
BEGIN
    -- 메모리 테스트
    IF NOT EXISTS (SELECT 1 FROM public.test_card_stats WHERE id = 'memory-test') THEN
        INSERT INTO public.test_card_stats (
            id, title, description, category, image_url,
            participation_count, like_count, is_popular, is_new, is_active,
            duration, popular_order, new_order
        ) VALUES (
            'memory-test',
            '당신의 기억력은?',
            '당신의 기억력을 테스트해보세요. 간단한 기억력 테스트를 통해 기억력 상태를 확인할 수 있습니다.',
            '능력',
            'https://example.com/memory-test-image.jpg',
            0, 0, TRUE, FALSE, TRUE,
            '3-5분', 2, 0
        );
    END IF;

    -- IQ 테스트
    IF NOT EXISTS (SELECT 1 FROM public.test_card_stats WHERE id = 'iq-test') THEN
        INSERT INTO public.test_card_stats (
            id, title, description, category, image_url,
            participation_count, like_count, is_popular, is_new, is_active,
            duration, popular_order, new_order
        ) VALUES (
            'iq-test',
            '당신의 IQ는?',
            '당신의 IQ를 측정해보세요. 간단한 문제들을 통해 지능 지수를 확인할 수 있습니다.',
            '능력',
            'https://example.com/iq-test-image.jpg',
            0, 0, TRUE, FALSE, TRUE,
            '5-10분', 1, 0
        );
    END IF;

    -- ADHD 테스트
    IF NOT EXISTS (SELECT 1 FROM public.test_card_stats WHERE id = 'adhd-test') THEN
        INSERT INTO public.test_card_stats (
            id, title, description, category, image_url,
            participation_count, like_count, is_popular, is_new, is_active,
            duration, popular_order, new_order
        ) VALUES (
            'adhd-test',
            'ADHD 자가진단',
            'ADHD 성향을 확인해보세요. 간단한 질문을 통해 ADHD 성향을 파악할 수 있습니다.',
            '심리',
            'https://example.com/adhd-test-image.jpg',
            0, 0, TRUE, TRUE, TRUE,
            '3-5분', 3, 2
        );
    END IF;

    -- 꼰대력 테스트
    IF NOT EXISTS (SELECT 1 FROM public.test_card_stats WHERE id = 'boomer-test') THEN
        INSERT INTO public.test_card_stats (
            id, title, description, category, image_url,
            participation_count, like_count, is_popular, is_new, is_active,
            duration, popular_order, new_order
        ) VALUES (
            'boomer-test',
            '나의 꼰대력은?!',
            '당신의 꼰대력 수준을 측정해보세요. 재미있는 질문을 통해 꼰대 성향을 파악할 수 있습니다.',
            '심리',
            'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfl5eqh5bGdKTYkWyK02Pd4nfeBnOaRGmKtdu-gNVVxmUbNa9RHOd1J4nPPBEhj-agPWoeFWNb02RKdUmz9Fb6miGtzq9tEQO4tKawQLyyr7JGMOS5c_SzUZC6JecRRfYosDV18Fll38q0jCtjq6AObiUI5cReNXaLYU4uFia4k-gAZ8C5vpT6FRtuBq4/s320/ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%207%EC%9D%BC%20%EC%98%A4%ED%9B%84%2003_14_18.png',
            0, 0, TRUE, TRUE, TRUE,
            '3-5분', 4, 1
        );
    END IF;
END $$;

-- 기존 테스트 참여 데이터 마이그레이션
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

-- 테스트 통계 데이터 업데이트 (참여자 수, 좋아요 수 등)
DO $$
BEGIN
    -- 참여자 수 집계 업데이트
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_test_activities') THEN
        UPDATE public.test_card_stats tc
        SET participation_count = (
            SELECT COUNT(*) 
            FROM public.user_test_activities uta
            WHERE uta.test_id = tc.id
        )
        WHERE EXISTS (
            SELECT 1 
            FROM public.user_test_activities uta
            WHERE uta.test_id = tc.id
        );
    END IF;
    
    -- 좋아요 수 집계 업데이트
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'test_likes') THEN
        UPDATE public.test_card_stats tc
        SET like_count = (
            SELECT COUNT(*) 
            FROM public.test_likes tl
            WHERE tl.test_id = tc.id
        )
        WHERE EXISTS (
            SELECT 1 
            FROM public.test_likes tl
            WHERE tl.test_id = tc.id
        );
    END IF;
END $$;

-- 새 테이블에 아무런 데이터가 없으면 시드 데이터 삽입 (테스트용)
DO $$
BEGIN
    IF (SELECT COUNT(*) FROM public.user_test_activities) = 0 THEN
        -- 여기에 필요한 샘플 데이터 삽입
        -- 실제 서비스에서는 이 부분 삭제 또는 주석 처리
        RAISE NOTICE '테스트 데이터 없음 - 필요시 샘플 데이터 생성 코드 추가';
    END IF;
END $$;

COMMIT; 