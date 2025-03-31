-- 테스트 참여 횟수를 증가시키는 함수
CREATE OR REPLACE FUNCTION increment_test_participation(test_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- test_card_stats 테이블의 participation_count 증가
    UPDATE public.test_card_stats
    SET 
        participation_count = COALESCE(participation_count, 0) + 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = test_id;
END;
$$; 