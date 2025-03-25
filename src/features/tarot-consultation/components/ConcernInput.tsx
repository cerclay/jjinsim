"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Ellipsis } from "lucide-react";

type ConcernInputProps = {
  onSubmit: (concern: string) => void;
  isLoading?: boolean;
};

export function ConcernInput({ onSubmit, isLoading = false }: ConcernInputProps) {
  const [concern, setConcern] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const exampleConcerns = [
    "직장에서 승진 기회가 생길까요?",
    "요즘 만나는 사람과 발전 가능성이 있을까요?",
    "이직을 고민하고 있는데 결정을 어떻게 내려야 할까요?",
    "다른 도시로 이사하는 것이 좋을까요?",
    "현재 제 건강 상태는 어떤가요?",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (concern.trim().length < 5) {
      setError("고민을 좀 더 자세히 적어주세요 (최소 5자 이상)");
      return;
    }
    
    onSubmit(concern);
  };

  const handleExampleClick = (example: string) => {
    setConcern(example);
    setTouched(true);
    setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
        <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
          <Sparkles className="inline-block mr-2 text-purple-600" size={20} />
          당신의 고민을 알려주세요
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <textarea
              value={concern}
              onChange={(e) => {
                setConcern(e.target.value);
                setTouched(true);
                if (e.target.value.trim().length >= 5) {
                  setError("");
                }
              }}
              placeholder="타로 상담을 위해 고민이나 궁금한 점을 자세히 적어주세요..."
              className={`w-full p-4 rounded-lg border ${
                error && touched ? "border-red-300" : "border-purple-300"
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all outline-none bg-white text-gray-800 text-base shadow-inner`}
              rows={4}
            />
            <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-purple-700">
              고민 입력
            </div>
            {error && touched && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          
          <div className="flex justify-between items-center flex-wrap gap-3">
            <button
              type="submit"
              disabled={isLoading || concern.trim().length < 5}
              className={`px-6 py-3 rounded-lg text-white font-medium flex items-center ${
                isLoading || concern.trim().length < 5
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              } transition-colors shadow-md`}
            >
              {isLoading ? (
                <>
                  <Ellipsis className="animate-pulse mr-2" size={18} />
                  상담 준비 중...
                </>
              ) : (
                <>
                  <Send className="mr-2" size={18} />
                  타로 상담 시작하기
                </>
              )}
            </button>
            
            {!touched && (
              <button
                type="button"
                className="text-purple-600 text-sm hover:text-purple-800 transition-colors font-medium"
                onClick={() => {
                  const randomExample = exampleConcerns[Math.floor(Math.random() * exampleConcerns.length)];
                  setConcern(randomExample);
                  setTouched(true);
                }}
              >
                랜덤 예시 사용
              </button>
            )}
          </div>
        </form>
        
        {/* 예시 고민 모음 */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">예시 고민:</h3>
          <div className="flex flex-wrap gap-2">
            {exampleConcerns.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full hover:bg-purple-100 transition-colors shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {example.length > 20 ? example.substring(0, 20) + "..." : example}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 