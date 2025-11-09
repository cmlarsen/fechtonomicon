import { usePostHog } from 'posthog-react-native';
import { useCallback, useState } from 'react';
import { useTermStore } from '../store/termStore';
import type { Discipline, Term } from '../types/term';
import {
  generateQuestion,
  prepareFullQuiz,
  prepareQuickQuiz,
  type QuestionData,
} from '../utils/quizUtils';

type QuizMode = 'quick' | 'full';

interface QuizState {
  selectedDiscipline: Discipline | null;
  quizMode: QuizMode | null;
  modalVisible: boolean;
  quizCards: Term[];
  currentIndex: number;
  score: { correct: number; total: number };
  currentQuestion: QuestionData | null;
  selectedAnswer: number | null;
  isChecked: boolean;
  showFeedbackPanel: boolean;
  isComplete: boolean;
  isCorrectAnswer: boolean;
}

export const useQuiz = () => {
  const posthog = usePostHog();
  const allCards = useTermStore((state) => state.allCards);

  const [state, setState] = useState<QuizState>({
    selectedDiscipline: null,
    quizMode: null,
    modalVisible: false,
    quizCards: [],
    currentIndex: 0,
    score: { correct: 0, total: 0 },
    currentQuestion: null,
    selectedAnswer: null,
    isChecked: false,
    showFeedbackPanel: false,
    isComplete: false,
    isCorrectAnswer: false,
  });

  const handleSelectQuiz = useCallback(
    (discipline: Discipline, mode: QuizMode) => {
      const prepared =
        mode === 'quick'
          ? prepareQuickQuiz(allCards, [discipline])
          : prepareFullQuiz(allCards, [discipline]);

      if (prepared.length === 0) {
        return;
      }

      const firstQuestion = generateQuestion(prepared[0], allCards, [discipline]);

      setState({
        selectedDiscipline: discipline,
        quizMode: mode,
        modalVisible: true,
        quizCards: prepared,
        currentIndex: 0,
        score: { correct: 0, total: 0 },
        currentQuestion: firstQuestion,
        selectedAnswer: null,
        isChecked: false,
        showFeedbackPanel: false,
        isComplete: false,
        isCorrectAnswer: false,
      });

      posthog?.capture('quiz_started', {
        discipline,
        mode,
        cardCount: prepared.length,
      });
    },
    [allCards, posthog]
  );

  const handleAnswerSelect = useCallback(
    (index: number) => {
      if (state.isChecked) return;
      setState((prev) => ({ ...prev, selectedAnswer: index }));
    },
    [state.isChecked]
  );

  const handleCheck = useCallback(() => {
    if (state.selectedAnswer === null || !state.currentQuestion) return;

    const correct = state.selectedAnswer === state.currentQuestion.correctIndex;
    const newTotal = state.score.total + 1;
    const newCorrect = correct ? state.score.correct + 1 : state.score.correct;

    setState((prev) => ({
      ...prev,
      isChecked: true,
      isCorrectAnswer: correct,
      score: { correct: newCorrect, total: newTotal },
      showFeedbackPanel: true,
    }));

    posthog?.capture('quiz_answer_checked', {
      isCorrect: correct,
      questionType: state.currentQuestion.type,
      cardId: state.currentQuestion.card.id,
    });
  }, [state.selectedAnswer, state.currentQuestion, state.score, posthog]);

  const handleContinue = useCallback(() => {
    const nextIndex = state.currentIndex + 1;

    if (nextIndex >= state.quizCards.length) {
      setState((prev) => ({ ...prev, isComplete: true, showFeedbackPanel: false }));
      posthog?.capture('quiz_completed', {
        score: state.score.correct,
        total: state.score.total,
        discipline: state.selectedDiscipline,
        mode: state.quizMode,
      });
      return;
    }

    if (!state.selectedDiscipline) return;

    const nextCard = state.quizCards[nextIndex];
    const nextQuestion = generateQuestion(nextCard, allCards, [state.selectedDiscipline]);

    if (nextQuestion) {
      setState((prev) => ({
        ...prev,
        currentIndex: nextIndex,
        currentQuestion: nextQuestion,
        selectedAnswer: null,
        isChecked: false,
        showFeedbackPanel: false,
      }));
    } else {
      // Skip this question if generation failed
      setState((prev) => ({ ...prev, currentIndex: nextIndex }));
      handleContinue();
    }
  }, [
    state.currentIndex,
    state.quizCards,
    state.selectedDiscipline,
    state.score,
    state.quizMode,
    allCards,
    posthog,
  ]);

  const handleExit = useCallback(() => {
    if (!state.isComplete && state.modalVisible) {
      posthog?.capture('quiz_exited', {
        score: state.score.correct,
        total: state.score.total,
        progress: state.currentIndex,
        discipline: state.selectedDiscipline,
        mode: state.quizMode,
      });
    }

    setState({
      selectedDiscipline: null,
      quizMode: null,
      modalVisible: false,
      quizCards: [],
      currentIndex: 0,
      score: { correct: 0, total: 0 },
      currentQuestion: null,
      selectedAnswer: null,
      isChecked: false,
      showFeedbackPanel: false,
      isComplete: false,
      isCorrectAnswer: false,
    });
  }, [state, posthog]);

  const handleRestart = useCallback(() => {
    if (!state.selectedDiscipline || !state.quizMode) return;

    const prepared =
      state.quizMode === 'quick'
        ? prepareQuickQuiz(allCards, [state.selectedDiscipline])
        : prepareFullQuiz(allCards, [state.selectedDiscipline]);

    const firstQuestion = generateQuestion(prepared[0], allCards, [state.selectedDiscipline]);

    setState((prev) => ({
      ...prev,
      quizCards: prepared,
      currentIndex: 0,
      score: { correct: 0, total: 0 },
      currentQuestion: firstQuestion,
      selectedAnswer: null,
      isChecked: false,
      showFeedbackPanel: false,
      isComplete: false,
      isCorrectAnswer: false,
    }));

    posthog?.capture('quiz_restarted', {
      discipline: state.selectedDiscipline,
      mode: state.quizMode,
    });
  }, [allCards, state.selectedDiscipline, state.quizMode, posthog]);

  return {
    state,
    handleSelectQuiz,
    handleAnswerSelect,
    handleCheck,
    handleContinue,
    handleExit,
    handleRestart,
  };
};
