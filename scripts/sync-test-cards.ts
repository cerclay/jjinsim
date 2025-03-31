import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// 테스트 카드 카테고리 매핑
const categoryMapping: Record<string, string> = {
  'iq-test': 'iq',
  'past-life-character': 'psychological',
  'marriage-type': 'psychological',
  'mbti': 'personality',
  'stress-check': 'psychological',
  'life-genre': 'psychological',
  'dog-compatibility': 'relationship',
  'fortune': 'fortune',
  'fortune-telling': 'fortune',
  'tarot-consultation': 'fortune',
  'social-character': 'personality',
  'multiple-personality': 'personality',
  'healing-moment': 'healing',
  'flirting-style': 'relationship',
  't-power': 'healing',
  'personal-color': 'ability',
  'color-blindness': 'ability',
  'pet-match': 'relationship'
}

// 테스트 카드 제목 매핑
const titleMapping: Record<string, string> = {
  'iq-test': 'IQ 테스트',
  'past-life-character': '전생 성격 테스트',
  'marriage-type': '결혼 성향 테스트',
  'mbti': 'MBTI 성격 테스트',
  'stress-check': '스트레스 체크 테스트',
  'life-genre': '인생 장르 테스트',
  'dog-compatibility': '강아지 궁합 테스트',
  'fortune': '운세 테스트',
  'fortune-telling': '운세 테스트',
  'tarot-consultation': '타로 상담 테스트',
  'social-character': '사회성 성격 테스트',
  'multiple-personality': '다중 성격 테스트',
  'healing-moment': '힐링 모먼트 테스트',
  'flirting-style': '썸 스타일 테스트',
  't-power': '티 파워: 당신의 잠재력은?',
  'personal-color': '퍼스널 컬러 테스트',
  'color-blindness': '색맹 테스트',
  'pet-match': '나랑 찰떡인 반려동물은?'
}

// 테스트 카드 설명 매핑
const descriptionMapping: Record<string, string> = {
  'iq-test': '당신의 IQ는 얼마일까요? 10가지 문제로 알아보는 나의 지능 지수!',
  'past-life-character': '당신의 전생은 어떤 모습이었을까요? 현재의 성격으로 알아보는 전생의 이야기.',
  'marriage-type': '당신의 결혼관은 어떤가요? 연애와 결혼에 대한 당신의 진짜 성향을 알아봅니다.',
  'mbti': '당신의 MBTI는 무엇인가요? 16가지 성격 유형 중 당신은 어디에 속하나요?',
  'stress-check': '당신의 스트레스 지수는 얼마나 될까요? 간단한 테스트로 알아보는 스트레스 레벨!',
  'life-genre': '당신의 인생은 어떤 장르일까요? 로맨스? 액션? 코미디? 지금까지의 삶을 통해 알아보는 인생 장르!',
  'dog-compatibility': '당신과 가장 잘 맞는 강아지는 어떤 종일까요? 10가지 질문으로 알아보는 나의 반려견 궁합!',
  'fortune': '당신의 운세는 어떨까요? 간단한 테스트로 알아보는 오늘의 운세!',
  'fortune-telling': '당신의 운세는 어떨까요? 간단한 테스트로 알아보는 오늘의 운세!',
  'tarot-consultation': '타로카드가 말해주는 당신의 운명은? 지금 이 순간 당신에게 필요한 타로 메시지를 받아보세요!',
  'social-character': '당신은 어떤 사회적 성향을 가지고 있나요? 대인관계 속 당신의 모습을 알아봅니다.',
  'multiple-personality': '당신 안에는 몇 개의 성격이 있나요? 숨겨진 다양한 성격을 찾아보세요!',
  'healing-moment': '지금 이 순간, 당신에게 필요한 힐링은 무엇일까요? 마음의 안정을 찾아주는 힐링 처방전!',
  'flirting-style': '당신의 연애 시그널은? 썸 탈 때 보이는 당신만의 매력을 알아보세요!',
  't-power': '차 한잔으로 알아보는 당신의 숨겨진 잠재력! 어떤 차의 기운을 가지고 있나요?',
  'personal-color': '당신에게 어울리는 색은 무엇일까요? 퍼스널 컬러로 알아보는 나만의 매력 색깔!',
  'color-blindness': '당신의 색채 감각은 어떤가요? 간단한 테스트로 알아보는 나의 색채 감각!',
  'pet-match': '당신의 성격과 일상 습관을 바탕으로 운명처럼 맞는 동물 친구를 찾아드립니다!'
}

async function syncTestCards() {
  try {
    const testsDir = path.join(process.cwd(), 'src', 'app', 'tests')
    const directories = fs.readdirSync(testsDir)
      .filter(dir => fs.statSync(path.join(testsDir, dir)).isDirectory())
      .filter(dir => dir !== 'popular' && dir !== 'new') // 특수 디렉토리 제외

    for (const dir of directories) {
      const category = categoryMapping[dir]
      if (!category) {
        console.warn(`카테고리를 찾을 수 없습니다: ${dir}`)
        continue
      }

      const title = titleMapping[dir]
      const description = descriptionMapping[dir]
      const thumbnailUrl = `https://picsum.photos/seed/${dir}/400/300`

      // 테스트 카드 추가 또는 업데이트
      const { data: testCard, error: testCardError } = await supabase
        .from('test_cards')
        .upsert({
          title,
          description,
          thumbnail_url: thumbnailUrl
        }, {
          onConflict: 'title'
        })
        .select()
        .single()

      if (testCardError) {
        console.error(`테스트 카드 추가 실패: ${dir}`, testCardError)
        continue
      }

      // 카테고리 ID 가져오기
      const { data: categoryData, error: categoryError } = await supabase
        .from('test_categories')
        .select('id')
        .eq('name', category)
        .single()

      if (categoryError) {
        console.error(`카테고리 조회 실패: ${category}`, categoryError)
        continue
      }

      // 테스트 카드와 카테고리 연결
      const { error: linkError } = await supabase
        .from('test_card_categories')
        .upsert({
          test_card_id: testCard.id,
          category_id: categoryData.id
        }, {
          onConflict: 'test_card_id,category_id'
        })

      if (linkError) {
        console.error(`카테고리 연결 실패: ${dir}`, linkError)
        continue
      }

      // 테스트 카드 통계 추가 또는 업데이트
      const { error: statsError } = await supabase
        .from('test_card_stats')
        .upsert({
          id: testCard.id,
          title,
          description,
          thumbnail_url: thumbnailUrl,
          category,
          participation_count: 0,
          like_count: 0,
          is_active: true,
          duration: '5분'
        }, {
          onConflict: 'id'
        })

      if (statsError) {
        console.error(`통계 추가 실패: ${dir}`, statsError)
        continue
      }

      console.log(`테스트 카드 동기화 완료: ${title}`)
    }

    console.log('모든 테스트 카드 동기화가 완료되었습니다.')
  } catch (error) {
    console.error('테스트 카드 동기화 중 오류 발생:', error)
  }
}

function getCategoryDisplayName(category: string): string {
  const displayNames: { [key: string]: string } = {
    'iq': 'IQ 테스트',
    'memory': '기억력 테스트',
    'personality': '성격 테스트',
    'ability': '능력 테스트',
    'psychological': '심리 테스트',
    'fortune': '운세 테스트',
    'relationship': '관계 테스트',
    'healing': '힐링 테스트'
  }
  return displayNames[category] || category
}

// 스크립트 실행
syncTestCards() 