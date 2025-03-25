// 지원하는 로케일 목록
export const locales = ["ko", "en"];

// 기본 로케일
export const defaultLocale = "ko";

// 로컬스토리지 키
const LOCALE_STORAGE_KEY = "app_locale";

// 번역 데이터
export const translations = {
  ko: {
    welcome: "환영합니다",
    hello: "안녕하세요",
    change_language: "언어 변경",
    description: "Next.js 다국어 지원 예시입니다",
    current_locale: "현재 언어",
    // 히어로 섹션 관련 번역
    hero_tarot_title: "타로 상담가",
    hero_tarot_description: "과거, 현재, 미래를 알려주는 타로 상담",
    hero_color_title: "퍼스널컬러 테스트",
    hero_color_description: "당신에게 어울리는 컬러를 찾아보세요",
    hero_colorblind_title: "색맹 테스트",
    hero_colorblind_description: "당신의 색각 능력을 테스트해보세요",
    start_test: "테스트 시작하기",
    search_placeholder: "원하는 테스트를 검색해보세요",
    // 카드 관련 번역
    card_new: "NEW",
    card_popular: "인기",
    card_participants: "명 참여",
    card_start_test: "테스트 시작하기",
  },
  en: {
    welcome: "Welcome",
    hello: "Hello",
    change_language: "Change Language",
    description: "Next.js i18n example",
    current_locale: "Current locale",
    // 히어로 섹션 관련 번역
    hero_tarot_title: "Tarot Consultation",
    hero_tarot_description: "Tarot reading for your past, present, and future",
    hero_color_title: "Personal Color Test",
    hero_color_description: "Find the colors that suit you best",
    hero_colorblind_title: "Color Blindness Test",
    hero_colorblind_description: "Test your color vision ability",
    start_test: "Start Test",
    search_placeholder: "Search for a test",
    // 카드 관련 번역
    card_new: "NEW",
    card_popular: "POPULAR",
    card_participants: "participants",
    card_start_test: "Start Test",
  },
};

export type Locale = keyof typeof translations;

// 현재 로케일 가져오기 (클라이언트 사이드)
export function getClientLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale as Locale;
  }

  // 로컬스토리지에서 로케일 가져오기
  const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

  // 저장된 로케일이 유효한지 확인
  if (storedLocale && locales.includes(storedLocale)) {
    return storedLocale as Locale;
  }

  // 저장된 로케일이 없거나 유효하지 않은 경우 기본 로케일 반환
  return defaultLocale as Locale;
}

// 로케일 설정 (클라이언트 사이드)
export function setClientLocale(locale: Locale): void {
  if (typeof window === "undefined") {
    return;
  }

  // 로컬스토리지에 로케일 저장
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

// 번역 함수
export function translate(
  key: keyof typeof translations.ko,
  locale: Locale = getClientLocale()
): string {
  return translations[locale][key] || key;
}

// 쿠키에서 로케일 가져오기 (서버 사이드)
export function getLocaleFromCookie(cookie: string): Locale {
  const match = cookie.match(new RegExp(`${LOCALE_STORAGE_KEY}=([^;]+)`));
  const locale = match ? match[1] : defaultLocale;
  return (locales.includes(locale) ? locale : defaultLocale) as Locale;
}
