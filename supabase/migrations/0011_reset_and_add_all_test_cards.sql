-- 기존 테이블 삭제
DROP TABLE IF EXISTS public.test_card_categories CASCADE;
DROP TABLE IF EXISTS public.test_card_stats CASCADE;
DROP TABLE IF EXISTS public.test_cards CASCADE;
DROP TABLE IF EXISTS public.test_categories CASCADE;

-- 테이블 생성
CREATE TABLE public.test_cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.test_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.test_card_categories (
    test_card_id UUID REFERENCES public.test_cards(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.test_categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (test_card_id, category_id)
);

CREATE TABLE public.test_card_stats (
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

-- 카테고리 추가
INSERT INTO public.test_categories (name, display_name)
VALUES 
    ('iq', 'IQ 테스트'),
    ('memory', '기억력 테스트'),
    ('personality', '성격 테스트'),
    ('ability', '능력 테스트'),
    ('psychological', '심리 테스트'),
    ('fortune', '운세 테스트'),
    ('relationship', '관계 테스트'),
    ('healing', '힐링 테스트');

-- 테스트 카드 추가 함수
CREATE OR REPLACE FUNCTION add_test_card(
    p_title TEXT,
    p_description TEXT,
    p_thumbnail_url TEXT,
    p_category_name TEXT
) RETURNS void AS $$
DECLARE
    v_test_card_id UUID;
    v_category_id UUID;
BEGIN
    -- 테스트 카드 추가
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (p_title, p_description, p_thumbnail_url)
    RETURNING id INTO v_test_card_id;

    -- 카테고리 연결
    SELECT id INTO v_category_id FROM public.test_categories WHERE name = p_category_name;
    IF v_category_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id);

        -- 통계 추가
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
        ) VALUES (
            v_test_card_id::text,
            p_title,
            p_description,
            p_thumbnail_url,
            0,
            0,
            true,
            '5분',
            p_category_name
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 테스트 카드 추가
-- IQ 테스트
SELECT add_test_card(
    '나의 진짜 IQ테스트 - 유머버전',
    '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!',
    'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
    'iq'
);

-- 전생 성격 테스트
SELECT add_test_card(
    '전생 성격 테스트',
    '당신의 전생은 어떤 모습이었을까요? 현재의 성격으로 알아보는 전생의 이야기.',
    'https://picsum.photos/seed/past-life/400/300',
    'psychological'
);

-- 결혼 성향 테스트
SELECT add_test_card(
    '결혼 성향 테스트',
    '당신의 결혼관은 어떤가요? 연애와 결혼에 대한 당신의 진짜 성향을 알아봅니다.',
    'https://picsum.photos/seed/marriage-test/400/300',
    'psychological'
);

-- MBTI 테스트
SELECT add_test_card(
    'MBTI 성격 테스트',
    '당신의 MBTI는 무엇인가요? 16가지 성격 유형 중 당신은 어디에 속하나요?',
    'https://picsum.photos/seed/mbti-test/400/300',
    'personality'
);

-- 스트레스 체크 테스트
SELECT add_test_card(
    '스트레스 체크 테스트',
    '당신의 스트레스 지수는 얼마나 될까요? 간단한 테스트로 알아보는 스트레스 레벨!',
    'https://picsum.photos/seed/stress-check/400/300',
    'psychological'
);

-- 인생 장르 테스트
SELECT add_test_card(
    '인생 장르 테스트',
    '당신의 인생은 어떤 장르일까요? 로맨스? 액션? 코미디? 지금까지의 삶을 통해 알아보는 인생 장르!',
    'https://picsum.photos/seed/life-genre/400/300',
    'psychological'
);

-- 강아지 궁합 테스트
SELECT add_test_card(
    '강아지 궁합 테스트',
    '당신과 가장 잘 맞는 강아지는 어떤 종일까요? 10가지 질문으로 알아보는 나의 반려견 궁합!',
    'https://picsum.photos/seed/dog-compatibility/400/300',
    'relationship'
);

-- 운세 테스트
SELECT add_test_card(
    '운세 테스트',
    '당신의 운세는 어떨까요? 간단한 테스트로 알아보는 오늘의 운세!',
    'https://picsum.photos/seed/fortune/400/300',
    'fortune'
);

-- 타로 상담 테스트
SELECT add_test_card(
    '타로 상담 테스트',
    '타로카드가 말해주는 당신의 운명은? 지금 이 순간 당신에게 필요한 타로 메시지를 받아보세요!',
    'https://picsum.photos/seed/tarot/400/300',
    'fortune'
);

-- 사회성 성격 테스트
SELECT add_test_card(
    '사회성 성격 테스트',
    '당신은 어떤 사회적 성향을 가지고 있나요? 대인관계 속 당신의 모습을 알아봅니다.',
    'https://picsum.photos/seed/social/400/300',
    'personality'
);

-- 다중 성격 테스트
SELECT add_test_card(
    '다중 성격 테스트',
    '당신 안에는 몇 개의 성격이 있나요? 숨겨진 다양한 성격을 찾아보세요!',
    'https://picsum.photos/seed/multiple/400/300',
    'personality'
);

-- 힐링 모먼트 테스트
SELECT add_test_card(
    '힐링 모먼트 테스트',
    '지금 이 순간, 당신에게 필요한 힐링은 무엇일까요? 마음의 안정을 찾아주는 힐링 처방전!',
    'https://picsum.photos/seed/healing/400/300',
    'healing'
);

-- 썸 스타일 테스트
SELECT add_test_card(
    '썸 스타일 테스트',
    '당신의 연애 시그널은? 썸 탈 때 보이는 당신만의 매력을 알아보세요!',
    'https://picsum.photos/seed/flirting/400/300',
    'relationship'
);

-- 티 파워 테스트
SELECT add_test_card(
    '티 파워: 당신의 잠재력은?',
    '차 한잔으로 알아보는 당신의 숨겨진 잠재력! 어떤 차의 기운을 가지고 있나요?',
    'https://picsum.photos/seed/t-power/400/300',
    'healing'
);

-- 퍼스널 컬러 테스트
SELECT add_test_card(
    '퍼스널 컬러 테스트',
    '당신에게 어울리는 색은 무엇일까요? 퍼스널 컬러로 알아보는 나만의 매력 색깔!',
    'https://picsum.photos/seed/personal-color/400/300',
    'ability'
);

-- 색맹 테스트
SELECT add_test_card(
    '색맹 테스트',
    '당신의 색채 감각은 어떤가요? 간단한 테스트로 알아보는 나의 색채 감각!',
    'https://picsum.photos/seed/color-blindness/400/300',
    'ability'
);

-- 함수 삭제
DROP FUNCTION IF EXISTS add_test_card(TEXT, TEXT, TEXT, TEXT);

-- 테스트 카드 개수 확인
SELECT COUNT(*) FROM public.test_cards;
SELECT COUNT(*) FROM public.test_card_stats;
SELECT COUNT(*) FROM public.test_categories;
SELECT COUNT(*) FROM public.test_card_categories; 