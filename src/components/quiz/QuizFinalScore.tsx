import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';
import { PrimaryButton, SecondaryButton } from '../buttons';

interface QuizFinalScoreProps {
  correct: number;
  total: number;
  onRestart: () => void;
  onExit: () => void;
}

export const QuizFinalScore: React.FC<QuizFinalScoreProps> = ({
  correct,
  total,
  onRestart,
  onExit,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

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
      <View style={styles.content}>
        <Text style={styles.title}>Quiz Complete!</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {correct} out of {total}
          </Text>
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton title="Restart Quiz" onPress={onRestart} size="large" />
          <SecondaryButton
            title="Exit to Cards"
            onPress={onExit}
            size="large"
            variant="parchment"
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    backgroundColor: colors.parchment.light,
    borderRadius: 20,
    padding: spacing.xxl,
    borderWidth: 3,
    borderColor: colors.gold.main,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    ...{
      shadowColor: colors.gold.dark,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
  },
  title: {
    fontSize: fontSize.xxxl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  scoreText: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bodyBold,
    color: colors.iron.dark,
    marginBottom: spacing.sm,
  },
  percentageText: {
    fontSize: fontSize.xxxl,
    fontFamily: fontFamily.title,
    color: colors.gold.dark,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
  },
});
