"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins, Heart, Activity, Users, Brain, Calendar, Share2, Download, Camera, Copy, Twitter, Facebook } from 'lucide-react';
import { toPng } from 'html-to-image';

interface FortuneScore {
  label: string;
  score: number;
}

interface FortuneResult {
  keyword: string;
  interpretation: string;
  advice: string;
  todos: string[];
}

const iconMap = {
  '금전운': Coins,
  '애정운': Heart,
  '건강운': Activity,
  '인간관계': Users,
  '지적운': Brain,
};

// 감정 이모지 매핑
const emojiMap: Record<string, string> = {
  '행운': '🍀',
  '도전': '🚀',
  '성취': '🏆',
  '변화': '🦋',
  '성장': '🌱',
  '안정': '⚓',
  '균형': '⚖️',
  '발전': '📈',
};

// 키워드별 태그 매핑
const tagMap: Record<string, string[]> = {
  '행운': ['#럭키데이', '#금전운상승', '#행운의주인공'],
  '도전': ['#액션플랜', '#도전정신', '#새로운시작'],
  '성취': ['#목표달성', '#성공에너지', '#결실의날'],
  '변화': ['#변화의바람', '#새로운기회', '#전환점'],
  '성장': ['#성장곡선', '#자기발전', '#잠재력발휘'],
  '안정': ['#평온한하루', '#안정적관계', '#균형잡힌날'],
  '균형': ['#워라밸', '#조화로운하루', '#균형의미학'],
  '발전': ['#성장가도', '#한단계업', '#진전의시간'],
};

// 현재 API가 없으므로 모의 데이터 생성 함수
function generateMockData() {
  const scores = [
    { label: '금전운', score: Math.floor(Math.random() * 60) + 40 },
    { label: '애정운', score: Math.floor(Math.random() * 60) + 40 },
    { label: '건강운', score: Math.floor(Math.random() * 60) + 40 },
    { label: '인간관계', score: Math.floor(Math.random() * 60) + 40 },
    { label: '지적운', score: Math.floor(Math.random() * 60) + 40 },
  ];
  
  const keywords = ['행운', '도전', '성취', '변화', '성장', '안정', '균형', '발전'];
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  
  return {
    fortune: {
      keyword,
      interpretation: `오늘은 ${keyword}의 기운이 당신을 감싸고 있습니다. 새로운 기회와 가능성이 열려있으니 자신감을 갖고 도전해보세요. 작은 일에도 감사함을 느끼며, 긍정적인 태도로 하루를 보내면 더 좋은 결과를 얻을 수 있을 것입니다.`,
      advice: "오늘은 새로운 것에 도전하기 좋은 날입니다. 평소에 시도하고 싶었던 일이 있다면 시작해보세요.",
      todos: [
        "아침에 감사한 일 3가지 적어보기",
        "오랫동안 연락하지 않았던 친구에게 안부 전하기",
        "30분 이상 가벼운 운동하기"
      ]
    },
    scores
  };
}

