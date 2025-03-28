'use client';

import { useStressCheck } from '../hooks/useStressCheck';
import { IntroSection } from './IntroSection';
import { QuestionSection } from './QuestionSection';
import { ResultSection } from './ResultSection';
import { AnimatePresence, motion } from 'framer-motion';

export function StressCheck() {
  const {
    currentStep,
    currentQuestion,
    currentQuestionIndex,
    progress,
    result,
    totalQuestions,
    startTest,
    submitAnswer,
    resetTest
  } = useStressCheck();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <AnimatePresence mode="wait">
        {currentStep === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <IntroSection onStart={startTest} />
          </motion.div>
        )}

        {currentStep === 'question' && currentQuestion && (
          <motion.div
            key={`question-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <QuestionSection
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              progress={progress}
              onSubmit={submitAnswer}
            />
          </motion.div>
        )}

        {currentStep === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="w-full"
          >
            <ResultSection result={result} onReset={resetTest} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 