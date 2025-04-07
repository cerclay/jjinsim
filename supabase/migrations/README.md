# Supabase 마이그레이션 파일 목록

이 디렉토리는 Supabase 데이터베이스 마이그레이션 파일이 포함되어 있습니다.

## 마이그레이션 파일 실행 순서

파일 번호 순서대로 실행해야 합니다. 가장 최신 마이그레이션은 다음과 같습니다:

### 0013_add_user_test_activities_table.sql

- **목적**: 사용자 테스트 활동 기록 테이블 추가 및 테스트 카드 순서 관리 기능 구현
- **추가된 테이블**: `user_test_activities`
- **변경사항**:
  - 사용자 테스트 활동 기록을 저장하는 테이블 생성
  - `test_card_stats` 테이블에 순서 관리 필드(`popular_order`, `new_order`) 추가
  - RLS 정책 설정으로 데이터 접근 보안 강화
  - 테스트 관련 API 함수 추가 (`get_popular_tests`, `get_new_tests`, `get_user_activities` 등)
  - 기존 테스트 결과 데이터 마이그레이션 로직 포함

## 마이그레이션 실행 방법

### SQL 에디터에서 실행

1. Supabase 대시보드에서 SQL 에디터 열기
2. 마이그레이션 파일 내용을 복사
3. SQL 에디터에 붙여넣기
4. "Run" 버튼 클릭

### Supabase CLI로 실행

```bash
supabase db execute --file ./migrations/0013_add_user_test_activities_table.sql
```

## 주의사항

- 실행 전 데이터베이스 백업 권장
- 이미 적용된 마이그레이션을 다시 실행하지 않도록 주의
- 각 마이그레이션 파일은 멱등성(idempotent)을 가지도록 작성되었으나, 중복 실행은 피하는 것이 좋음 