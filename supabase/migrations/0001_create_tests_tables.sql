-- 테스트 데이터 관리를 위한 마이그레이션 파일
-- 테스트 정보 및 참여자 수를 추적

BEGIN;

-- 테스트 기본 정보 테이블
CREATE TABLE IF NOT EXISTS tests (
  id VARCHAR(50) PRIMARY KEY, -- 테스트 고유 ID (예: 'personal-color')
  title VARCHAR(100) NOT NULL, -- 테스트 제목
  description TEXT, -- 테스트 설명
  imageUrl TEXT NOT NULL, -- 테스트 썸네일 이미지 URL
  duration INTEGER DEFAULT 120, -- 테스트 예상 소요 시간(초)
  isPopular BOOLEAN DEFAULT FALSE, -- 인기 테스트 여부
  isNew BOOLEAN DEFAULT FALSE, -- 신규 테스트 여부
  category VARCHAR(50), -- 테스트 카테고리
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 테스트 참여 정보 테이블
CREATE TABLE IF NOT EXISTS test_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id VARCHAR(50) REFERENCES tests(id) ON DELETE CASCADE,
  user_id UUID, -- 로그인한 경우 사용자 ID (익명도 허용)
  completed BOOLEAN DEFAULT FALSE, -- 테스트 완료 여부
  satisfaction_rating INTEGER, -- 만족도 평가 (1-5)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 테스트별 통계 뷰 생성
CREATE OR REPLACE VIEW test_statistics AS
SELECT 
  t.id,
  t.title,
  t.imageUrl,
  t.isPopular,
  t.isNew,
  t.category,
  COUNT(tp.id) AS participants_count,
  COALESCE(AVG(tp.satisfaction_rating), 0) AS avg_satisfaction,
  COUNT(CASE WHEN tp.created_at > CURRENT_TIMESTAMP - INTERVAL '7 days' THEN 1 END) AS participants_last_7_days
FROM tests t
LEFT JOIN test_participants tp ON t.id = tp.test_id
GROUP BY t.id, t.title, t.imageUrl, t.isPopular, t.isNew, t.category;

-- updated_at 자동 업데이트를 위한 함수 및 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 테스트 테이블에 트리거 적용
DROP TRIGGER IF EXISTS update_tests_updated_at ON tests;
CREATE TRIGGER update_tests_updated_at
BEFORE UPDATE ON tests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 초기 데이터 삽입
INSERT INTO tests (id, title, description, imageUrl, isPopular, isNew, category) 
VALUES 
  ('personal-color', '퍼스널컬러 테스트', '당신에게 어울리는 컬러를 찾아보세요', 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0', TRUE, TRUE, 'color'),
  ('marriage-type', '나의 결혼 이상형은?', '당신의 결혼 이상형을 알아보세요', 'https://blogger.googleusercontent.com/img/a/AVvXsEhoFMZ4NDds4QlotYXL6hLGY4LnRTtVJMGYvTboKMfBGfV5ztssGPqSoTLjRk-KJUUvu7ZK0I8pE7UhcXxqbJTJ0Tfb31EMatXaWJPV-9aEa13MyZ1l4sUDHucVECx0JHi_2JfKUfMqvUwEMQZish5xBUunUU6sn3wqnCgBGlqaXtfWZ8sfQHiqJ8d2sdY', TRUE, FALSE, 'relationship'),
  ('t-power', '나의 T발력 수치는?', 'T발력 수치를 측정해보세요', 'https://blogger.googleusercontent.com/img/a/AVvXsEh7QIFua8BsWGH6TugirBk5mPH9dFJ8mc8zLwGze9A8rhHhmYziqZU_vcsyZLLbcslbqNX4UlEHHn8x3GqIMFe-T9pO49Kza39vD3agjqMBlz8N8xrG6Mj_jbUjPPWcnGSVv-Fx2XfWvdjFvziNerHndLx0Pcs8OiC-uxj9QMAAG-cxXK7QjMDB2wsxi0k', TRUE, FALSE, 'personality'),
  ('tarot-consultation', '타로상담 상담가', '타로카드로 미래를 점쳐보세요', 'https://blogger.googleusercontent.com/img/a/AVvXsEj_hF5utgruPeM3jXtQ_g4rT3adEXQLLP89T8NuV7OSZdpONbuMmfrcr_1RKEgKThk3E5R2QoVl8M3crn9k-IER-AKntLOG3Yiz-UdsKzHmOX89HY0h589ifmbTAs36uR4KGSRWAAXbzeSdwdJpOji0bYiBwEU5g0oCb_676HFug_rn3_6v7RlwmE3uIUM', TRUE, FALSE, 'fortune'),
  ('fortune-telling', '사주팔자 점보기', '당신의 사주팔자를 알아보세요', 'https://blogger.googleusercontent.com/img/a/AVvXsEhYgICMS6gufZPjde9juTx81iKJbsqbm-AwwlzY4DhUwnwxoXlVzGlbv7Y2OaJ2GBFlPyc5KomVGPhI4r21g_7UjObO4sGdRgFTNVzmxvy-cX5SMuRZVPkOGCjMQMy3-waf7KhVjJyBzyqHQstrPmxAp3MbXXx05krKP9ZGBm8LFe4JqWB-AZW-sP4OJo8', TRUE, FALSE, 'fortune'),
  ('color-blindness', '색맹테스트', '당신의 색각 능력을 테스트해보세요', 'https://blogger.googleusercontent.com/img/a/AVvXsEhbZPeJZcuqhy8KNugCWNoi105MZOwUaWEoo5w2hiYj57QuYHhHaZ3jhquUQIrtj3hwXri3U4TefQdiFu07hT5ksrtwrAjmSKatGhWCpb1t-W5o_6ogCOOGfatfnYnYlZQg8p_s1QMoF0QSjjA0MNQtoDQ7nD0WH2zMQlYpkLu8tP62qpwQjcLx-ujH-Mg', TRUE, FALSE, 'health'),
  ('mbti-deep', 'MBTI 심층 분석', '당신의 MBTI 유형을 심층 분석해보세요', 'https://picsum.photos/id/1005/400/400', TRUE, TRUE, 'personality');

-- 테스트 참여 데이터 예시 (실제로는 사용자가 테스트에 참여할 때 기록됨)
INSERT INTO test_participants (test_id, completed, satisfaction_rating)
SELECT 'personal-color', TRUE, (RANDOM() * 4 + 1)::INTEGER
FROM generate_series(1, 178945);

INSERT INTO test_participants (test_id, completed, satisfaction_rating)
SELECT 'marriage-type', TRUE, (RANDOM() * 4 + 1)::INTEGER
FROM generate_series(1, 145632);

INSERT INTO test_participants (test_id, completed, satisfaction_rating)
SELECT 't-power', TRUE, (RANDOM() * 4 + 1)::INTEGER
FROM generate_series(1, 132589);

INSERT INTO test_participants (test_id, completed, satisfaction_rating)
SELECT 'tarot-consultation', TRUE, (RANDOM() * 4 + 1)::INTEGER
FROM generate_series(1, 119872);

INSERT INTO test_participants (test_id, completed, satisfaction_rating)
SELECT 'fortune-telling', TRUE, (RANDOM() * 4 + 1)::INTEGER
FROM generate_series(1, 107456);

INSERT INTO test_participants (test_id, completed, satisfaction_rating)
SELECT 'color-blindness', TRUE, (RANDOM() * 4 + 1)::INTEGER
FROM generate_series(1, 97842);

INSERT INTO test_participants (test_id, completed, satisfaction_rating)
SELECT 'mbti-deep', TRUE, (RANDOM() * 4 + 1)::INTEGER
FROM generate_series(1, 85689);

COMMIT; 