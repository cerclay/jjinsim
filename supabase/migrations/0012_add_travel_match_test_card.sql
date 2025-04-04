-- 기존 테스트 카드 테이블에 travel-match 테스트 추가
INSERT INTO public.test_card_stats (
  id,
  title,
  description,
  thumbnail_url,
  participation_count,
  like_count,
  is_active,
  duration,
  category,
  created_at,
  updated_at
) 
VALUES (
  'travel-match',
  '나랑 잘 맞는 여행지는?',
  '12개의 질문으로 알아보는 당신의 여행 궁합! 지금 바로 확인해보세요!',
  'https://picsum.photos/id/1052/1200/600',
  5432,  -- 초기 참여자 수
  245,   -- 초기 좋아요 수
  true,  -- 활성화 상태
  '3분',  -- 테스트 소요 시간
  'personality',  -- 테스트 카테고리
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE 
SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  thumbnail_url = EXCLUDED.thumbnail_url,
  is_active = EXCLUDED.is_active,
  duration = EXCLUDED.duration,
  category = EXCLUDED.category,
  updated_at = CURRENT_TIMESTAMP;

-- 이미 test_cards 테이블과 test_card_categories 테이블이 있는 경우 추가
DO $$
DECLARE
  v_test_card_id UUID;
  v_category_id UUID;
BEGIN
  -- test_cards 테이블이 존재하는지 확인
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'test_cards') THEN
    -- 기존 test_cards 테이블에 레코드 추가
    INSERT INTO public.test_cards (title, description, thumbnail_url)
    VALUES (
      '나랑 잘 맞는 여행지는?',
      '12개의 질문으로 알아보는 당신의 여행 궁합! 지금 바로 확인해보세요!',
      'https://picsum.photos/id/1052/1200/600'
    )
    ON CONFLICT (title) DO UPDATE
    SET 
      description = EXCLUDED.description,
      thumbnail_url = EXCLUDED.thumbnail_url,
      updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO v_test_card_id;
    
    -- test_categories 테이블에서 personality 카테고리 ID 찾기
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'test_categories') THEN
      SELECT id INTO v_category_id FROM public.test_categories WHERE name = 'personality';
      
      -- 카테고리 연결 (존재하는 경우)
      IF v_category_id IS NOT NULL AND v_test_card_id IS NOT NULL THEN
        INSERT INTO public.test_card_categories (test_card_id, category_id)
        VALUES (v_test_card_id, v_category_id)
        ON CONFLICT (test_card_id, category_id) DO NOTHING;
      END IF;
    END IF;
  END IF;
END $$; 