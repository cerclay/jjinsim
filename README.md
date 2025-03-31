이 프로젝트는 [`EasyNext`](https://github.com/easynext/easynext)를 사용해 생성된 [Next.js](https://nextjs.org) 프로젝트입니다.

## Getting Started

개발 서버를 실행합니다.<br/>
환경에 따른 명령어를 사용해주세요.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인할 수 있습니다.

`app/page.tsx` 파일을 수정하여 페이지를 편집할 수 있습니다. 파일을 수정하면 자동으로 페이지가 업데이트됩니다.

## 기본 포함 라이브러리

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Shadcn UI](https://ui.shadcn.com)
- [Lucide Icon](https://lucide.dev)
- [date-fns](https://date-fns.org)
- [react-use](https://github.com/streamich/react-use)
- [es-toolkit](https://github.com/toss/es-toolkit)
- [Zod](https://zod.dev)
- [React Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com)
- [TS Pattern](https://github.com/gvergnaud/ts-pattern)

## 사용 가능한 명령어

한글버전 사용

```sh
easynext lang ko
```

최신버전으로 업데이트

```sh
npm i -g @easynext/cli@latest
# or
yarn add -g @easynext/cli@latest
# or
pnpm add -g @easynext/cli@latest
```

Supabase 설정

```sh
easynext supabase
```

Next-Auth 설정

```sh
easynext auth

# ID,PW 로그인
easynext auth idpw
# 카카오 로그인
easynext auth kakao
```

유용한 서비스 연동

```sh
# Google Analytics
easynext gtag

# Microsoft Clarity
easynext clarity

# ChannelIO
easynext channelio

# Sentry
easynext sentry

# Google Adsense
easynext adsense
```

# Next.js 인증 시스템

Next.js와 Supabase를 이용한 인증 시스템입니다.

## 기능

- 아이디/비밀번호 로그인
- 카카오 소셜 로그인
- 회원가입
- Supabase 데이터베이스 연동

## 설치 및 실행

1. 패키지 설치
```bash
npm install
```

2. 환경 변수 설정
`.env.local` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가합니다.

```
# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Kakao OAuth
KAKAO_CLIENT_ID=your-kakao-client-id
KAKAO_CLIENT_SECRET=your-kakao-client-secret
```

3. 개발 서버 실행
```bash
npm run dev
```

## 카카오 로그인 설정 방법

1. [Kakao Developers](https://developers.kakao.com/)에 접속하여 애플리케이션을 등록합니다.
2. 앱 설정 > 일반 > 플랫폼 > Web > 사이트 도메인에 `http://localhost:3000`을 추가합니다.
3. 제품 설정 > 카카오 로그인 > 활성화 설정을 ON으로 변경합니다.
4. 제품 설정 > 카카오 로그인 > Redirect URI에 `http://localhost:3000/api/auth/callback/kakao`를 추가합니다.
5. 앱 키 > REST API 키를 환경 변수 `KAKAO_CLIENT_ID`에 설정합니다.
6. 앱 키 > Client Secret을 생성하고 환경 변수 `KAKAO_CLIENT_SECRET`에 설정합니다.

## Supabase 데이터베이스 설정

1. [Supabase](https://supabase.com/)에서 새 프로젝트를 생성합니다.
2. SQL 에디터에서 `supabase/migrations` 폴더의 마이그레이션 파일을 순서대로 실행합니다.
3. 프로젝트 설정 > API에서 URL과 anon key, service_role key를 환경 변수에 설정합니다.

## 파일 구조

- `/src/app/auth`: 인증 관련 페이지 (로그인, 회원가입 등)
- `/src/lib/auth.ts`: NextAuth 설정
- `/src/lib/supabase`: Supabase 클라이언트
- `/supabase/migrations`: 데이터베이스 마이그레이션 파일

## 인증 흐름

1. 사용자가 로그인 페이지에 접근
2. 아이디/비밀번호 또는 카카오 소셜 로그인 선택
3. 인증 완료 후 JWT 토큰 발급 및 세션 생성
4. 인증된 사용자는 보호된 페이지에 접근 가능

## Google Analytics 사용법

이 프로젝트는 Google Analytics(GA4)가 설정되어 있습니다. 측정 ID: `G-SLVWRTM37G`

### 페이지 추적
페이지 추적은 자동으로 설정되어 있습니다.

### 이벤트 추적
이벤트를 추적하려면 다음과 같이 사용하세요:

```javascript
import { event } from './app/gtag';

// 이벤트 추적
event({
  action: '버튼_클릭',
  category: '사용자_상호작용',
  label: '로그인_버튼',
  value: 1
});
```

## Microsoft Clarity 사용법

이 프로젝트는 Microsoft Clarity가 설정되어 있습니다. 프로젝트 ID: `qts325qr6z`

Microsoft Clarity는 사용자 행동 분석 도구로, 별도의 코드 없이 자동으로 사용자 세션을 기록하고 히트맵, 세션 재생 등의 기능을 제공합니다.

Clarity 컴포넌트는 `src/third-parties/Clarity.tsx`에 위치하며, `layout.tsx`에 자동으로 추가되었습니다.

자세한 내용은 [Microsoft Clarity 공식 문서](https://docs.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup)를 참조하세요.

## Google AdSense 사용법

이 프로젝트는 Google AdSense가 설정되어 있습니다. 클라이언트 ID: `ca-pub-1913369059980356`

### 기본 설정
- AdSense 스크립트는 `src/third-parties/AdSense.tsx`에 위치하며, `layout.tsx`에 자동으로 추가되었습니다.
- 이 설정으로 Google AdSense 크롤러가 사이트를 분석할 수 있습니다.
- **참고**: AdSense 스크립트와 광고는 프로덕션 환경(`NODE_ENV=production`)에서만 로드됩니다.

### 광고 삽입 방법
특정 위치에 광고를 삽입하려면 다음과 같이 사용하세요:

```tsx
import { AdSenseAd } from '@/third-parties/AdSense';

export default function MyPage() {
  return (
    <div>
      <h1>페이지 제목</h1>
      {/* 광고 슬롯 ID를 지정하여 광고 삽입 */}
      <AdSenseAd slot="1234567890" />
      <p>페이지 내용...</p>
    </div>
  );
}
```

자세한 내용은 [Google AdSense 공식 문서](https://support.google.com/adsense/answer/9274025)를 참조하세요.

## Sitemap 사용법

이 프로젝트는 next-sitemap이 설정되어 있습니다.

- `next build` 명령어 실행 후 자동으로 sitemap.xml과 robots.txt 파일이 생성됩니다.
- 설정 파일은 프로젝트 루트의 `next-sitemap.config.js`에 있습니다.
- 생성된 파일은 `public` 디렉토리에 저장됩니다.

추가 설정이 필요한 경우 `next-sitemap.config.js` 파일을 수정하세요.
자세한 내용은 [next-sitemap 공식 문서](https://github.com/iamvishnusankar/next-sitemap)를 참조하세요.
