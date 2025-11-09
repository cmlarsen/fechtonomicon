import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../../components/buttons';
import { animation, spacing } from '../../theme/tokens';
import type { QuestionData } from '../../utils/quizUtils';
import { FeedbackPanel } from './FeedbackPanel';
import { QuizExitButton } from './QuizExitButton';
import { QuizProgressBar } from './QuizProgressBar';
import { QuizQuestion } from './QuizQuestion';
import { QuizQuestionCard } from './QuizQuestionCard';

interface ActiveQuizProps {
  currentQuestion: QuestionData;
  quizCards: unknown[];
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

export const ActiveQuiz: React.FC<ActiveQuizProps> = ({
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <QuizExitButton onPress={onExit} />
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
            <QuizQuestion
              options={currentQuestion.options}
              selectedIndex={selectedAnswer}
              correctIndex={currentQuestion.correctIndex}
              showFeedback={isChecked}
              onSelect={onAnswerSelect}
              isChecked={isChecked}
            />
          </View>
        </View>
      </ScrollView>

      {!isChecked && (
        <Animated.View style={[styles.footer, { opacity: checkButtonOpacity }]}>
          <PrimaryButton
            title="Check"
            onPress={onCheck}
            size="medium"
            disabled={selectedAnswer === null}
          />
        </Animated.View>
      )}

      <FeedbackPanel
        visible={showFeedbackPanel}
        isCorrect={isCorrectAnswer}
        onContinue={onContinue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
});
