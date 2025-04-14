"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Brain, 
  Calendar, 
  Clock, 
  Share2,
  Award,
  LineChart,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

import { 
  DementiaTestResult, 
  ResultCategory,
  RESULT_CATEGORIES
} from '../types';

// 결과 컴포넌트 프롭 타입
type TestResultProps = {
  resultData: DementiaTestResult;
  onRetake: () => void;
};

// 유튜브 쇼츠 타입
type YoutubeShort = {
  id: string;
  title: string;
};

export const TestResult: React.FC<TestResultProps> = ({ resultData, onRetake }) => {
  const [showShareToast, setShowShareToast] = useState(false);
  // 지연회상 점수 확인을 위한 상태 추가
  const [fixedResultData, setFixedResultData] = useState<DementiaTestResult>(resultData);

  // 컴포넌트 마운트 시 결과 데이터 확인 및 수정
  React.useEffect(() => {
    // 깊은 복사를 통해 결과 데이터 복제
    const processedResultData = JSON.parse(JSON.stringify(resultData)) as DementiaTestResult;

    // 지연회상 문제(20번) 데이터 확인
    const recall20Answer = processedResultData.answers.find(a => a.questionId === 20);
    const recallArea = processedResultData.cognitiveAreas['recall'];
    
    console.log("결과 화면: 지연회상 문제 답변", recall20Answer);
    console.log("결과 화면: 지연회상 영역 데이터", recallArea);
    
    // 지연회상 문제가 있는데 영역 점수에 반영되지 않은 경우 수정
    if (recall20Answer && recallArea && recall20Answer.score !== recallArea.score) {
      console.warn("지연회상 문제 점수와 영역 점수가 일치하지 않습니다. 수정합니다:", {
        문제점수: recall20Answer.score,
        영역점수: recallArea.score
      });

      // 이전 총점에서 지연회상 점수를 뺀 값 계산
      const prevTotalScoreWithoutRecall = processedResultData.totalScore - recallArea.score;
      
      // 지연회상 점수 업데이트
      recallArea.score = recall20Answer.score;
      recallArea.percentage = Math.round((recall20Answer.score / recallArea.maxScore) * 100);
      
      // 총점 재계산
      processedResultData.totalScore = prevTotalScoreWithoutRecall + recall20Answer.score;
      processedResultData.scorePercentage = Math.round((processedResultData.totalScore / processedResultData.maxScore) * 100);
      
      // 결과 카테고리 재계산
      processedResultData.resultCategory = RESULT_CATEGORIES.find(
        category => processedResultData.scorePercentage >= category.minPercentage && 
                    processedResultData.scorePercentage <= category.maxPercentage
      ) || RESULT_CATEGORIES[0];
      
      console.log("수정된 결과 데이터:", {
        totalScore: processedResultData.totalScore,
        recallScore: recallArea.score,
        percentage: processedResultData.scorePercentage,
        category: processedResultData.resultCategory.label
      });

      // 수정된 결과 데이터로 상태 업데이트
      setFixedResultData(processedResultData);
    } else {
      // 수정 필요 없는 경우 그대로 사용
      setFixedResultData(processedResultData);
    }
  }, [resultData]);

  // 치매 예방 관련 유튜브 플레이리스트 URL
  const dementiaPreventionUrl = "https://www.youtube.com/@todayohquiz/shorts";
  
  // 두뇌 훈련 쇼츠 목록
  const brainTrainingShorts: YoutubeShort[] = [
    {
      id: "0HhL46yuqdA",
      title: "단기 기억력 테스트"
    },
    {
      id: "myWRuZFZGVk",
      title: "직관력 테스트"
    }
  ];

  // 결과 공유 함수
  const handleShare = () => {
    // 결과 메시지 생성
    const shareText = `치매 조기 진단 테스트 결과: ${fixedResultData.scorePercentage}점 (${fixedResultData.resultCategory.label})
인지기능 테스트 결과를 확인해보세요!`;
    
    // 클립보드에 복사
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2000);
      })
      .catch(err => {
        console.error('클립보드 복사 실패:', err);
      });
  };
  
  // 결과 카테고리에 따른 색상 반환
  const getCategoryColorClass = (category: ResultCategory) => {
    switch(category.color) {
      case 'green': return 'bg-green-100 text-green-800 border-green-300';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'red': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };
  
  // 진단명에 따른 아이콘 반환
  const getCategoryIcon = (category: ResultCategory) => {
    switch(category.color) {
      case 'green': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'yellow': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'orange': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'red': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Brain className="w-5 h-5 text-blue-600" />;
    }
  };
  
  // 점수에 따른 게이지 색상 반환
  const getScoreColorClass = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  // 인지 영역에 따른 아이콘 반환
  const getCognitiveAreaIcon = (areaId: string) => {
    switch(areaId) {
      case 'orientation': return <Calendar className="w-4 h-4" />;
      case 'memory': return <Brain className="w-4 h-4" />;
      case 'attention': return <Clock className="w-4 h-4" />;
      case 'visuospatial': return <div className="w-4 h-4">👁️</div>;
      case 'language': return <div className="w-4 h-4">💬</div>;
      case 'executive': return <div className="w-4 h-4">🧩</div>;
      case 'recall': return <div className="w-4 h-4">🔄</div>;
      default: return <div className="w-4 h-4">❓</div>;
    }
  };
  
  // 인지 영역 이름 반환
  const getCognitiveAreaName = (areaId: string) => {
    switch(areaId) {
      case 'orientation': return '지남력';
      case 'memory': return '기억력(즉각)';
      case 'attention': return '주의력';
      case 'visuospatial': return '시공간 능력';
      case 'language': return '언어 능력';
      case 'executive': return '실행 기능';
      case 'recall': return '지연 회상';
      default: return areaId;
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* 요약 결과 카드 */}
      <Card className="p-4 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-50 rounded-full opacity-50"></div>
        
        <div className="relative">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-lg font-bold">테스트 결과</h2>
              <p className="text-xs text-gray-600">
                {format(new Date(fixedResultData.date), 'yyyy년 MM월 dd일 HH:mm')}에 완료
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-1 text-xs px-2 py-1"
            >
              <Share2 className="w-3 h-3" />
              공유
            </Button>
          </div>
          
          {/* 점수 표시 */}
          <div className="flex items-center justify-center my-6">
            <div className="relative w-36 h-36">
              {/* 원형 게이지 */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* 배경 원 */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                {/* 점수 원호 */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={fixedResultData.resultCategory.color === 'green' ? '#10b981' : 
                          fixedResultData.resultCategory.color === 'yellow' ? '#f59e0b' :
                          fixedResultData.resultCategory.color === 'orange' ? '#f97316' : '#ef4444'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45 * (fixedResultData.scorePercentage / 100)} ${2 * Math.PI * 45}`}
                  transform="rotate(-90 50 50)"
                />
                {/* 중앙 텍스트 */}
                <text
                  x="50"
                  y="45"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#1f2937"
                >
                  {fixedResultData.scorePercentage}%
                </text>
                <text
                  x="50"
                  y="65"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6b7280"
                >
                  점수
                </text>
              </svg>
            </div>
          </div>
          
          {/* 진단 결과 */}
          <div className={`p-3 rounded-lg border ${getCategoryColorClass(fixedResultData.resultCategory)} mb-3`}>
            <div className="flex items-center gap-1.5 mb-1">
              {getCategoryIcon(fixedResultData.resultCategory)}
              <h3 className="font-semibold text-sm">{fixedResultData.resultCategory.label}</h3>
            </div>
            <p className="text-xs mb-1">{fixedResultData.resultCategory.description}</p>
            <p className="text-xs font-medium">{fixedResultData.resultCategory.recommendation}</p>
          </div>
          
          {/* 두뇌 훈련 영상 섹션 */}
          <div className="mb-4">
            <h3 className="font-medium text-sm mb-3 flex items-center">
              <Brain className="w-4 h-4 text-blue-600 mr-1" />
              두뇌 훈련 영상
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              {brainTrainingShorts.map((short) => (
                <div key={short.id} className="rounded-lg overflow-hidden border border-gray-200">
                  <div className="relative aspect-[9/16] w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${short.id}`}
                      title={short.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-2 bg-gray-50">
                    <p className="text-xs font-medium text-center truncate">{short.title}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              href={dementiaPreventionUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button 
                variant="default" 
                className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-1 py-3 text-xs"
              >
                <Youtube className="w-4 h-4" />
                더 많은 두뇌 훈련 영상 보기
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </Button>
            </Link>
          </div>
          
          {/* 테스트 다시하기 버튼 */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onRetake}
              className="flex-1 text-xs"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              테스트 다시하기
            </Button>
          </div>
        </div>
      </Card>
      
      {/* 결과 상세 탭 */}
      <Tabs defaultValue="scores" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scores" className="text-xs">상세 점수</TabsTrigger>
          <TabsTrigger value="advice" className="text-xs">관리 방법</TabsTrigger>
        </TabsList>
        
        {/* 점수 상세 탭 */}
        <TabsContent value="scores" className="space-y-3 mt-3">
          <Card className="p-3">
            <h3 className="text-base font-bold mb-3">인지 영역별 점수</h3>
            
            <div className="space-y-2">
              {fixedResultData.cognitiveAreas && Object.entries(fixedResultData.cognitiveAreas).map(([areaId, data]) => (
                <div key={areaId} className="bg-gray-50 p-2 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <span className="w-5 h-5 flex items-center justify-center mr-1.5 bg-blue-100 rounded-full text-blue-700">
                        {getCognitiveAreaIcon(areaId)}
                      </span>
                      <span className="text-xs font-medium">{getCognitiveAreaName(areaId)}</span>
                    </div>
                    <span className="text-xs text-gray-600">
                      {data.score}/{data.maxScore} 점
                    </span>
                  </div>
                  
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getScoreColorClass(data.percentage)}`}
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">종합 점수</span>
                <span className="text-sm font-bold text-blue-700">
                  {fixedResultData.totalScore}/{fixedResultData.maxScore} 점
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getScoreColorClass(fixedResultData.scorePercentage)}`}
                  style={{ width: `${fixedResultData.scorePercentage}%` }}
                ></div>
              </div>
            </div>
          </Card>
          
          <Card className="p-3">
            <h3 className="text-base font-bold mb-3">결과 해석</h3>
            <p className="text-gray-700 mb-4 text-xs">
              이 테스트는 치매의 여러 전조 증상을 평가하기 위한 간이 선별 검사입니다. 
              아래 점수 구간별 해석을 참고하세요.
            </p>
            
            <div className="space-y-2">
              {RESULT_CATEGORIES.map((category, idx) => (
                <div key={idx} className={`p-2 rounded-lg ${
                  category.label === fixedResultData.resultCategory.label 
                    ? getCategoryColorClass(category) + ' border' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex items-center gap-1 mb-1">
                    {getCategoryIcon(category)}
                    <h4 className="font-medium text-xs">{category.label} ({category.minPercentage}-{category.maxPercentage}%)</h4>
                  </div>
                  <p className="text-xs">{category.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        {/* 관리 방법 탭 */}
        <TabsContent value="advice" className="mt-3">
          <Card className="p-3">
            <h3 className="text-base font-bold mb-3">인지 건강 관리 방법</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium flex items-center gap-1.5 mb-1 text-xs">
                  <Brain className="w-3 h-3 text-blue-600" />
                  규칙적인 인지 활동
                </h4>
                <p className="text-xs text-gray-700">
                  퍼즐, 독서, 새로운 취미 배우기 등 뇌를 자극하는 활동을 정기적으로 하세요.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium flex items-center gap-1.5 mb-1 text-xs">
                  <div className="w-3 h-3">🏃</div>
                  신체 활동
                </h4>
                <p className="text-xs text-gray-700">
                  규칙적인 운동은 뇌 건강에 매우 중요합니다. 하루 30분 이상 걷기와 같은 가벼운 운동도 효과적입니다.
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-medium flex items-center gap-1.5 mb-1 text-xs">
                  <div className="w-3 h-3">🥗</div>
                  건강한 식단
                </h4>
                <p className="text-xs text-gray-700">
                  지중해식 식단과 같이 녹색 잎채소, 생선, 견과류가 풍부한 식단은 뇌 건강에 도움이 됩니다.
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium flex items-center gap-1.5 mb-1 text-xs">
                  <div className="w-3 h-3">😴</div>
                  충분한 수면
                </h4>
                <p className="text-xs text-gray-700">
                  양질의 수면은 뇌가 기억을 정리하고 회복하는 데 필수적입니다. 하루 7-8시간의 수면을 유지하세요.
                </p>
              </div>
              
              <div className="mt-3">
                <Link 
                  href={dementiaPreventionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-1.5 py-2 border-red-500 text-red-600 hover:bg-red-50 text-xs"
                  >
                    <Youtube className="w-3 h-3" />
                    두뇌 훈련 전문가 영상 보러가기
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* 공유 토스트 메시지 */}
      {showShareToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs">
          클립보드에 복사되었습니다.
        </div>
      )}
    </motion.div>
  );
}; 