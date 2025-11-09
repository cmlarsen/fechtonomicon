import React from 'react';
import type { Term } from '../../types/term';
import type { QuestionData } from '../../utils/quizUtils';
import { QuizModalActive } from './QuizModalActive';
import { QuizModalComplete } from './QuizModalComplete';
import { QuizModalLoading } from './QuizModalLoading';

interface QuizModalProps {
  visible: boolean;
  isComplete: boolean;
  currentQuestion: QuestionData | null;
  quizCards: Term[];
  score: { correct: number; total: number };
  selectedAnswer: number | null;
  isChecked: boolean;
  showFeedbackPanel: boolean;
  isCorrectAnswer: boolean;
  onAnswerSelect: (index: number) => void;
  onCheck: () => void;
  onContinue: () => void;
  onExit: () => void;
  onRestart: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  visible,
  isComplete,
  currentQuestion,
  quizCards,
  score,
  selectedAnswer,
  isChecked,
  showFeedbackPanel,
  isCorrectAnswer,
  onAnswerSelect,
  onCheck,
  onContinue,
  onExit,
  onRestart,
}) => {
  if (isComplete) {
    return (
      <QuizModalComplete visible={visible} score={score} onRestart={onRestart} onExit={onExit} />
    );
  }

  if (!currentQuestion || quizCards.length === 0) {
    return <QuizModalLoading visible={visible} onExit={onExit} />;
  }

  return (
    <QuizModalActive
      visible={visible}
      currentQuestion={currentQuestion}
      quizCards={quizCards}
      score={score}
      selectedAnswer={selectedAnswer}
      isChecked={isChecked}
      showFeedbackPanel={showFeedbackPanel}
      isCorrectAnswer={isCorrectAnswer}
      onAnswerSelect={onAnswerSelect}
      onCheck={onCheck}
      onContinue={onContinue}
      onExit={onExit}
    />
  );
};
