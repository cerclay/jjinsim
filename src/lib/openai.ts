import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateFortune(type: 'today' | 'year' | 'life', birthdate: string) {
  const prompts = {
    today: `당신은 유쾌하고 현실적인 운세 상담사입니다. 
생년월일 ${birthdate}인 사람의 오늘 운세를 다음 형식으로 알려주세요:

- 오늘의 키워드: (1줄)
- 운세 해석: (3~5줄)
- 오늘의 조언: (1줄)
- 오늘의 할 일: (2개)

너무 뜬구름 잡는 말은 삼가고, 찔리지만 위로가 되는 느낌으로 작성해주세요.
응답은 JSON 형식으로 해주세요.`,

    year: `당신은 유쾌하고 현실적인 운세 상담사입니다.
생년월일 ${birthdate}인 사람의 2025년 운세를 다음 형식으로 알려주세요:

- 올해의 키워드: (1줄)
- 상반기 운세: (2~3줄)
- 하반기 운세: (2~3줄)
- 올해의 기회: (1~2개)
- 주의할 점: (1~2개)

너무 뜬구름 잡는 말은 삼가고, 찔리지만 위로가 되는 느낌으로 작성해주세요.
응답은 JSON 형식으로 해주세요.`,

    life: `당신은 유쾌하고 현실적인 운세 상담사입니다.
생년월일 ${birthdate}인 사람의 인생 운세를 다음 형식으로 알려주세요:

- 인생 키워드: (1줄)
- 성향 분석: (2~3줄)
- 인생의 기회: (2~3개)
- 성장 포인트: (2~3개)
- 행운의 시기: (1~2줄)

너무 뜬구름 잡는 말은 삼가고, 찔리지만 위로가 되는 느낌으로 작성해주세요.
응답은 JSON 형식으로 해주세요.`
  };

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "당신은 유쾌하고 현실적인 운세 상담사입니다. 사용자의 운세를 재미있고 현실적으로 해석해주세요."
        },
        {
          role: "user",
          content: prompts[type]
        }
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  } catch (error) {
    console.error('OpenAI API 호출 중 오류 발생:', error);
    throw new Error('운세를 분석하는 중에 문제가 발생했습니다.');
  }
}

// 운세 지수 생성 함수
export function generateFortuneScores() {
  return [
    { label: '금전운', score: Math.floor(Math.random() * 40) + 60 }, // 60-100
    { label: '애정운', score: Math.floor(Math.random() * 40) + 60 },
    { label: '건강운', score: Math.floor(Math.random() * 40) + 60 },
    { label: '인간관계', score: Math.floor(Math.random() * 40) + 60 },
    { label: '지적운', score: Math.floor(Math.random() * 40) + 60 },
  ];
} 