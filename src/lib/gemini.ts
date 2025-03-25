import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Gemini API 키 설정
const API_KEY = "AIzaSyC_Woxwt323fN5CRAHbGRrzAp10bGZMA_4";

// Gemini 모델 ID
const MODEL_ID = "gemini-1.5-flash";

// Gemini 클라이언트 초기화
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_ID });

// 안전 설정 구성
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Base64 이미지를 Gemini API에 전송하여 퍼스널컬러 분석
export async function analyzePersonalColor(imageBase64: string): Promise<{
  personalColorType: 'warm-spring' | 'warm-autumn' | 'cool-summer' | 'cool-winter';
  skinTone: string;
  confidence: number;
  analysis: string;
}> {
  try {
    // Base64 형식에서 MIME 타입 프리픽스 제거 (data:image/jpeg;base64, 부분)
    const base64WithoutPrefix = imageBase64.split(',')[1] || imageBase64;

    // 이미지 분석을 위한 프롬프트 설정
    const prompt = `
    당신은 전문적인 퍼스널컬러 분석가입니다. 
    주어진 얼굴 이미지를 분석하여 퍼스널컬러 타입을 결정해주세요.
    
    퍼스널컬러는 아래 4가지 중 하나로 분류해주세요:
    1. warm-spring (봄 웜톤): 밝고 선명한 따뜻한 톤
    2. warm-autumn (가을 웜톤): 차분하고 깊이 있는 따뜻한 톤
    3. cool-summer (여름 쿨톤): 부드럽고 연한 차가운 톤
    4. cool-winter (겨울 쿨톤): 선명하고 대비가 강한 차가운 톤
    
    분석 결과를 다음 JSON 형식으로 반환해주세요:
    {
      "personalColorType": "퍼스널컬러 타입(warm-spring/warm-autumn/cool-summer/cool-winter 중 하나)",
      "skinTone": "피부 톤에 대한 간략한 설명",
      "confidence": 신뢰도(0.0~1.0 사이의 숫자),
      "analysis": "분석 결과에 대한 간략한 설명 (50자 이내)"
    }
    
    JSON 형식으로만 응답해주세요. 다른 설명이나 텍스트는 포함하지 마세요.
    `;

    // 이미지 파트 생성
    const imageParts = [
      {
        inlineData: {
          data: base64WithoutPrefix,
          mimeType: "image/jpeg",
        },
      },
    ];

    // Gemini API 호출
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }, ...imageParts] }],
      safetySettings,
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 0.95,
        maxOutputTokens: 800,
      },
    });

    const response = result.response;
    const text = response.text();

    // JSON 문자열 추출 (텍스트 응답에서 JSON 부분만 파싱)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("응답 형식이 올바르지 않습니다.");
    }

    const parsedResult = JSON.parse(jsonMatch[0]);
    
    // 결과 반환
    return {
      personalColorType: parsedResult.personalColorType,
      skinTone: parsedResult.skinTone,
      confidence: parsedResult.confidence,
      analysis: parsedResult.analysis,
    };
  } catch (error) {
    console.error("Gemini API 오류:", error);
    // 오류 발생 시 랜덤 결과 반환 (폴백 옵션)
    const personalColorTypes = ['warm-spring', 'warm-autumn', 'cool-summer', 'cool-winter'] as const;
    return {
      personalColorType: personalColorTypes[Math.floor(Math.random() * personalColorTypes.length)],
      skinTone: "분석 중 오류가 발생했습니다",
      confidence: 0.5,
      analysis: "API 오류로 인해 랜덤 결과를 제공합니다.",
    };
  }
} 