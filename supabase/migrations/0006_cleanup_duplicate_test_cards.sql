-- Clean up duplicate test cards
WITH duplicates AS (
    SELECT title,
           id::text,
           ROW_NUMBER() OVER (PARTITION BY title ORDER BY created_at DESC) as rn
    FROM public.test_cards
)
DELETE FROM public.test_card_categories
WHERE test_card_id IN (
    SELECT id::uuid
    FROM duplicates 
    WHERE rn > 1
);

WITH duplicates AS (
    SELECT title,
           id::text,
           ROW_NUMBER() OVER (PARTITION BY title ORDER BY created_at DESC) as rn
    FROM public.test_cards
)
DELETE FROM public.test_card_stats
WHERE id IN (
    SELECT id
    FROM duplicates 
    WHERE rn > 1
);

WITH duplicates AS (
    SELECT title,
           id,
           ROW_NUMBER() OVER (PARTITION BY title ORDER BY created_at DESC) as rn
    FROM public.test_cards
)
DELETE FROM public.test_cards
WHERE id IN (
    SELECT id
    FROM duplicates 
    WHERE rn > 1
); 