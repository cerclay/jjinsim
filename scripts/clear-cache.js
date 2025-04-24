/**
 * OG 이미지 캐시를 지우기 위한 스크립트
 * 
 * 소셜 미디어 플랫폼들은 OG 이미지를 캐싱하기 때문에,
 * 새 이미지로 교체 후 캐시 무효화가 필요합니다.
 * 아래 URL을 통해 수동으로 각 플랫폼의 캐시를 지울 수 있습니다.
 */

console.log(`
OG 이미지 캐시 지우기 가이드:

1. Facebook/Meta
   - https://developers.facebook.com/tools/debug/
   - URL: https://mysimli.com 입력 후 '디버그' 클릭
   - '스크래핑 다시 하기' 버튼 클릭

2. Twitter/X
   - https://cards-dev.twitter.com/validator
   - URL: https://mysimli.com 입력 후 '미리보기 카드' 클릭

3. LinkedIn
   - https://www.linkedin.com/post-inspector/
   - URL: https://mysimli.com 입력 후 '검사' 클릭

4. Slack
   - 새 OG 이미지가 적용된 URL을 Slack에 처음 공유할 때 자동으로 캐시가 갱신됩니다.
   - 이전에 공유한 URL인 경우 "..." 메뉴를 클릭하고 "링크 미리보기 새로고침" 옵션 선택

5. KakaoTalk
   - 이전에 공유한 URL을 다시 공유할 때는 캐시된 미리보기가 사용됩니다.
   - 미리보기를 갱신하려면 URL에 쿼리 파라미터를 추가하여 새 URL로 인식하게 만들 수 있습니다.
   - 예: https://mysimli.com?cache=1234

각 플랫폼마다 캐시 지속 시간이 다르므로, 캐시 갱신 후에도 즉시 반영되지 않을 수 있습니다.
`); 