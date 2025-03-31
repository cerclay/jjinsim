import { MEMORY_TEST_METADATA } from "../memory-test/constants"
import { IQ_TEST_METADATA } from "../iq-test/constants"
import { TestCard } from "./types"

export const testDirectories = ["memory-test", "iq-test"]

export const defaultTests: TestCard[] = [
  MEMORY_TEST_METADATA,
  IQ_TEST_METADATA,
]

export const popularTests: TestCard[] = [
  IQ_TEST_METADATA,
  MEMORY_TEST_METADATA,
]

export const newTests: TestCard[] = [
  MEMORY_TEST_METADATA,
]

export const categoryMap = {
  "NEW": "신규",
  "POPULAR": "인기",
  "ABILITY": "능력",
  "PERSONALITY": "성격",
  "LOVE": "연애",
  "MBTI": "MBTI",
  "CAREER": "직업",
  "ENTERTAINMENT": "오락",
  "OTHERS": "기타",
} as const 