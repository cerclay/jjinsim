import { TarotCard } from "./constants/tarot-cards";
import { useState } from "react";

// 타로 해석 결과 타입
type TarotReadingResult = {
  success: boolean;
  reading?: string;
  error?: string;
};

/**
 * 사용자 고민과 선택한 타로 카드를 기반으로 타로 해석을 생성하는 함수
 */
export async function generateTarotReading(
  concern: string,
  selectedCards: { card: TarotCard; isReversed: boolean }[]
): Promise<TarotReadingResult> {
  try {
    // API 키 가져오기
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return {
        success: false,
        error: "Gemini API 키가 설정되지 않았습니다. .env.local 파일에 설정해주세요."
      };
    }

    // 카드 정보 형식화
    const cardInfo = selectedCards.map((selection, index) => {
      const { card, isReversed } = selection;
      const position = ["과거", "현재", "미래"][index];
      
      return `카드 ${index + 1} (${position}): ${card.name}${isReversed ? " (역방향)" : ""}
- 의미: ${isReversed ? card.meanings.reversed.join(", ") : card.meanings.upright.join(", ")}
- 설명: ${card.description}`;
    }).join("\n\n");

    // Gemini API 호출을 위한 프롬프트 생성
    const prompt = `당신은 20년 경력의 타로 상담사입니다. 아래 내용을 바탕으로 친절하고 자세한 타로 해석을 제공해주세요. 
상담 내용은 재미있고 긍정적으로 해석해주세요. 각 카드의 의미를 연결하여 흐름이 자연스럽게 만들어주세요.

상담자의 고민: ${concern}

선택된 카드:
${cardInfo}

과거-현재-미래 카드가 가진 의미에 기반하여 일관성 있고 흐름이 자연스러운 해석을 제공해주세요.
해석은 다음 형식으로 구성해주세요:
1. 전체적인 요약 (간략한 총평)
2. 과거 카드에 대한 해석 (고민과의 연관성)
3. 현재 카드에 대한 해석 (현재 상황에 대한 통찰)
4. 미래 카드에 대한 해석 (앞으로의 방향성 제시)
5. 종합적인 조언과 긍정적인 메시지

답변은 재미와 위로를 제공하면서도 실질적인 조언을 포함해야 합니다. 또한 행운의 색상, 숫자, 방향 등 재미있는 요소를 추가해 주세요.`;

    // Gemini API 호출
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      }),
    });

    const data = await response.json();

    // 응답 확인 및 처리
    if (data.error) {
      console.error("Gemini API 에러:", data.error);
      return {
        success: false,
        error: `API 오류: ${data.error.message || "알 수 없는 오류가 발생했습니다."}`
      };
    }

    // 응답 텍스트 추출
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      return {
        success: false,
        error: "타로 해석을 생성하지 못했습니다."
      };
    }

    return {
      success: true,
      reading: responseText
    };
  } catch (error) {
    console.error("타로 해석 생성 중 오류 발생:", error);
    return {
      success: false,
      error: "서비스 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    };
  }
}

// 훅으로 사용할 수 있도록 설정
export function useTarotReading() {
  const [reading, setReading] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const generateReading = async (
    concern: string,
    selectedCards: { card: TarotCard; isReversed: boolean }[]
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await generateTarotReading(concern, selectedCards);
      
      if (result.success && result.reading) {
        setReading(result.reading);
      } else {
        setError(result.error || "타로 해석을 가져오는 중 문제가 발생했습니다.");
      }
    } catch (err) {
      setError("서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error("타로 해석 오류:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetReading = () => {
    setReading("");
    setError("");
  };

  return {
    reading,
    isLoading,
    error,
    generateReading,
    resetReading
  };
} 