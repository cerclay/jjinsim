-- 테이블 이름 불일치 및 중복 문제 해결 마이그레이션
BEGIN;

DO $$
DECLARE
    test_cards_exists BOOLEAN;
    test_participations_exists BOOLEAN;
    tests_exists BOOLEAN;
    test_participants_exists BOOLEAN;
    test_card_stats_exists BOOLEAN;
    test_card_stats_is_view BOOLEAN;
BEGIN
    -- 테이블 존재 여부 확인
    SELECT EXISTS(SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'test_cards') INTO test_cards_exists;
    SELECT EXISTS(SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'test_participations') INTO test_participations_exists;
    SELECT EXISTS(SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tests') INTO tests_exists;
    SELECT EXISTS(SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'test_participants') INTO test_participants_exists;
    SELECT EXISTS(SELECT FROM pg_catalog.pg_class c 
                  JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
                  WHERE n.nspname = 'public' AND c.relname = 'test_card_stats') INTO test_card_stats_exists;
    
    -- test_card_stats가 뷰인지 테이블인지 확인
    IF test_card_stats_exists THEN
        SELECT EXISTS(SELECT FROM pg_catalog.pg_class c 
                      JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
                      WHERE n.nspname = 'public' AND c.relname = 'test_card_stats' AND c.relkind = 'v') 
        INTO test_card_stats_is_view;
    END IF;
    
    RAISE NOTICE '테이블 존재 여부 확인:';
    RAISE NOTICE 'test_cards: %, tests: %, test_participations: %, test_participants: %, test_card_stats: % (뷰: %)', 
        test_cards_exists, tests_exists, test_participations_exists, test_participants_exists, test_card_stats_exists, test_card_stats_is_view;
    
    -- 1. 테이블 이름 동기화 (test_cards → tests 또는 그 반대로)
    IF test_cards_exists AND NOT tests_exists THEN
        -- test_cards를 사용하고 있고 tests가 없는 경우, 코드를 수정해야 함
        RAISE NOTICE 'test_cards 테이블이 존재하고 tests 테이블이 없습니다. 뷰를 생성해 호환성을 유지합니다.';
        
        -- 뷰를 생성하여 tests라는 이름으로 test_cards에 접근할 수 있게 함
        EXECUTE 'CREATE OR REPLACE VIEW tests AS SELECT * FROM test_cards';
    ELSIF tests_exists AND NOT test_cards_exists THEN
        -- tests를 사용하고 있고 test_cards가 없는 경우
        RAISE NOTICE 'tests 테이블이 존재하고 test_cards 테이블이 없습니다. 뷰를 생성해 호환성을 유지합니다.';
        
        -- 뷰를 생성하여 test_cards라는 이름으로 tests에 접근할 수 있게 함
        EXECUTE 'CREATE OR REPLACE VIEW test_cards AS SELECT * FROM tests';
    ELSIF tests_exists AND test_cards_exists THEN
        -- 둘 다 존재하는 경우 - 데이터 충돌 가능성 확인
        RAISE NOTICE '주의: tests와 test_cards 테이블이 모두 존재합니다. 데이터 통합이 필요할 수 있습니다.';
    END IF;
    
    -- 2. 테이블 이름 동기화 (test_participations → test_participants 또는 그 반대로)
    IF test_participations_exists AND NOT test_participants_exists THEN
        -- test_participations를 사용하고 있고 test_participants가 없는 경우
        RAISE NOTICE 'test_participations 테이블이 존재하고 test_participants 테이블이 없습니다. 뷰를 생성해 호환성을 유지합니다.';
        
        -- 뷰를 생성하여 test_participants라는 이름으로 test_participations에 접근할 수 있게 함
        EXECUTE 'CREATE OR REPLACE VIEW test_participants AS SELECT * FROM test_participations';
    ELSIF test_participants_exists AND NOT test_participations_exists THEN
        -- test_participants를 사용하고 있고 test_participations가 없는 경우
        RAISE NOTICE 'test_participants 테이블이 존재하고 test_participations 테이블이 없습니다. 뷰를 생성해 호환성을 유지합니다.';
        
        -- 뷰를 생성하여 test_participations라는 이름으로 test_participants에 접근할 수 있게 함
        EXECUTE 'CREATE OR REPLACE VIEW test_participations AS SELECT * FROM test_participants';
    ELSIF test_participants_exists AND test_participations_exists THEN
        -- 둘 다 존재하는 경우 - 데이터 충돌 가능성 확인
        RAISE NOTICE '주의: test_participants와 test_participations 테이블이 모두 존재합니다. 데이터 통합이 필요할 수 있습니다.';
    END IF;
    
    -- 중복 테이블 처리 (test_cards와 test_card_stats)
    IF test_cards_exists AND test_card_stats_exists THEN
        IF test_card_stats_is_view THEN
            -- test_card_stats가 뷰인 경우 안전하게 삭제 가능
            RAISE NOTICE 'test_card_stats는 뷰입니다. 기존 뷰를 업데이트합니다.';
            EXECUTE 'CREATE OR REPLACE VIEW test_card_stats AS SELECT * FROM test_cards WITH SECURITY INVOKER';
        ELSE
            -- test_card_stats가 테이블인 경우 - 참조 관계 확인 필요
            RAISE NOTICE '주의: test_cards와 test_card_stats가 모두 테이블로 존재합니다. 중복 데이터일 수 있습니다.';
            -- 안전을 위해 테이블은 직접 삭제하지 않고, 뷰로 교체하는 방안만 제안
            RAISE NOTICE '두 테이블이 동일하다면 다음 SQL 명령어로 test_card_stats를 삭제할 수 있습니다:';
            RAISE NOTICE 'DROP TABLE IF EXISTS test_card_stats; CREATE VIEW test_card_stats AS SELECT * FROM test_cards;';
        END IF;
    END IF;
    
    -- 3. 테스트 통계 뷰 생성 또는 업데이트
    -- tests 또는 test_cards 중 하나만 존재하여 실제로 데이터를 저장하는 테이블 확인
    DECLARE
        data_table_name TEXT;
        participation_table_name TEXT;
    BEGIN
        IF tests_exists THEN
            data_table_name := 'tests';
        ELSIF test_cards_exists THEN
            data_table_name := 'test_cards';
        ELSE
            RAISE EXCEPTION '테스트 데이터를 저장할 테이블이 없습니다.';
        END IF;
        
        IF test_participants_exists THEN
            participation_table_name := 'test_participants';
        ELSIF test_participations_exists THEN
            participation_table_name := 'test_participations';
        ELSE
            RAISE EXCEPTION '테스트 참여 데이터를 저장할 테이블이 없습니다.';
        END IF;
        
        -- 통합 테스트 통계 뷰 생성
        EXECUTE format('
            CREATE OR REPLACE VIEW test_statistics AS
            SELECT 
              t.id,
              t.title,
              t.description,
              CASE 
                WHEN t.imageUrl IS NOT NULL THEN t.imageUrl 
                WHEN t.image_url IS NOT NULL THEN t.image_url
                ELSE NULL 
              END as imageUrl,
              CASE 
                WHEN t.duration IS NOT NULL THEN t.duration 
                ELSE 120 
              END as duration,
              CASE 
                WHEN t.isPopular IS NOT NULL THEN t.isPopular 
                WHEN t.is_popular IS NOT NULL THEN t.is_popular
                ELSE FALSE 
              END as isPopular,
              CASE 
                WHEN t.isNew IS NOT NULL THEN t.isNew 
                WHEN t.is_new IS NOT NULL THEN t.is_new
                ELSE FALSE 
              END as isNew,
              t.category,
              t.created_at,
              t.updated_at,
              COUNT(tp.id) AS participants_count,
              COALESCE(AVG(tp.satisfaction_rating), 0) AS avg_satisfaction,
              COUNT(CASE WHEN tp.created_at > CURRENT_TIMESTAMP - INTERVAL ''7 days'' THEN 1 END) AS participants_last_7_days
            FROM %I t
            LEFT JOIN %I tp ON t.id = tp.test_id
            GROUP BY t.id, t.title, t.description, t.imageUrl, t.image_url, t.duration, t.isPopular, t.is_popular, t.isNew, t.is_new, t.category, t.created_at, t.updated_at
        ', data_table_name, participation_table_name);
        
        RAISE NOTICE '통합 테스트 통계 뷰가 생성되었습니다. 데이터 테이블: %, 참여 테이블: %', data_table_name, participation_table_name;
    END;
    
    -- 4. 테이블 인덱스 최적화
    -- 데이터가 저장된 실제 테이블에 인덱스 생성 (기존 마이그레이션 최적화 수행)
    -- test_cards 테이블 최적화
    IF test_cards_exists THEN
        -- 새로운 테스트를 생성 날짜순으로 정렬하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_cards_created_at ON test_cards(created_at DESC)';
        END IF;

        -- 컬럼 이름이 snake_case인지 camelCase인지 확인하고 인덱스 생성
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'is_popular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_popular') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_popular ON test_cards(is_popular) WHERE is_popular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_popular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_popular_created_at ON test_cards(is_popular, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'isPopular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isPopular') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isPopular ON test_cards(isPopular) WHERE isPopular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isPopular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isPopular_created_at ON test_cards(isPopular, created_at DESC)';
            END IF;
        END IF;
        
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'is_new') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_new') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_new ON test_cards(is_new) WHERE is_new = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_new_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_new_created_at ON test_cards(is_new, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'isNew') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isNew') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isNew ON test_cards(isNew) WHERE isNew = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isNew_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isNew_created_at ON test_cards(isNew, created_at DESC)';
            END IF;
        END IF;
    END IF;
    
    -- tests 테이블 최적화
    IF tests_exists THEN
        -- 새로운 테스트를 생성 날짜순으로 정렬하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_created_at') THEN
            EXECUTE 'CREATE INDEX idx_tests_created_at ON tests(created_at DESC)';
        END IF;

        -- 인기 테스트 필터링을 위한 인덱스
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'isPopular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isPopular') THEN
                EXECUTE 'CREATE INDEX idx_tests_isPopular ON tests(isPopular) WHERE isPopular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isPopular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_isPopular_created_at ON tests(isPopular, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'is_popular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_popular') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_popular ON tests(is_popular) WHERE is_popular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_popular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_popular_created_at ON tests(is_popular, created_at DESC)';
            END IF;
        END IF;
        
        -- 신규 테스트 필터링을 위한 인덱스
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'isNew') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isNew') THEN
                EXECUTE 'CREATE INDEX idx_tests_isNew ON tests(isNew) WHERE isNew = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isNew_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_isNew_created_at ON tests(isNew, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'is_new') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_new') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_new ON tests(is_new) WHERE is_new = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_new_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_new_created_at ON tests(is_new, created_at DESC)';
            END IF;
        END IF;
    END IF;
    
    -- test_participations 테이블 최적화
    IF test_participations_exists THEN
        -- 테스트 ID로 참여자 수를 쉽게 계산하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participations_test_id') THEN
            EXECUTE 'CREATE INDEX idx_test_participations_test_id ON test_participations(test_id)';
        END IF;

        -- 최근 테스트 참여를 확인하기 위한 생성 날짜 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participations_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_participations_created_at ON test_participations(created_at DESC)';
        END IF;
    END IF;
    
    -- test_participants 테이블 최적화
    IF test_participants_exists THEN
        -- 테스트 ID로 참여자 수를 쉽게 계산하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participants_test_id') THEN
            EXECUTE 'CREATE INDEX idx_test_participants_test_id ON test_participants(test_id)';
        END IF;

        -- 최근 테스트 참여를 확인하기 위한 생성 날짜 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participants_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_participants_created_at ON test_participants(created_at DESC)';
        END IF;
    END IF;
    
    -- 함수 보안 취약점 해결을 위한 수정
    IF EXISTS (SELECT FROM pg_proc WHERE proname = 'get_most_participated_tests') THEN
        -- 함수 재정의하여 보안 취약점 해결
        EXECUTE '
        CREATE OR REPLACE FUNCTION public.get_most_participated_tests()
        RETURNS TABLE(id text, title text, participants_count bigint) 
        LANGUAGE sql
        SECURITY INVOKER
        STABLE
        AS $func$
            SELECT t.id, t.title, COUNT(tp.*) as participants_count
            FROM test_cards t
            LEFT JOIN test_participations tp ON t.id = tp.test_id
            GROUP BY t.id, t.title
            ORDER BY participants_count DESC
            LIMIT 10;
        $func$;
        ';
        
        RAISE NOTICE 'get_most_participated_tests 함수가 보안 취약점을 해결하도록 업데이트되었습니다.';
    END IF;
    
    -- 4. 테이블 인덱스 최적화
    -- 데이터가 저장된 실제 테이블에 인덱스 생성 (기존 마이그레이션 최적화 수행)
    -- test_cards 테이블 최적화
    IF test_cards_exists THEN
        -- 새로운 테스트를 생성 날짜순으로 정렬하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_cards_created_at ON test_cards(created_at DESC)';
        END IF;

        -- 컬럼 이름이 snake_case인지 camelCase인지 확인하고 인덱스 생성
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'is_popular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_popular') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_popular ON test_cards(is_popular) WHERE is_popular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_popular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_popular_created_at ON test_cards(is_popular, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'isPopular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isPopular') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isPopular ON test_cards(isPopular) WHERE isPopular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isPopular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isPopular_created_at ON test_cards(isPopular, created_at DESC)';
            END IF;
        END IF;
        
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'is_new') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_new') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_new ON test_cards(is_new) WHERE is_new = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_new_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_new_created_at ON test_cards(is_new, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'isNew') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isNew') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isNew ON test_cards(isNew) WHERE isNew = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isNew_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isNew_created_at ON test_cards(isNew, created_at DESC)';
            END IF;
        END IF;
    END IF;
    
    -- tests 테이블 최적화
    IF tests_exists THEN
        -- 새로운 테스트를 생성 날짜순으로 정렬하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_created_at') THEN
            EXECUTE 'CREATE INDEX idx_tests_created_at ON tests(created_at DESC)';
        END IF;

        -- 인기 테스트 필터링을 위한 인덱스
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'isPopular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isPopular') THEN
                EXECUTE 'CREATE INDEX idx_tests_isPopular ON tests(isPopular) WHERE isPopular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isPopular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_isPopular_created_at ON tests(isPopular, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'is_popular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_popular') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_popular ON tests(is_popular) WHERE is_popular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_popular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_popular_created_at ON tests(is_popular, created_at DESC)';
            END IF;
        END IF;
        
        -- 신규 테스트 필터링을 위한 인덱스
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'isNew') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isNew') THEN
                EXECUTE 'CREATE INDEX idx_tests_isNew ON tests(isNew) WHERE isNew = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isNew_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_isNew_created_at ON tests(isNew, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'is_new') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_new') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_new ON tests(is_new) WHERE is_new = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_new_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_new_created_at ON tests(is_new, created_at DESC)';
            END IF;
        END IF;
    END IF;
    
    -- test_participations 테이블 최적화
    IF test_participations_exists THEN
        -- 테스트 ID로 참여자 수를 쉽게 계산하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participations_test_id') THEN
            EXECUTE 'CREATE INDEX idx_test_participations_test_id ON test_participations(test_id)';
        END IF;

        -- 최근 테스트 참여를 확인하기 위한 생성 날짜 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participations_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_participations_created_at ON test_participations(created_at DESC)';
        END IF;
    END IF;
    
    -- test_participants 테이블 최적화
    IF test_participants_exists THEN
        -- 테스트 ID로 참여자 수를 쉽게 계산하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participants_test_id') THEN
            EXECUTE 'CREATE INDEX idx_test_participants_test_id ON test_participants(test_id)';
        END IF;

        -- 최근 테스트 참여를 확인하기 위한 생성 날짜 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participants_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_participants_created_at ON test_participants(created_at DESC)';
        END IF;
    END IF;
    
    -- 함수 보안 취약점 해결을 위한 수정
    IF EXISTS (SELECT FROM pg_proc WHERE proname = 'get_most_participated_tests') THEN
        -- 함수 재정의하여 보안 취약점 해결
        EXECUTE '
        CREATE OR REPLACE FUNCTION public.get_most_participated_tests()
        RETURNS TABLE(id text, title text, participants_count bigint) 
        LANGUAGE sql
        SECURITY INVOKER
        STABLE
        AS $func$
            SELECT t.id, t.title, COUNT(tp.*) as participants_count
            FROM test_cards t
            LEFT JOIN test_participations tp ON t.id = tp.test_id
            GROUP BY t.id, t.title
            ORDER BY participants_count DESC
            LIMIT 10;
        $func$;
        ';
        
        RAISE NOTICE 'get_most_participated_tests 함수가 보안 취약점을 해결하도록 업데이트되었습니다.';
    END IF;
    
    -- 4. 테이블 인덱스 최적화
    -- 데이터가 저장된 실제 테이블에 인덱스 생성 (기존 마이그레이션 최적화 수행)
    -- test_cards 테이블 최적화
    IF test_cards_exists THEN
        -- 새로운 테스트를 생성 날짜순으로 정렬하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_cards_created_at ON test_cards(created_at DESC)';
        END IF;

        -- 컬럼 이름이 snake_case인지 camelCase인지 확인하고 인덱스 생성
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'is_popular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_popular') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_popular ON test_cards(is_popular) WHERE is_popular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_popular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_popular_created_at ON test_cards(is_popular, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'isPopular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isPopular') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isPopular ON test_cards(isPopular) WHERE isPopular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isPopular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isPopular_created_at ON test_cards(isPopular, created_at DESC)';
            END IF;
        END IF;
        
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'is_new') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_new') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_new ON test_cards(is_new) WHERE is_new = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_new_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_new_created_at ON test_cards(is_new, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'isNew') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isNew') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isNew ON test_cards(isNew) WHERE isNew = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isNew_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isNew_created_at ON test_cards(isNew, created_at DESC)';
            END IF;
        END IF;
    END IF;
    
    -- tests 테이블 최적화
    IF tests_exists THEN
        -- 새로운 테스트를 생성 날짜순으로 정렬하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_created_at') THEN
            EXECUTE 'CREATE INDEX idx_tests_created_at ON tests(created_at DESC)';
        END IF;

        -- 인기 테스트 필터링을 위한 인덱스
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'isPopular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isPopular') THEN
                EXECUTE 'CREATE INDEX idx_tests_isPopular ON tests(isPopular) WHERE isPopular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isPopular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_isPopular_created_at ON tests(isPopular, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'is_popular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_popular') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_popular ON tests(is_popular) WHERE is_popular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_popular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_popular_created_at ON tests(is_popular, created_at DESC)';
            END IF;
        END IF;
        
        -- 신규 테스트 필터링을 위한 인덱스
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'isNew') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isNew') THEN
                EXECUTE 'CREATE INDEX idx_tests_isNew ON tests(isNew) WHERE isNew = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isNew_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_isNew_created_at ON tests(isNew, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'is_new') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_new') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_new ON tests(is_new) WHERE is_new = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_new_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_new_created_at ON tests(is_new, created_at DESC)';
            END IF;
        END IF;
    END IF;
    
    -- test_participations 테이블 최적화
    IF test_participations_exists THEN
        -- 테스트 ID로 참여자 수를 쉽게 계산하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participations_test_id') THEN
            EXECUTE 'CREATE INDEX idx_test_participations_test_id ON test_participations(test_id)';
        END IF;

        -- 최근 테스트 참여를 확인하기 위한 생성 날짜 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participations_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_participations_created_at ON test_participations(created_at DESC)';
        END IF;
    END IF;
    
    -- test_participants 테이블 최적화
    IF test_participants_exists THEN
        -- 테스트 ID로 참여자 수를 쉽게 계산하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participants_test_id') THEN
            EXECUTE 'CREATE INDEX idx_test_participants_test_id ON test_participants(test_id)';
        END IF;

        -- 최근 테스트 참여를 확인하기 위한 생성 날짜 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participants_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_participants_created_at ON test_participants(created_at DESC)';
        END IF;
    END IF;
    
    -- 함수 보안 취약점 해결을 위한 수정
    IF EXISTS (SELECT FROM pg_proc WHERE proname = 'get_most_participated_tests') THEN
        -- 함수 재정의하여 보안 취약점 해결
        EXECUTE '
        CREATE OR REPLACE FUNCTION public.get_most_participated_tests()
        RETURNS TABLE(id text, title text, participants_count bigint) 
        LANGUAGE sql
        SECURITY INVOKER
        STABLE
        AS $func$
            SELECT t.id, t.title, COUNT(tp.*) as participants_count
            FROM test_cards t
            LEFT JOIN test_participations tp ON t.id = tp.test_id
            GROUP BY t.id, t.title
            ORDER BY participants_count DESC
            LIMIT 10;
        $func$;
        ';
        
        RAISE NOTICE 'get_most_participated_tests 함수가 보안 취약점을 해결하도록 업데이트되었습니다.';
    END IF;
    
    -- 4. 테이블 인덱스 최적화
    -- 데이터가 저장된 실제 테이블에 인덱스 생성 (기존 마이그레이션 최적화 수행)
    -- test_cards 테이블 최적화
    IF test_cards_exists THEN
        -- 새로운 테스트를 생성 날짜순으로 정렬하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_cards_created_at ON test_cards(created_at DESC)';
        END IF;

        -- 컬럼 이름이 snake_case인지 camelCase인지 확인하고 인덱스 생성
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'is_popular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_popular') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_popular ON test_cards(is_popular) WHERE is_popular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_popular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_popular_created_at ON test_cards(is_popular, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'isPopular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isPopular') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isPopular ON test_cards(isPopular) WHERE isPopular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isPopular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isPopular_created_at ON test_cards(isPopular, created_at DESC)';
            END IF;
        END IF;
        
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'is_new') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_new') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_new ON test_cards(is_new) WHERE is_new = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_is_new_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_is_new_created_at ON test_cards(is_new, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'test_cards' AND column_name = 'isNew') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isNew') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isNew ON test_cards(isNew) WHERE isNew = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_cards_isNew_created_at') THEN
                EXECUTE 'CREATE INDEX idx_test_cards_isNew_created_at ON test_cards(isNew, created_at DESC)';
            END IF;
        END IF;
    END IF;
    
    -- tests 테이블 최적화
    IF tests_exists THEN
        -- 새로운 테스트를 생성 날짜순으로 정렬하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_created_at') THEN
            EXECUTE 'CREATE INDEX idx_tests_created_at ON tests(created_at DESC)';
        END IF;

        -- 인기 테스트 필터링을 위한 인덱스
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'isPopular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isPopular') THEN
                EXECUTE 'CREATE INDEX idx_tests_isPopular ON tests(isPopular) WHERE isPopular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isPopular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_isPopular_created_at ON tests(isPopular, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'is_popular') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_popular') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_popular ON tests(is_popular) WHERE is_popular = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_popular_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_popular_created_at ON tests(is_popular, created_at DESC)';
            END IF;
        END IF;
        
        -- 신규 테스트 필터링을 위한 인덱스
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'isNew') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isNew') THEN
                EXECUTE 'CREATE INDEX idx_tests_isNew ON tests(isNew) WHERE isNew = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_isNew_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_isNew_created_at ON tests(isNew, created_at DESC)';
            END IF;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tests' AND column_name = 'is_new') THEN
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_new') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_new ON tests(is_new) WHERE is_new = TRUE';
            END IF;
            
            IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tests_is_new_created_at') THEN
                EXECUTE 'CREATE INDEX idx_tests_is_new_created_at ON tests(is_new, created_at DESC)';
            END IF;
        END IF;
    END IF;
    
    -- test_participations 테이블 최적화
    IF test_participations_exists THEN
        -- 테스트 ID로 참여자 수를 쉽게 계산하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participations_test_id') THEN
            EXECUTE 'CREATE INDEX idx_test_participations_test_id ON test_participations(test_id)';
        END IF;

        -- 최근 테스트 참여를 확인하기 위한 생성 날짜 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participations_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_participations_created_at ON test_participations(created_at DESC)';
        END IF;
    END IF;
    
    -- test_participants 테이블 최적화
    IF test_participants_exists THEN
        -- 테스트 ID로 참여자 수를 쉽게 계산하기 위한 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participants_test_id') THEN
            EXECUTE 'CREATE INDEX idx_test_participants_test_id ON test_participants(test_id)';
        END IF;

        -- 최근 테스트 참여를 확인하기 위한 생성 날짜 인덱스
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_test_participants_created_at') THEN
            EXECUTE 'CREATE INDEX idx_test_participants_created_at ON test_participants(created_at DESC)';
        END IF;
    END IF;
    
    -- 함수 보안 취약점 해결을 위한 수정
    IF EXISTS (SELECT FROM pg_proc WHERE proname = 'get_most_participated_tests') THEN
        -- 함수 재정의하여 보안 취약점 해결
        EXECUTE '
        CREATE OR REPLACE FUNCTION public.get_most_participated_tests()
        RETURNS TABLE(id text, title text, participants_count bigint) 
        LANGUAGE sql
        SECURITY INVOKER
        STABLE
        AS $func$
            SELECT t.id, t.title, COUNT(tp.*) as participants_count
            FROM test_cards t
            LEFT JOIN test_participations tp ON t.id = tp.test_id
            GROUP BY t.id, t.title
            ORDER BY participants_count DESC
            LIMIT 10;
        $func$;
        ';
        
        RAISE NOTICE 'get_most_participated_tests 함수가 보안 취약점을 해결하도록 업데이트되었습니다.';
    END IF;
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '오류 발생: %', SQLERRM;
END $$;

COMMIT; 