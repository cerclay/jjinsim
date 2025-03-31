-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS public.test_cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.test_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.test_card_categories (
    test_card_id UUID REFERENCES public.test_cards(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.test_categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (test_card_id, category_id)
);

CREATE TABLE IF NOT EXISTS public.test_card_stats (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    participation_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    duration TEXT DEFAULT '5분',
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clean up existing data
TRUNCATE public.test_card_categories CASCADE;
TRUNCATE public.test_card_stats CASCADE;
TRUNCATE public.test_cards CASCADE;
TRUNCATE public.test_categories CASCADE;

-- Add test categories
INSERT INTO public.test_categories (name, display_name)
VALUES 
    ('iq', 'IQ 테스트'),
    ('memory', '기억력 테스트'),
    ('personality', '성격 테스트'),
    ('ability', '능력 테스트'),
    ('psychological', '심리 테스트'),
    ('fortune', '운세 테스트'),
    ('relationship', '관계 테스트'),
    ('healing', '힐링 테스트')
ON CONFLICT (name) DO UPDATE 
SET display_name = EXCLUDED.display_name
RETURNING id, name;

-- Add test cards and sync with stats
DO $$
DECLARE
    v_test_card_id UUID;
    v_category_id UUID;
BEGIN
    -- IQ 테스트 카드 등록
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

    -- IQ 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'iq';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT DO NOTHING;

        -- test_card_stats에 동기화
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
            v_test_card_id::text,
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
        WHERE tc.id = v_test_card_id
        ON CONFLICT (id) DO UPDATE 
        SET title = EXCLUDED.title,
            description = EXCLUDED.description,
            thumbnail_url = EXCLUDED.thumbnail_url,
            category = EXCLUDED.category;
    END IF;

    -- 기억력 테스트 카드 등록
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

    -- 기억력 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'memory';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT DO NOTHING;

        -- test_card_stats에 동기화
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
            v_test_card_id::text,
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
        WHERE tc.id = v_test_card_id
        ON CONFLICT (id) DO UPDATE 
        SET title = EXCLUDED.title,
            description = EXCLUDED.description,
            thumbnail_url = EXCLUDED.thumbnail_url,
            category = EXCLUDED.category;
    END IF;

    -- MBTI 테스트 카드 등록
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

    -- MBTI 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'personality';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT DO NOTHING;

        -- test_card_stats에 동기화
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
            v_test_card_id::text,
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
        WHERE tc.id = v_test_card_id
        ON CONFLICT (id) DO UPDATE 
        SET title = EXCLUDED.title,
            description = EXCLUDED.description,
            thumbnail_url = EXCLUDED.thumbnail_url,
            category = EXCLUDED.category;
    END IF;
END $$;

-- 테스트 카드 확인
SELECT * FROM public.test_cards;

-- 테스트 카드와 카테고리 연결 확인
SELECT 
    tc.title,
    tcat.name as category_name,
    tcat.display_name as category_display_name
FROM public.test_cards tc
JOIN public.test_card_categories tcc ON tc.id = tcc.test_card_id
JOIN public.test_categories tcat ON tcc.category_id = tcat.id;

-- 테스트 카드 통계 확인
SELECT * FROM public.test_card_stats;

SELECT COUNT(*) FROM public.test_cards;
SELECT COUNT(*) FROM public.test_card_stats;
SELECT COUNT(*) FROM public.test_categories; 