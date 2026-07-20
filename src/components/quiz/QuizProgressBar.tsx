import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';

interface QuizProgressBarProps {
  /** 1-indexed number of the current question, used for the progress fill. */
  current: number;
  /** Total number of questions in the quiz. */
  total: number;
  /** Number of questions answered correctly so far. */
  correct: number;
  /** Number of questions answered so far, used as the score denominator. */
  answered: number;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  current,
  total,
  correct,
  answered,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: current / total,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [current, total, progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Score is correct answers over questions actually answered, not the current
  // question number. Using the question number diluted the score by the
  // in-progress question (e.g. 2 correct out of 2 answered showing as 67%).
  const scorePercentage = answered > 0 ? Math.round((correct / answered) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.scoreText}>Score: {scorePercentage}%</Text>
      </View>
      <View style={styles.barContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: spacing.md,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  scoreText: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.titleBold,
    color: colors.iron.dark,
  },
  progressText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyMedium,
    color: colors.iron.main,
  },
  barContainer: {
    height: 8,
    backgroundColor: colors.parchment.dark,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gold.main,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.gold.main,
    borderRadius: 4,
  },
});
