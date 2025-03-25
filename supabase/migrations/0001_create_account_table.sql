-- Description: Create account table for authentication
-- Created at: 2023-11-16T00:00:00Z

DO $$
BEGIN
    -- Create account table if it doesn't exist
    CREATE TABLE IF NOT EXISTS public.account (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        role VARCHAR(20) NOT NULL DEFAULT 'user',
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );

    -- Add comments to table and columns
    COMMENT ON TABLE public.account IS '사용자 계정 정보를 저장하는 테이블';
    COMMENT ON COLUMN public.account.id IS '고유 식별자';
    COMMENT ON COLUMN public.account.username IS '사용자 아이디';
    COMMENT ON COLUMN public.account.password IS '암호화된 비밀번호';
    COMMENT ON COLUMN public.account.email IS '이메일 주소';
    COMMENT ON COLUMN public.account.role IS '권한 (admin, user 등)';
    COMMENT ON COLUMN public.account.is_active IS '계정 활성화 상태';
    COMMENT ON COLUMN public.account.created_at IS '생성 시간';
    COMMENT ON COLUMN public.account.updated_at IS '마지막 업데이트 시간';
    
EXCEPTION WHEN OTHERS THEN
    RAISE;
END $$;

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on account table
DROP TRIGGER IF EXISTS set_updated_at ON public.account;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.account
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Row Level Security (RLS)
ALTER TABLE public.account ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 및 재생성 블록
DO $$
BEGIN
    -- 기존 정책이 있으면 삭제
    DROP POLICY IF EXISTS account_insert_policy ON public.account;
    DROP POLICY IF EXISTS admin_policy ON public.account;
    DROP POLICY IF EXISTS user_select_policy ON public.account;
    
    -- Allow anonymous insert for registration
    CREATE POLICY account_insert_policy ON public.account
        FOR INSERT
        WITH CHECK (true);
    
    -- Allow admin users to perform all operations
    CREATE POLICY admin_policy ON public.account
        FOR ALL
        USING (auth.jwt() ->> 'role' = 'admin');
    
    -- Create policy for users to see their own data
    CREATE POLICY user_select_policy ON public.account FOR SELECT
        USING (auth.uid() = id);
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error while creating policies: %', SQLERRM;
END $$;

-- Insert demo data for testing
INSERT INTO public.account (username, password, email, role)
VALUES 
    ('admin', '$2a$10$GkLq4Y1XZlzH1PjP7L9HEeF3RNINvkBge4ZWecL0c0zhIR0UXM6aO', 'admin@example.com', 'admin'),
    ('user', '$2a$10$WZj1WGAPfFl9.CFj/4qTZecXTBgbMAJpW0IEr8lrI.NDb.de0hTT2', 'user@example.com', 'user')
ON CONFLICT (username) DO NOTHING;

-- Create index for username since it will be used for login queries
CREATE INDEX IF NOT EXISTS idx_account_username ON public.account(username); 