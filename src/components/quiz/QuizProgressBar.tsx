import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';

interface QuizProgressBarProps {
  current: number;
  total: number;
  correct: number;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({ current, total, correct }) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.scoreText}>
          {correct} / {current}
        </Text>
        <Text style={styles.progressText}>
          Question {current} of {total}
        </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  scoreText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
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
