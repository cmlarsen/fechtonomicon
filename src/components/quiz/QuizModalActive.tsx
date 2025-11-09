import React from 'react';
import { Modal } from 'react-native';
import type { Term } from '../../types/term';
import type { QuestionData } from '../../utils/quizUtils';
import { BackgroundPattern } from '../BackgroundPattern';
import { ActiveQuiz } from './ActiveQuiz';

interface QuizModalActiveProps {
  visible: boolean;
  currentQuestion: QuestionData;
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
}

export const QuizModalActive: React.FC<QuizModalActiveProps> = ({
  visible,
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
}) => {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <BackgroundPattern>
        <ActiveQuiz
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
      </BackgroundPattern>
    </Modal>
  );
};
