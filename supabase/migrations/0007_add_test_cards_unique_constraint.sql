-- Drop existing constraint if exists
ALTER TABLE IF EXISTS public.test_cards DROP CONSTRAINT IF EXISTS test_cards_title_key;

-- 기존 테이블 삭제
DROP TABLE IF EXISTS public.test_card_categories CASCADE;
DROP TABLE IF EXISTS public.test_card_stats CASCADE;
DROP TABLE IF EXISTS public.test_cards CASCADE;
DROP TABLE IF EXISTS public.test_categories CASCADE; 