import { usePostHog } from 'posthog-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { PrimaryButton } from '../components/buttons';
import { QuestionTypeApplication } from '../components/quiz/QuestionTypeApplication';
import { QuestionTypeDefinition } from '../components/quiz/QuestionTypeDefinition';
import { QuestionTypeTranslate } from '../components/quiz/QuestionTypeTranslate';
import { QuizExitButton } from '../components/quiz/QuizExitButton';
import { QuizFinalScore } from '../components/quiz/QuizFinalScore';
import { QuizProgressBar } from '../components/quiz/QuizProgressBar';
import { QuizQuestionCard } from '../components/quiz/QuizQuestionCard';
import { useFlashcardStore } from '../store/flashcardStore';
import { colors, fontFamily, fontSize, spacing } from '../theme/tokens';
import type { Flashcard } from '../types/flashcard';
import { generateQuestion, prepareQuizCards, type QuestionData } from '../utils/quizUtils';

interface QuizScreenProps {
  navigation: {
    goBack: () => void;
  };
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const posthog = usePostHog();
  const allCards = useFlashcardStore((state) => state.allCards);
  const selectedDisciplines = useFlashcardStore((state) => state.selectedDisciplines);
  const insets = useSafeAreaInsets();

  const [quizCards, setQuizCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const scoreScaleAnim = useRef(1);

  const handleStartQuiz = useCallback(() => {
    const prepared = prepareQuizCards(allCards, selectedDisciplines);
    if (prepared.length === 0) {
      Alert.alert('No Cards Available', 'Please select at least one discipline with cards.');
      return;
    }

    setQuizCards(prepared);
    setQuizStarted(true);
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowNextButton(false);
    setIsComplete(false);

    const firstQuestion = generateQuestion(prepared[0], allCards, selectedDisciplines);
    if (firstQuestion) {
      setCurrentQuestion(firstQuestion);
    }

    posthog?.capture('quiz_started', {
      cardCount: prepared.length,
      disciplines: selectedDisciplines,
    });
  }, [allCards, selectedDisciplines, posthog]);

  const handleAnswerSelect = useCallback(
    (index: number) => {
      if (showFeedback || selectedAnswer !== null || !currentQuestion) return;

      setSelectedAnswer(index);
      const isCorrect = index === currentQuestion.correctIndex;

      // Short delay before showing feedback
      setTimeout(() => {
        setShowFeedback(true);
        setShowNextButton(true);

        const newTotal = score.total + 1;
        const newCorrect = isCorrect ? score.correct + 1 : score.correct;

        setScore({ correct: newCorrect, total: newTotal });

        if (isCorrect) {
          // Success animation trigger
          scoreScaleAnim.current = 1.2;
          setTimeout(() => {
            scoreScaleAnim.current = 1;
          }, 300);
        }

        posthog?.capture('quiz_answer_selected', {
          isCorrect,
          questionType: currentQuestion.type,
          cardId: currentQuestion.card.id,
        });
      }, 400);
    },
    [showFeedback, selectedAnswer, currentQuestion, score, posthog]
  );

  const handleNext = useCallback(() => {
    if (!showNextButton) return;

    const nextIndex = currentIndex + 1;

    if (nextIndex >= quizCards.length) {
      setIsComplete(true);
      posthog?.capture('quiz_completed', {
        score: score.correct,
        total: score.total + 1,
      });
      return;
    }

    // Reset state for next question
    setCurrentIndex(nextIndex);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowNextButton(false);

    const nextCard = quizCards[nextIndex];
    const nextQuestion = generateQuestion(nextCard, allCards, selectedDisciplines);

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Skip cards that can't generate questions
      handleNext();
    }
  }, [showNextButton, currentIndex, quizCards, allCards, selectedDisciplines, score, posthog]);

  const handleExit = useCallback(() => {
    if (isComplete) {
      navigation.goBack();
      return;
    }

    if (quizStarted) {
      posthog?.capture('quiz_exited', {
        score: score.correct,
        total: score.total,
        progress: currentIndex,
      });
      setQuizStarted(false);
      setQuizCards([]);
      setCurrentQuestion(null);
      setCurrentIndex(0);
      setScore({ correct: 0, total: 0 });
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowNextButton(false);
      return;
    }

    navigation.goBack();
  }, [isComplete, quizStarted, navigation, score, currentIndex, posthog]);

