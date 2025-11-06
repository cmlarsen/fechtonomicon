import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';

interface QuizScoreDisplayProps {
  correct: number;
  total: number;
}

export const QuizScoreDisplay: React.FC<QuizScoreDisplayProps> = ({ correct, total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>
        {correct} out of {total} correct
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.parchment.light,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gold.main,
    ...{
      shadowColor: colors.gold.dark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
  },
  scoreText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
    textAlign: 'center',
  },
});
