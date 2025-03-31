-- Create test_cards table if not exists
CREATE TABLE IF NOT EXISTS public.test_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create test_categories table if not exists
CREATE TABLE IF NOT EXISTS public.test_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create test_card_categories table if not exists
CREATE TABLE IF NOT EXISTS public.test_card_categories (
    test_card_id UUID REFERENCES test_cards(id) ON DELETE CASCADE,
    category_id UUID REFERENCES test_categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (test_card_id, category_id)
);

-- Create test_card_stats table if not exists
CREATE TABLE IF NOT EXISTS public.test_card_stats (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    participation_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    category TEXT,
    duration TEXT
);

-- Add unique constraint to test_cards title if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'test_cards_title_key'
    ) THEN
        ALTER TABLE public.test_cards ADD CONSTRAINT test_cards_title_key UNIQUE (title);
    END IF;
END $$;

-- Add RLS policies
ALTER TABLE public.test_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_card_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_card_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_policy 
        WHERE polname = 'Allow public read access on test_cards'
    ) THEN
        CREATE POLICY "Allow public read access on test_cards"
        ON public.test_cards FOR SELECT TO public USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 
        FROM pg_policy 
        WHERE polname = 'Allow public read access on test_categories'
    ) THEN
        CREATE POLICY "Allow public read access on test_categories"
        ON public.test_categories FOR SELECT TO public USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 
        FROM pg_policy 
        WHERE polname = 'Allow public read access on test_card_categories'
    ) THEN
        CREATE POLICY "Allow public read access on test_card_categories"
        ON public.test_card_categories FOR SELECT TO public USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 
        FROM pg_policy 
        WHERE polname = 'Allow public read access on test_card_stats'
    ) THEN
        CREATE POLICY "Allow public read access on test_card_stats"
        ON public.test_card_stats FOR SELECT TO public USING (true);
    END IF;
END $$;

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
ON CONFLICT (name) DO NOTHING;

-- Add test cards
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
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- IQ 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'iq';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
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
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 기억력 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'memory';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- MBTI 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        'MBTI 성격 테스트',
        '당신의 진정한 MBTI 유형을 알아보세요. 16가지 성격 유형 중 당신은?',
        'https://picsum.photos/seed/mbti/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- MBTI 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'personality';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 전생 캐릭터 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '전생 캐릭터 테스트',
        '당신의 전생은 어떤 모습이었을까요? 흥미진진한 전생 탐험!',
        'https://picsum.photos/seed/past-life/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 전생 캐릭터 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'fortune';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 결혼 성향 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '결혼 성향 테스트',
        '결혼에 대한 당신의 가치관과 기대를 분석해 결혼 성향을 알아보세요.',
        'https://picsum.photos/seed/marriage-type/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 결혼 성향 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'relationship';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 강아지 궁합 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '강아지 궁합 테스트',
        '당신의 성격과 생활 습관에 가장 잘 맞는 강아지 품종을 찾아보세요.',
        'https://picsum.photos/seed/dog-compatibility/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 강아지 궁합 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'relationship';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 색맹 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '색맹 테스트',
        '당신의 색각 능력을 테스트해보세요. 전문적인 색각 검사로 시작해보세요.',
        'https://picsum.photos/seed/color-blindness/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 색맹 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'ability';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 스트레스 체크 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '스트레스 체크 테스트',
        '현재 당신의 스트레스 지수는 얼마일까요? 스트레스 관리 방법도 함께!',
        'https://picsum.photos/seed/stress-check/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 스트레스 체크 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'psychological';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 인생 장르 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '인생 장르 테스트',
        '당신의 인생이 영화라면 어떤 장르일까요? 재미있는 인생 장르 테스트!',
        'https://picsum.photos/seed/life-genre/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 인생 장르 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'psychological';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 타로 상담 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '타로 상담 테스트',
        '타로카드로 당신의 운명을 읽어보세요. 미래에 대한 통찰력을 얻을 수 있습니다.',
        'https://picsum.photos/seed/tarot/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 타로 상담 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'fortune';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 힐링 모먼트 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '힐링 모먼트 테스트',
        '당신에게 가장 필요한 힐링은 무엇일까요? 마음의 안정을 찾아보세요.',
        'https://picsum.photos/seed/healing/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 힐링 모먼트 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'healing';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 플러팅 스타일 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '플러팅 스타일 테스트',
        '당신의 연애 스타일은 어떤 유형인가요? 매력적인 데이트 팁도 함께!',
        'https://picsum.photos/seed/flirting/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 플러팅 스타일 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'relationship';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 퍼스널 컬러 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '퍼스널 컬러 테스트',
        '당신에게 어울리는 색상을 찾아보세요. 패션과 메이크업의 새로운 가이드!',
        'https://picsum.photos/seed/personal-color/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 퍼스널 컬러 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'ability';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

    -- 다중 성격 테스트 카드 등록
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
        '다중 성격 테스트',
        '당신 안에 숨어있는 여러 가지 성격을 발견해보세요. 재미있는 자아 탐구!',
        'https://picsum.photos/seed/multiple-personality/400/300'
    )
    ON CONFLICT (title) DO UPDATE 
    SET description = EXCLUDED.description,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;

    -- 다중 성격 테스트와 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'personality';
    IF v_test_card_id IS NOT NULL AND v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
    END IF;

END $$;

-- Sync test_card_stats with test_cards
DO $$
DECLARE
    v_test_card RECORD;
BEGIN
    FOR v_test_card IN SELECT id::text, title, description, thumbnail_url FROM public.test_cards
    LOOP
        INSERT INTO public.test_card_stats (
            id,
            title,
            description,
            thumbnail_url,
            participation_count,
            like_count,
            is_active,
            duration
        )
        VALUES (
            v_test_card.id,
            v_test_card.title,
            v_test_card.description,
            v_test_card.thumbnail_url,
            0,
            0,
            true,
            '5분'
        )
        ON CONFLICT (id) DO UPDATE
        SET title = EXCLUDED.title,
            description = EXCLUDED.description,
            thumbnail_url = EXCLUDED.thumbnail_url,
            updated_at = CURRENT_TIMESTAMP;
    END LOOP;
END $$; 