  const handleRestart = useCallback(() => {
    const prepared = prepareQuizCards(allCards, selectedDisciplines);
    setQuizCards(prepared);
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowNextButton(false);
    setIsComplete(false);
    setQuizStarted(true);

    const firstQuestion = generateQuestion(prepared[0], allCards, selectedDisciplines);
    if (firstQuestion) {
      setCurrentQuestion(firstQuestion);
    }

    posthog?.capture('quiz_restarted');
  }, [allCards, selectedDisciplines, posthog]);

  // Show start screen if quiz hasn't started
  if (!quizStarted) {
    return (
      <BackgroundPattern>
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <View style={styles.header}>
            <QuizExitButton onPress={handleExit} />
          </View>
          <View style={styles.startContainer}>
            <Text style={styles.startTitle}>Ready to Test Your Knowledge?</Text>
            <Text style={styles.startDescription}>
              Answer questions about HEMA terms and concepts. You'll be quizzed on translations,
              definitions, and applications.
            </Text>
            <PrimaryButton title="Start Quiz" onPress={handleStartQuiz} size="large" />
          </View>
        </View>
      </BackgroundPattern>
    );
  }

  if (isComplete) {
    return (
      <BackgroundPattern>
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <View style={styles.header}>
            <QuizExitButton onPress={handleExit} />
          </View>
          <QuizFinalScore
            correct={score.correct}
            total={score.total}
            onRestart={handleRestart}
            onExit={handleExit}
          />
        </View>
      </BackgroundPattern>
    );
  }

  if (!currentQuestion || quizCards.length === 0) {
    return (
      <BackgroundPattern>
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <View style={styles.header}>
            <QuizExitButton onPress={handleExit} />
          </View>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Preparing quiz...</Text>
          </View>
        </View>
      </BackgroundPattern>
    );
  }

  return (
    <BackgroundPattern>
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.header}>
          <QuizProgressBar
            current={score.total + 1}
            total={quizCards.length}
            correct={score.correct}
          />
          <QuizExitButton onPress={handleExit} />
        </View>

        <View style={styles.content}>
          <View style={styles.questionContainer}>
            <QuizQuestionCard
              card={currentQuestion.card}
              questionText={currentQuestion.questionText}
            />

            <View style={styles.optionsContainer}>
              {currentQuestion.type === 'translate' && (
                <QuestionTypeTranslate
                  options={currentQuestion.options}
                  selectedIndex={selectedAnswer}
                  correctIndex={currentQuestion.correctIndex}
                  showFeedback={showFeedback}
                  onSelect={handleAnswerSelect}
                />
              )}
              {currentQuestion.type === 'definition' && (
                <QuestionTypeDefinition
                  options={currentQuestion.options}
                  selectedIndex={selectedAnswer}
                  correctIndex={currentQuestion.correctIndex}
                  showFeedback={showFeedback}
                  onSelect={handleAnswerSelect}
                />
              )}
              {currentQuestion.type === 'application' && (
                <QuestionTypeApplication
                  options={currentQuestion.options}
                  selectedIndex={selectedAnswer}
                  correctIndex={currentQuestion.correctIndex}
                  showFeedback={showFeedback}
                  onSelect={handleAnswerSelect}
                />
              )}
            </View>
          </View>
        </View>

        {showNextButton && (
          <View style={styles.footer}>
            <PrimaryButton title="Next" onPress={handleNext} size="large" />
          </View>
        )}
      </View>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  content: {
    flex: 1,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    justifyContent: 'flex-start',
  },
  questionContainer: {
    gap: spacing.lg,
  },
  optionsContainer: {
    marginTop: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    paddingTop: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fontSize.lg,
    fontFamily: 'CormorantGaramond-Medium',
    color: colors.iron.main,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
  startTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  startDescription: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    textAlign: 'center',
    lineHeight: fontSize.md * 1.6,
    marginBottom: spacing.lg,
  },
});
