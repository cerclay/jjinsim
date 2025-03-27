-- 인기 카테고리를 가져오는 함수
CREATE OR REPLACE FUNCTION get_popular_categories()
RETURNS TABLE (
    id UUID,
    name TEXT,
    display_name TEXT,
    test_count BIGINT
) LANGUAGE SQL AS $$
    SELECT 
        tc.id,
        tc.name,
        tc.display_name,
        COUNT(tcc.test_card_id) AS test_count
    FROM 
        public.test_categories tc
    LEFT JOIN 
        public.test_card_categories tcc ON tc.id = tcc.category_id
    GROUP BY 
        tc.id, tc.name, tc.display_name
    ORDER BY 
        test_count DESC;
$$;

-- 참여 수가 가장 많은 테스트 카드를 가져오는 함수
CREATE OR REPLACE FUNCTION get_most_participated_tests(limit_count INTEGER)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    thumbnail_url TEXT,
    tags TEXT[],
    participation_count BIGINT,
    created_at TIMESTAMPTZ
) LANGUAGE SQL AS $$
    SELECT 
        tc.id,
        tc.title,
        tc.description,
        tc.thumbnail_url,
        tc.tags,
        COUNT(tp.id) AS participation_count,
        tc.created_at
    FROM 
        public.test_cards tc
    LEFT JOIN 
        public.test_participations tp ON tc.id = tp.test_card_id
    GROUP BY 
        tc.id, tc.title, tc.description, tc.thumbnail_url, tc.tags, tc.created_at
    ORDER BY 
        participation_count DESC
    LIMIT limit_count;
$$; 