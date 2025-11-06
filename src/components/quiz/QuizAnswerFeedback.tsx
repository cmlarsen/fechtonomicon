import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';

interface QuizAnswerFeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
}

export const QuizAnswerFeedback: React.FC<QuizAnswerFeedbackProps> = ({
  isCorrect,
  correctAnswer,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View
        style={[
          styles.feedbackBox,
          isCorrect ? styles.feedbackBoxCorrect : styles.feedbackBoxIncorrect,
        ]}
      >
        <Text
          style={[
            styles.feedbackText,
            isCorrect ? styles.feedbackTextCorrect : styles.feedbackTextIncorrect,
          ]}
        >
          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
        </Text>
        {!isCorrect && (
          <Text style={styles.correctAnswerText}>Correct answer: {correctAnswer}</Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    width: '100%',
  },
  feedbackBox: {
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  feedbackBoxCorrect: {
    backgroundColor: colors.gold.light,
    borderColor: colors.gold.dark,
  },
  feedbackBoxIncorrect: {
    backgroundColor: colors.burgundy.lighter,
    borderColor: colors.burgundy.main,
  },
  feedbackText: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bodyBold,
    marginBottom: spacing.sm,
  },
  feedbackTextCorrect: {
    color: colors.iron.dark,
  },
  feedbackTextIncorrect: {
    color: colors.burgundy.dark,
  },
  correctAnswerText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyMedium,
    color: colors.iron.dark,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
