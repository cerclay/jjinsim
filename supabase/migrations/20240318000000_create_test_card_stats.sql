-- Create test_card_stats table
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

-- Add RLS policies
ALTER TABLE public.test_card_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
ON public.test_card_stats
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to update participation count and likes
CREATE POLICY "Allow authenticated users to update stats"
ON public.test_card_stats
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_test_card_stats_updated_at
    BEFORE UPDATE ON public.test_card_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 