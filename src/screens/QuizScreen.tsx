import { usePostHog } from 'posthog-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { PrimaryButton } from '../components/buttons';
import { FeedbackPanel } from '../components/quiz/FeedbackPanel';
import { QuestionTypeApplication } from '../components/quiz/QuestionTypeApplication';
import { QuestionTypeDefinition } from '../components/quiz/QuestionTypeDefinition';
import { QuestionTypeTranslate } from '../components/quiz/QuestionTypeTranslate';
import { QuizExitButton } from '../components/quiz/QuizExitButton';
import { QuizFinalScore } from '../components/quiz/QuizFinalScore';
import { QuizProgressBar } from '../components/quiz/QuizProgressBar';
import { QuizQuestionCard } from '../components/quiz/QuizQuestionCard';
import { QuizSelectionCard } from '../components/quiz/QuizSelectionCard';
import { useFlashcardStore } from '../store/flashcardStore';
import { animation, colors, fontFamily, fontSize, spacing } from '../theme/tokens';
import type { Discipline, Flashcard } from '../types/flashcard';
import {
  generateQuestion,
  prepareFullQuiz,
  prepareQuickQuiz,
  type QuestionData,
} from '../utils/quizUtils';

interface QuizScreenProps {
  navigation: {
    goBack: () => void;
  };
}

type QuizMode = 'quick' | 'full';

