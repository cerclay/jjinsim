# 오픈그래프 메타태그 사용 가이드

이 문서는 찐심 앱에서 오픈그래프 메타태그를 사용하는 방법을 설명합니다.

## 기본 개념

오픈그래프 프로토콜은 웹페이지가 소셜 미디어 플랫폼(Facebook, Twitter, KakaoTalk 등)에서 공유될 때 어떻게 표시될지 제어하는 메타데이터입니다. 이를 통해 링크 공유 시 제목, 설명, 이미지 등을 커스텀할 수 있습니다.

## 메타데이터 설정 방법

### 1. 정적 페이지

layout.tsx 또는 page.tsx 파일에서 다음과 같이 메타데이터를 정의합니다:

```tsx
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: '페이지 제목',
  description: '페이지 설명',
  keywords: ['키워드1', '키워드2'], // 선택사항
  image: '/images/my-image.png', // 또는 동적 OG 이미지 URL
  url: 'https://jjinsim.com/path',
  type: 'website', // 또는 'article'
});
```

### 2. 동적 페이지

동적 페이지에서는 generateMetadata 함수를 사용하여 메타데이터를 동적으로 생성할 수 있습니다:

```tsx
import { createMetadata } from '@/lib/metadata';
import { getTestData } from '@/lib/api';

export async function generateMetadata({ params }) {
  // 데이터 가져오기
  const data = await getTestData(params.id);
  
  return createMetadata({
    title: data.title,
    description: data.description,
    image: `/api/og?title=${encodeURIComponent(data.title)}&description=${encodeURIComponent(data.description)}&type=test`,
    url: `https://jjinsim.com/test/${params.id}`,
  });
}
```

## 동적 OG 이미지

동적 OG 이미지를 생성하려면 `/api/og` 엔드포인트를 사용합니다:

```
/api/og?title=제목&description=설명&type=유형
```

### 지원되는 유형

- `default`: 기본 스타일 (흰색 배경)
- `mbti`: MBTI 테스트용 스타일 (주황색 계열 배경)
- `personality`: 성격 테스트용 스타일 (보라색 계열 배경)
- `love`: 연애 테스트용 스타일 (빨간색 계열 배경)

## 소셜 미디어별 공유 최적화

### 카카오톡

카카오톡은 기본적으로 오픈그래프 메타태그를 사용합니다. 다음 태그들이 중요합니다:

- `og:title`: 제목
- `og:description`: 설명
- `og:image`: 이미지 URL
- `og:url`: 공유 URL

### 페이스북

페이스북도 오픈그래프 메타태그를 사용합니다. 추가로 다음 태그가 중요할 수 있습니다:

- `og:type`: 콘텐츠 유형 (website, article 등)
- `og:locale`: 언어 및 지역 (ko_KR)

### 트위터

트위터는 트위터 카드 메타태그를 사용하지만, 오픈그래프 태그도 인식합니다:

- `twitter:card`: 카드 유형 (summary_large_image 권장)
- `twitter:title`: 제목
- `twitter:description`: 설명
- `twitter:image`: 이미지 URL

## 테스트 도구

오픈그래프 메타태그를 테스트하려면 다음 도구를 사용할 수 있습니다:

1. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. [Twitter Card Validator](https://cards-dev.twitter.com/validator)
3. [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
4. [OpenGraph.xyz](https://www.opengraph.xyz/) 