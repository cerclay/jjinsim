-- Add unique constraint to test_cards table if not exists
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