export default function TodayFortunePage() {
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fortuneResult, setFortuneResult] = useState<FortuneResult | null>(null);
  const [fortuneScores, setFortuneScores] = useState<FortuneScore[]>([]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API 호출 대신 모의 데이터 사용
      setTimeout(() => {
        const mockData = generateMockData();
        setFortuneResult(mockData.fortune);
        setFortuneScores(mockData.scores);
        setIsLoading(false);
      }, 1500);

      // 실제 API가 구현되면 아래 코드 사용
      /*
      const response = await fetch('/api/fortune', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'today',
          birthdate: `${birthYear}-${birthMonth}-${birthDay}`,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '운세 생성에 실패했습니다.');
      }

      setFortuneResult(data.fortune);
      setFortuneScores(data.scores);
      */
    } catch (error) {
      console.error('운세 생성 중 오류:', error);
      alert('운세를 생성하는 중에 문제가 발생했습니다.');
    } finally {
      // setIsLoading(false);
    }
  };

  const saveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      const dataUrl = await toPng(resultRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `오늘의운세_${new Date().toLocaleDateString()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('이미지 저장 중 오류:', error);
      alert('이미지 저장에 실패했습니다.');
    }
  };

  const copyToClipboard = () => {
    if (!fortuneResult) return;
    
    const text = `
🔮 오늘의 운세 - ${new Date().toLocaleDateString()}
✨ 키워드: ${fortuneResult.keyword} ${emojiMap[fortuneResult.keyword] || ''}
📝 해석: ${fortuneResult.interpretation}
💡 조언: ${fortuneResult.advice}
📌 오늘의 할 일:
${fortuneResult.todos.map(todo => `- ${todo}`).join('\n')}
    `;
    
    navigator.clipboard.writeText(text).then(() => {
      alert('클립보드에 복사되었습니다.');
      setShowShareOptions(false);
    }).catch(err => {
      console.error('클립보드 복사 중 오류:', err);
      alert('클립보드 복사에 실패했습니다.');
    });
  };

  const shareOnTwitter = () => {
    if (!fortuneResult) return;
    
    const text = `오늘의 운세: ${fortuneResult.keyword} - ${fortuneResult.advice}`;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
    setShowShareOptions(false);
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    setShowShareOptions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-50/50 to-white p-3 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/tests/fortune-telling"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors"
        >
          <motion.div 
            whileHover={{ x: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
          </motion.div>
          돌아가기
        </Link>

        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-8 flex items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">오늘의 운세</span>
          <motion.span 
            className="ml-2 text-2xl"
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            ✨
          </motion.span>
        </h1>

        {!fortuneResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-5">
              <div className="flex items-center text-white">
                <Calendar className="w-6 h-6 mr-3" />
                <h2 className="text-xl font-semibold">생년월일을 선택하세요</h2>
              </div>
              <p className="mt-2 text-purple-100 text-sm">
                정확한 운세 분석을 위해 태어난 날짜를 알려주세요
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    년도
                  </label>
                  <select
                    id="year"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                    required
                  >
                    <option value="">선택</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}년</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                    월
                  </label>
                  <select
                    id="month"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                    required
                  >
                    <option value="">선택</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}월</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="day" className="block text-sm font-medium text-gray-700 mb-1">
                    일
                  </label>
                  <select
                    id="day"
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                    required
                  >
                    <option value="">선택</option>
                    {days.map(day => (
                      <option key={day} value={day}>{day}일</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-md hover:opacity-90 disabled:opacity-70 transition-all font-medium shadow-md flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    운세를 분석하고 있습니다...
                  </>
                ) : (
                  '운세 보기'
                )}
              </motion.button>
              
              <p className="mt-4 text-center text-xs text-gray-500">
                * 입력하신 생년월일은 운세 분석에만 사용되며 별도로 저장되지 않습니다.
              </p>
            </form>
          </motion.div>
        ) : (
          <div>
            <div className="mb-5 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-700">
                {birthYear}년 {birthMonth}월 {birthDay}일생, 오늘의 운세
              </h2>
              <div className="relative">
                <motion.button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="bg-white p-2 rounded-full shadow-md text-purple-600 hover:bg-purple-50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
                
                {showShareOptions && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-3 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button 
                      onClick={saveAsImage}
                      className="flex items-center w-full p-2 hover:bg-purple-50 rounded-md text-left text-sm text-gray-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      이미지로 저장
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center w-full p-2 hover:bg-purple-50 rounded-md text-left text-sm text-gray-700"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      텍스트 복사
                    </button>
                    <button 
                      onClick={shareOnTwitter}
                      className="flex items-center w-full p-2 hover:bg-purple-50 rounded-md text-left text-sm text-gray-700"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      트위터에 공유
                    </button>
                    <button 
                      onClick={shareOnFacebook}
                      className="flex items-center w-full p-2 hover:bg-purple-50 rounded-md text-left text-sm text-gray-700"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      페이스북에 공유
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
            
            <div ref={resultRef}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* 운세 결과 */}
                <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-purple-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-purple-100 rounded-full opacity-30"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 -ml-12 -mb-12 bg-indigo-100 rounded-full opacity-30"></div>
                  
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mb-6"
                    >
                      <div className="flex flex-wrap items-center mb-2">
                        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mr-3 flex items-center">
                          오늘의 키워드: 
                          <motion.span
                            className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {fortuneResult.keyword}
                          </motion.span>
                        </h2>
                        <motion.span 
                          className="text-3xl sm:text-4xl"
                          initial={{ rotateY: 0 }}
                          animate={{ rotateY: 360 }}
                          transition={{ duration: 1.5, delay: 0.3 }}
                        >
                          {emojiMap[fortuneResult.keyword] || '✨'}
                        </motion.span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 my-3">
                        {(tagMap[fortuneResult.keyword] || ['#오늘의운세', '#행운가득', '#긍정에너지']).map((tag, index) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="relative py-4 px-5 border-l-4 border-purple-400 bg-purple-50 rounded-r-lg my-6"
                    >
                      <p className="text-gray-700 whitespace-pre-line text-base sm:text-lg leading-relaxed italic">
                        "{fortuneResult.interpretation}"
                      </p>
                      <div className="absolute -top-2 -left-2 transform -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                          initial={{ rotate: 0, scale: 0.8 }}
                          animate={{ rotate: [0, 15, 0, -15, 0], scale: [0.8, 1, 0.8] }}
                          transition={{ duration: 5, repeat: Infinity }}
                          className="text-2xl"
                        >
                          💫
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="border-t border-purple-100 pt-5"
                    >
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center text-lg">
                        <span className="text-purple-600 mr-2">💡</span> 오늘의 조언
                      </h3>
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
                        <p className="text-gray-700 italic">{fortuneResult.advice}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="border-t border-purple-100 pt-5 mt-5"
                    >
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center text-lg">
                        <span className="text-purple-600 mr-2">📝</span> 오늘의 할 일
                      </h3>
                      <ul className="space-y-3">
                        {fortuneResult.todos.map((todo, index) => (
                          <motion.li
                            key={index}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.15, duration: 0.3 }}
                            className="flex items-start bg-white p-3 rounded-lg border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                              className="text-purple-600 mr-3 mt-0.5 text-lg"
                            >
                              ✓
                            </motion.div>
                            <span className="text-gray-700">{todo}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>

                {/* 운세 지수 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-purple-100"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-purple-600 mr-2">📊</span> 운세 지수
                  </h2>
                  <div className="grid gap-5">
                    {fortuneScores.map((item, index) => {
                      const Icon = iconMap[item.label as keyof typeof iconMap];
                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.0 + index * 0.1, duration: 0.3 }}
                          className="flex items-center"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4"
                          >
                            <Icon className="w-6 h-6 text-purple-600" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1.5">
                              <span className="text-base font-medium text-gray-700">
                                {item.label}
                              </span>
                              <motion.span 
                                className="text-base font-medium text-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                              >
                                {item.score}%
                              </motion.span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ delay: 1.2 + index * 0.1, duration: 1, ease: "easeOut" }}
                                className={`h-3 rounded-full ${
                                  item.score >= 80 ? 'bg-green-500' :
                                  item.score >= 60 ? 'bg-purple-600' :
                                  item.score >= 40 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                              />
                            </div>
                            <div className="mt-1">
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                                className="text-xs text-gray-500"
                              >
                                {item.score >= 80 ? '매우 좋음' :
                                 item.score >= 60 ? '좋음' :
                                 item.score >= 40 ? '보통' : '주의 필요'}
                              </motion.span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="mt-5 px-4 py-3 bg-purple-50 rounded-lg text-sm text-purple-700 flex items-center"
                  >
                    <motion.span
                      animate={{ rotate: [0, 15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className="mr-2 text-lg"
                    >
                      💡
                    </motion.span>
                    <span>운세 지수는 단순 참고용이며, 실제 하루는 자신의 선택과 노력에 따라 달라질 수 있어요!</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => {
                  setFortuneResult(null);
                  setFortuneScores([]);
                  setBirthYear('');
                  setBirthMonth('');
                  setBirthDay('');
                }}
                className="flex-1 bg-white border border-purple-300 text-purple-600 font-medium py-3 rounded-md hover:bg-purple-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                다시 보기
              </motion.button>
              
              <motion.button
                onClick={saveAsImage}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 rounded-md hover:opacity-90 transition-all shadow-md flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Camera className="w-5 h-5 mr-2" />
                이미지로 저장
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 