-- 인기 테스트와 신규 테스트 정렬을 위한 최적화 마이그레이션
BEGIN;

-- PostgreSQL에서 안전하게 인덱스 및 뷰 생성
DO $$
BEGIN
    -- 테이블 존재 여부 확인
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tests') THEN
        -- 테스트 테이블에 인덱스 추가
        -- 새로운 테스트를 생성 날짜순으로 정렬하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_created_at') THEN
            CREATE INDEX idx_tests_created_at ON tests(created_at DESC);
        END IF;

        -- 인기 테스트 필터링을 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_popular') THEN
            CREATE INDEX idx_tests_is_popular ON tests(isPopular) WHERE isPopular = TRUE;
        END IF;

        -- 신규 테스트 필터링을 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_new') THEN
            CREATE INDEX idx_tests_is_new ON tests(isNew) WHERE isNew = TRUE;
        END IF;

        -- 인기 테스트와 신규 테스트를 동시에 필터링하기 위한 복합 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_popular_created_at') THEN
            CREATE INDEX idx_tests_is_popular_created_at ON tests(isPopular, created_at DESC);
        END IF;

        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_new_created_at') THEN
            CREATE INDEX idx_tests_is_new_created_at ON tests(isNew, created_at DESC);
        END IF;
    ELSE
        RAISE NOTICE 'tests 테이블이 존재하지 않습니다. 테이블을 먼저 생성하세요.';
    END IF;

    -- test_participants 테이블 존재 여부 확인
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'test_participants') THEN
        -- 테스트 참여 테이블에 인덱스 추가
        -- 테스트 ID로 참여자 수를 쉽게 계산하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participants_test_id') THEN
            CREATE INDEX idx_test_participants_test_id ON test_participants(test_id);
        END IF;

        -- 최근 테스트 참여를 확인하기 위한 생성 날짜 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participants_created_at') THEN
            CREATE INDEX idx_test_participants_created_at ON test_participants(created_at DESC);
        END IF;
    ELSE
        RAISE NOTICE 'test_participants 테이블이 존재하지 않습니다. 테이블을 먼저 생성하세요.';
    END IF;

    -- 테스트 통계 뷰 업데이트 (기존 뷰를 대체)
    -- tests 테이블이 존재하는 경우에만 뷰 만들기
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tests') AND 
       EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'test_participants') THEN
        CREATE OR REPLACE VIEW test_statistics AS
        SELECT 
          t.id,
          t.title,
          t.description,
          t.imageUrl,
          t.duration,
          t.isPopular,
          t.isNew,
          t.category,
          t.created_at,
          t.updated_at,
          COUNT(tp.id) AS participants_count,
          COALESCE(AVG(tp.satisfaction_rating), 0) AS avg_satisfaction,
          COUNT(CASE WHEN tp.created_at > CURRENT_TIMESTAMP - INTERVAL '7 days' THEN 1 END) AS participants_last_7_days
        FROM tests t
        LEFT JOIN test_participants tp ON t.id = tp.test_id
        GROUP BY t.id, t.title, t.description, t.imageUrl, t.duration, t.isPopular, t.isNew, t.category, t.created_at, t.updated_at;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'SQL 오류 발생: %', SQLERRM;
END $$;

COMMIT; 