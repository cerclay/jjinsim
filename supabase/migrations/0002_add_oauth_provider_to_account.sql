-- Description: Add OAuth provider columns to account table
-- Created at: 2023-12-10T00:00:00Z

DO $$
BEGIN
    -- Check if the provider column exists, if not add it
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'provider') THEN
        ALTER TABLE public.account ADD COLUMN provider VARCHAR(20);
        COMMENT ON COLUMN public.account.provider IS 'OAuth 제공자 이름 (kakao, google 등)';
    END IF;

    -- Check if the provider_id column exists, if not add it
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'provider_id') THEN
        ALTER TABLE public.account ADD COLUMN provider_id VARCHAR(255);
        COMMENT ON COLUMN public.account.provider_id IS 'OAuth 제공자의 고유 사용자 ID';
    END IF;

    -- Check if the access_token column exists, if not add it
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'access_token') THEN
        ALTER TABLE public.account ADD COLUMN access_token TEXT;
        COMMENT ON COLUMN public.account.access_token IS 'OAuth 액세스 토큰';
    END IF;

    -- Check if the refresh_token column exists, if not add it
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'refresh_token') THEN
        ALTER TABLE public.account ADD COLUMN refresh_token TEXT;
        COMMENT ON COLUMN public.account.refresh_token IS 'OAuth 리프레시 토큰';
    END IF;

    -- Check if the token_expires_at column exists, if not add it
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'token_expires_at') THEN
        ALTER TABLE public.account ADD COLUMN token_expires_at TIMESTAMP WITH TIME ZONE;
        COMMENT ON COLUMN public.account.token_expires_at IS 'OAuth 토큰 만료 시간';
    END IF;

    -- Check if the profile_image_url column exists, if not add it
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'profile_image_url') THEN
        ALTER TABLE public.account ADD COLUMN profile_image_url TEXT;
        COMMENT ON COLUMN public.account.profile_image_url IS '사용자 프로필 이미지 URL';
    END IF;

    -- Add combined unique constraint for provider and provider_id if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'account_provider_provider_id_key' 
        AND table_name = 'account'
    ) THEN
        -- 기존에 NULL이 들어있을 수 있어서, WHERE 절로 필터링
        -- 두 필드가 모두 NOT NULL인 경우에만 유니크 제약조건 적용
        EXECUTE 'CREATE UNIQUE INDEX IF NOT EXISTS account_provider_provider_id_idx 
                 ON public.account (provider, provider_id) 
                 WHERE provider IS NOT NULL AND provider_id IS NOT NULL';
    END IF;

    -- Make password optional for OAuth accounts
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'password' 
        AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE public.account ALTER COLUMN password DROP NOT NULL;
    END IF;

EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error adding OAuth columns: %', SQLERRM;
END $$; 