export const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const posthog = usePostHog();
  const allCards = useFlashcardStore((state) => state.allCards);
  const insets = useSafeAreaInsets();

  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [quizMode, setQuizMode] = useState<QuizMode | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [quizCards, setQuizCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const checkButtonOpacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (selectedAnswer !== null && !isChecked) {
      Animated.timing(checkButtonOpacity, {
        toValue: 1,
        duration: animation.fast,
        useNativeDriver: true,
      }).start();
    } else if (selectedAnswer === null) {
      Animated.timing(checkButtonOpacity, {
        toValue: 0.5,
        duration: animation.fast,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedAnswer, isChecked, checkButtonOpacity]);

  const handleSelectQuiz = useCallback(
    (discipline: Discipline, mode: QuizMode) => {
      setSelectedDiscipline(discipline);
      setQuizMode(mode);

      const prepared =
        mode === 'quick'
          ? prepareQuickQuiz(allCards, [discipline])
          : prepareFullQuiz(allCards, [discipline]);

      if (prepared.length === 0) {
        return;
      }

      setQuizCards(prepared);
      setCurrentIndex(0);
      setScore({ correct: 0, total: 0 });
      setSelectedAnswer(null);
      setIsChecked(false);
      setShowFeedbackPanel(false);
      setIsComplete(false);

      const firstQuestion = generateQuestion(prepared[0], allCards, [discipline]);
      if (firstQuestion) {
        setCurrentQuestion(firstQuestion);
      }

      setModalVisible(true);

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
      if (isChecked || selectedAnswer !== null) return;
      setSelectedAnswer(index);
    },
    [isChecked, selectedAnswer]
  );

  const handleCheck = useCallback(() => {
    if (selectedAnswer === null || !currentQuestion || isChecked) return;

    setIsChecked(true);
    const correct = selectedAnswer === currentQuestion.correctIndex;
    setIsCorrectAnswer(correct);

    const newTotal = score.total + 1;
    const newCorrect = correct ? score.correct + 1 : score.correct;
    setScore({ correct: newCorrect, total: newTotal });

    setShowFeedbackPanel(true);

    posthog?.capture('quiz_answer_checked', {
      isCorrect: correct,
      questionType: currentQuestion.type,
      cardId: currentQuestion.card.id,
    });
  }, [selectedAnswer, currentQuestion, isChecked, score, posthog]);

  const handleContinue = useCallback(() => {
    setShowFeedbackPanel(false);

    const nextIndex = currentIndex + 1;

    if (nextIndex >= quizCards.length) {
      setIsComplete(true);
      posthog?.capture('quiz_completed', {
        score: score.correct,
        total: score.total,
        discipline: selectedDiscipline,
        mode: quizMode,
      });
      return;
    }

    setCurrentIndex(nextIndex);
    setSelectedAnswer(null);
    setIsChecked(false);

    if (!selectedDiscipline) return;

    const nextCard = quizCards[nextIndex];
    const nextQuestion = generateQuestion(nextCard, allCards, [selectedDiscipline]);

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleContinue();
    }
  }, [currentIndex, quizCards, allCards, selectedDiscipline, score, quizMode, posthog]);

  const handleExit = useCallback(() => {
    if (isComplete) {
      setModalVisible(false);
      setSelectedDiscipline(null);
      setQuizMode(null);
      setQuizCards([]);
      setCurrentQuestion(null);
      setCurrentIndex(0);
      setScore({ correct: 0, total: 0 });
      setSelectedAnswer(null);
      setIsChecked(false);
      setShowFeedbackPanel(false);
      setIsComplete(false);
      return;
    }

    if (modalVisible) {
      posthog?.capture('quiz_exited', {
        score: score.correct,
        total: score.total,
        progress: currentIndex,
        discipline: selectedDiscipline,
        mode: quizMode,
      });
      setModalVisible(false);
      setSelectedDiscipline(null);
      setQuizMode(null);
      setQuizCards([]);
      setCurrentQuestion(null);
      setCurrentIndex(0);
      setScore({ correct: 0, total: 0 });
      setSelectedAnswer(null);
      setIsChecked(false);
      setShowFeedbackPanel(false);
      return;
    }

    navigation.goBack();
  }, [
    isComplete,
    modalVisible,
    navigation,
    score,
    currentIndex,
    selectedDiscipline,
    quizMode,
    posthog,
  ]);

  const handleRestart = useCallback(() => {
    if (!selectedDiscipline || !quizMode) return;

    const prepared =
      quizMode === 'quick'
        ? prepareQuickQuiz(allCards, [selectedDiscipline])
        : prepareFullQuiz(allCards, [selectedDiscipline]);

    setQuizCards(prepared);
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setSelectedAnswer(null);
    setIsChecked(false);
    setShowFeedbackPanel(false);
    setIsComplete(false);

    const firstQuestion = generateQuestion(prepared[0], allCards, [selectedDiscipline]);
    if (firstQuestion) {
      setCurrentQuestion(firstQuestion);
    }

    posthog?.capture('quiz_restarted', {
      discipline: selectedDiscipline,
      mode: quizMode,
    });
  }, [allCards, selectedDiscipline, quizMode, posthog]);

  const renderQuizModal = () => {
    if (isComplete) {
      return (
        <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
          <BackgroundPattern>
            <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
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
        </Modal>
      );
    }

    if (!currentQuestion || quizCards.length === 0) {
      return (
        <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
          <BackgroundPattern>
            <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
              <View style={styles.header}>
                <QuizExitButton onPress={handleExit} />
              </View>
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Preparing quiz...</Text>
              </View>
            </View>
          </BackgroundPattern>
        </Modal>
      );
    }

    return (
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <BackgroundPattern>
          <View style={[styles.modalContainer]}>
            <View style={styles.header}>
              <QuizExitButton onPress={handleExit} />
            </View>
            <View style={styles.progressBarContainer}>
              <QuizProgressBar
                current={score.total + 1}
                total={quizCards.length}
                correct={score.correct}
              />
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
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
                      showFeedback={isChecked}
                      onSelect={handleAnswerSelect}
                      isChecked={isChecked}
                    />
                  )}
                  {currentQuestion.type === 'definition' && (
                    <QuestionTypeDefinition
                      options={currentQuestion.options}
                      selectedIndex={selectedAnswer}
                      correctIndex={currentQuestion.correctIndex}
                      showFeedback={isChecked}
                      onSelect={handleAnswerSelect}
                      isChecked={isChecked}
                    />
                  )}
                  {currentQuestion.type === 'application' && (
                    <QuestionTypeApplication
                      options={currentQuestion.options}
                      selectedIndex={selectedAnswer}
                      correctIndex={currentQuestion.correctIndex}
                      showFeedback={isChecked}
                      onSelect={handleAnswerSelect}
                      isChecked={isChecked}
                    />
                  )}
                </View>
              </View>
            </ScrollView>

            {!isChecked && (
              <Animated.View style={[styles.footer, { opacity: checkButtonOpacity }]}>
                <PrimaryButton
                  title="Check"
                  onPress={handleCheck}
                  size="medium"
                  disabled={selectedAnswer === null}
                />
              </Animated.View>
            )}

            <FeedbackPanel
              visible={showFeedbackPanel}
              isCorrect={isCorrectAnswer}
              onContinue={handleContinue}
            />
          </View>
        </BackgroundPattern>
      </Modal>
    );
  };

  return (
    <BackgroundPattern>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView
          style={styles.selectionScrollView}
          contentContainerStyle={styles.selectionContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Choose Your Challenge</Text>

            <View style={styles.cardsContainer}>
              <QuizSelectionCard
                discipline="italian-longsword"
                onQuickQuiz={() => handleSelectQuiz('italian-longsword', 'quick')}
                onFullQuiz={() => handleSelectQuiz('italian-longsword', 'full')}
              />
              <QuizSelectionCard
                discipline="german-longsword"
                onQuickQuiz={() => handleSelectQuiz('german-longsword', 'quick')}
                onFullQuiz={() => handleSelectQuiz('german-longsword', 'full')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      {renderQuizModal()}
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
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
  selectionScrollView: {
    flex: 1,
  },
  selectionContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  selectionContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xl,
    paddingVertical: spacing.xl,
  },
  selectionTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    textAlign: 'center',
  },
  selectionDescription: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    textAlign: 'center',
    lineHeight: fontSize.md * 1.6,
  },
  cardsContainer: {
    gap: spacing.xl,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,

    paddingBottom: spacing.md,
  },
});
