-- 기억력 테스트 카테고리 등록
INSERT INTO public.test_categories (
    id,
    name,
    display_name,
    description,
    created_at,
    updated_at
)
VALUES (
    'memory',
    'memory',
    '기억력',
    '기억력과 관련된 테스트들을 모아놓은 카테고리입니다.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (id) DO NOTHING;

-- 기억력 테스트 카드 등록
INSERT INTO public.test_cards (
    id,
    title,
    description,
    thumbnail_url,
    created_at,
    updated_at
)
VALUES (
    'memory-test-1',
    '기억력 지수 테스트',
    '12문제로 당신의 뇌 메모리를 테스트합니다. 감성 저장소인지, 금붕어인지 직접 확인해보세요!',
    'https://picsum.photos/seed/memory-test/400/300',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (id) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    thumbnail_url = EXCLUDED.thumbnail_url,
    updated_at = CURRENT_TIMESTAMP;

-- 기억력 테스트와 카테고리 연결
INSERT INTO public.test_card_categories (
    test_card_id,
    category_id,
    created_at,
    updated_at
)
VALUES (
    'memory-test-1',
    'memory',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (test_card_id, category_id) DO NOTHING;

-- 기억력 테스트 통계 데이터 초기화
INSERT INTO public.test_card_stats (
    id,
    title,
    description,
    thumbnail_url,
    participation_count,
    like_count,
    created_at,
    updated_at
)
VALUES (
    'memory-test-1',
    '기억력 지수 테스트',
    '12문제로 당신의 뇌 메모리를 테스트합니다. 감성 저장소인지, 금붕어인지 직접 확인해보세요!',
    'https://picsum.photos/seed/memory-test/400/300',
    0,
    0,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (id) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    thumbnail_url = EXCLUDED.thumbnail_url,
    updated_at = CURRENT_TIMESTAMP;

-- 초기 참여 데이터 생성
INSERT INTO test_participants (test_id, completed, satisfaction_rating)
SELECT 'memory-test-1', TRUE, (RANDOM() * 4 + 1)::INTEGER
FROM generate_series(1, 10); 