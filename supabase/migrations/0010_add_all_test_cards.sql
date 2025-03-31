-- 기존 데이터 삭제 전 백업 테이블 생성
CREATE TABLE IF NOT EXISTS public.test_cards_backup AS SELECT * FROM public.test_cards;
CREATE TABLE IF NOT EXISTS public.test_card_stats_backup AS SELECT * FROM public.test_card_stats;
CREATE TABLE IF NOT EXISTS public.test_card_categories_backup AS SELECT * FROM public.test_card_categories;

DO $$
DECLARE
    v_test_card_id UUID;
    v_category_id UUID;
BEGIN
    -- 모든 테스트 카드 등록
    -- IQ 테스트
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '나의 진짜 IQ테스트 - 유머버전',
        '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!',
        'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url
    RETURNING id INTO v_test_card_id;

    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'iq';
    PERFORM sync_test_card_category(v_test_card_id, v_category_id);

    -- 기억력 테스트
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '기억력 지수 테스트',
        '12문제로 당신의 뇌 메모리를 테스트합니다. 감성 저장소인지, 금붕어인지 직접 확인해보세요!',
        'https://picsum.photos/seed/memory-test/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url
    RETURNING id INTO v_test_card_id;

    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'memory';
    PERFORM sync_test_card_category(v_test_card_id, v_category_id);

    -- MBTI 테스트
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        'MBTI 성격 테스트',
        '당신의 MBTI는 무엇인가요? 16가지 성격 유형 중 당신은 어디에 속하나요?',
        'https://picsum.photos/seed/mbti-test/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url
    RETURNING id INTO v_test_card_id;

    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'personality';
    PERFORM sync_test_card_category(v_test_card_id, v_category_id);

    -- 강아지 궁합 테스트
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '강아지 궁합 테스트',
        '당신과 가장 잘 맞는 강아지는 어떤 종일까요? 10가지 질문으로 알아보는 나의 반려견 궁합!',
        'https://picsum.photos/seed/dog-test/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url
    RETURNING id INTO v_test_card_id;

    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'relationship';
    PERFORM sync_test_card_category(v_test_card_id, v_category_id);

    -- 결혼 성향 테스트
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '결혼 성향 테스트',
        '당신의 결혼관은 어떤가요? 연애와 결혼에 대한 당신의 진짜 성향을 알아봅니다.',
        'https://picsum.photos/seed/marriage-test/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url
    RETURNING id INTO v_test_card_id;

    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'psychological';
    PERFORM sync_test_card_category(v_test_card_id, v_category_id);

    -- 전생 성격 테스트
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '전생 성격 테스트',
        '당신의 전생은 어떤 모습이었을까요? 현재의 성격으로 알아보는 전생의 이야기.',
        'https://picsum.photos/seed/past-life/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url
    RETURNING id INTO v_test_card_id;

    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'psychological';
    PERFORM sync_test_card_category(v_test_card_id, v_category_id);

    -- 티 파워 테스트
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '티 파워: 당신의 잠재력은?',
        '차 한잔으로 알아보는 당신의 숨겨진 잠재력! 어떤 차의 기운을 가지고 있나요?',
        'https://picsum.photos/seed/tea-power/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url
    RETURNING id INTO v_test_card_id;

    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'healing';
    PERFORM sync_test_card_category(v_test_card_id, v_category_id);

    -- 색맹 테스트
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '색맹 테스트',
        '당신의 색채 감각은 어떤가요? 간단한 테스트로 알아보는 나의 색채 감각!',
        'https://picsum.photos/seed/color-blind/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url
    RETURNING id INTO v_test_card_id;

    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'ability';
    PERFORM sync_test_card_category(v_test_card_id, v_category_id);

EXCEPTION WHEN OTHERS THEN
    -- 에러 발생 시 백업 테이블에서 복구
    TRUNCATE public.test_cards CASCADE;
    INSERT INTO public.test_cards SELECT * FROM public.test_cards_backup;
    INSERT INTO public.test_card_stats SELECT * FROM public.test_card_stats_backup;
    INSERT INTO public.test_card_categories SELECT * FROM public.test_card_categories_backup;
    RAISE NOTICE 'Error occurred: %', SQLERRM;
END $$;

-- 백업 테이블 삭제
DROP TABLE IF EXISTS public.test_cards_backup;
DROP TABLE IF EXISTS public.test_card_stats_backup;
DROP TABLE IF EXISTS public.test_card_categories_backup;

-- 헬퍼 함수 생성
CREATE OR REPLACE FUNCTION sync_test_card_category(p_test_card_id UUID, p_category_id UUID)
RETURNS void AS $$
BEGIN
    -- 카테고리 연결
    INSERT INTO public.test_card_categories (test_card_id, category_id)
    VALUES (p_test_card_id, p_category_id)
    ON CONFLICT DO NOTHING;

    -- 통계 동기화
    INSERT INTO public.test_card_stats (
        id,
        title,
        description,
        thumbnail_url,
        participation_count,
        like_count,
        is_active,
        duration,
        category
    )
    SELECT 
        p_test_card_id::text,
        tc.title,
        tc.description,
        tc.thumbnail_url,
        0,
        0,
        true,
        '5분',
        tcat.name
    FROM public.test_cards tc
    JOIN public.test_card_categories tcc ON tc.id = tcc.test_card_id
    JOIN public.test_categories tcat ON tcc.category_id = tcat.id
    WHERE tc.id = p_test_card_id
    ON CONFLICT (id) DO UPDATE 
    SET title = EXCLUDED.title,
        description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        category = EXCLUDED.category;
END;
$$ LANGUAGE plpgsql;

-- 1. 테이블 존재 여부 확인
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'test%';

-- 2. test_cards 테이블 데이터 확인
SELECT * FROM public.test_cards;

-- 3. test_card_stats 테이블 데이터 확인
SELECT * FROM public.test_card_stats;

-- 4. test_categories 테이블 데이터 확인
SELECT * FROM public.test_categories;

-- 5. test_card_categories 테이블 데이터 확인
SELECT * FROM public.test_card_categories;

-- 6. 중복된 ID 확인
SELECT id, COUNT(*) 
FROM public.test_card_stats 
GROUP BY id 
HAVING COUNT(*) > 1;

-- 7. test_cards와 test_card_stats 간의 불일치 확인
SELECT tc.id, tc.title, tcs.id as stats_id
FROM public.test_cards tc
LEFT JOIN public.test_card_stats tcs ON tc.id::text = tcs.id
WHERE tcs.id IS NULL OR tc.id::text != tcs.id; 