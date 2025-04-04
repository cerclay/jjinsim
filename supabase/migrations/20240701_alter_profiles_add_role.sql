-- Description: 프로필 테이블에 role 필드 추가 및 관리자 계정 생성
-- Created at: 2024-07-01

-- 프로필 테이블이 없는 경우를 대비하여 CREATE IF NOT EXISTS로 시작
DO $$
BEGIN
    -- profiles 테이블 존재 여부 확인
    IF NOT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'profiles'
    ) THEN
        -- profiles 테이블 생성
        CREATE TABLE public.profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            email TEXT UNIQUE,
            first_name TEXT,
            last_name TEXT,
            avatar_url TEXT,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );
    END IF;

    -- role 칼럼이 이미 존재하는지 확인
    IF NOT EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'profiles'
        AND column_name = 'role'
    ) THEN
        -- role 칼럼 추가
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';
        
        -- 칼럼에 주석 추가
        COMMENT ON COLUMN public.profiles.role IS '사용자 권한 (admin, user)';
    END IF;
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error occurred: %', SQLERRM;
END $$;

-- Updated_at 트리거 함수가 없을 경우 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거가 없을 경우에만 생성
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_trigger
        WHERE tgname = 'set_profiles_updated_at'
    ) THEN
        CREATE TRIGGER set_profiles_updated_at
        BEFORE UPDATE ON public.profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating trigger: %', SQLERRM;
END $$;

-- RLS 정책 설정
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 후 재생성
DO $$
BEGIN
    -- 기존 정책이 있으면 삭제
    DROP POLICY IF EXISTS profiles_select_policy ON public.profiles;
    DROP POLICY IF EXISTS profiles_insert_policy ON public.profiles;
    DROP POLICY IF EXISTS profiles_update_policy ON public.profiles;
    DROP POLICY IF EXISTS profiles_admin_policy ON public.profiles;
    
    -- 모든 사용자가 프로필 조회 가능
    CREATE POLICY profiles_select_policy ON public.profiles
        FOR SELECT USING (true);
    
    -- 자신의 프로필만 삽입 가능
    CREATE POLICY profiles_insert_policy ON public.profiles
        FOR INSERT WITH CHECK (auth.uid() = id);
    
    -- 자신의 프로필만 업데이트 가능
    CREATE POLICY profiles_update_policy ON public.profiles
        FOR UPDATE USING (auth.uid() = id);
    
    -- 관리자는 모든 작업 가능
    CREATE POLICY profiles_admin_policy ON public.profiles
        FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
        
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error while managing policies: %', SQLERRM;
END $$;

-- 관리자 계정 생성 함수
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS TEXT AS $$
DECLARE
    admin_id UUID;
    admin_exists BOOLEAN;
BEGIN
    -- 이미 admin@example.com 사용자가 있는지 확인
    SELECT EXISTS (
        SELECT 1 FROM auth.users WHERE email = 'admin@example.com'
    ) INTO admin_exists;
    
    IF admin_exists THEN
        -- 관리자 계정이 이미 존재하면 role 업데이트
        UPDATE public.profiles
        SET role = 'admin'
        WHERE email = 'admin@example.com';
        
        RETURN 'Admin user already exists, role updated to admin';
    ELSE
        -- 관리자 계정 생성 (이 부분은 직접 실행할 수 없으므로 지침만 표시)
        RETURN 'Please create an admin user with email admin@example.com using Supabase dashboard or auth.admin_createuser function, then update the role to admin in the profiles table';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 함수 실행 (참고용, 실제로는 수동 설정 필요)
SELECT create_admin_user(); 