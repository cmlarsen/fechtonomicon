import React from 'react';
import { QuizModal } from '../components/quiz/QuizModal';
import { QuizSelection } from '../components/quiz/QuizSelection';
import { useQuiz } from '../hooks/useQuiz';

interface QuizScreenProps {
  navigation: {
    goBack: () => void;
  };
}

export const QuizScreen: React.FC<QuizScreenProps> = () => {
  const {
    state,
    handleSelectQuiz,
    handleAnswerSelect,
    handleCheck,
    handleContinue,
    handleExit,
    handleRestart,
  } = useQuiz();

  return (
    <>
      <QuizSelection onSelectQuiz={handleSelectQuiz} />
      <QuizModal
        visible={state.modalVisible}
        isComplete={state.isComplete}
        currentQuestion={state.currentQuestion}
        quizCards={state.quizCards}
        score={state.score}
        selectedAnswer={state.selectedAnswer}
        isChecked={state.isChecked}
        showFeedbackPanel={state.showFeedbackPanel}
        isCorrectAnswer={state.isCorrectAnswer}
        onAnswerSelect={handleAnswerSelect}
        onCheck={handleCheck}
        onContinue={handleContinue}
        onExit={handleExit}
        onRestart={handleRestart}
      />
    </>
  );
};
