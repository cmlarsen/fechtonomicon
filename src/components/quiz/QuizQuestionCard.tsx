import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';
import type { Flashcard } from '../../types/flashcard';

interface QuizQuestionCardProps {
  card: Flashcard;
  questionText: string;
}

export const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({ card, questionText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.originalTerm}>{card.originalTerm}</Text>
      <Text style={styles.questionText}>{questionText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.parchment.light,
    borderRadius: 24,
    padding: spacing.md,
    borderWidth: 3,
    borderColor: colors.gold.main,
    alignItems: 'center',
    shadowColor: colors.gold.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  originalTerm: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    marginBottom: spacing.xs,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  questionText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyMedium,
    color: colors.iron.main,
    textAlign: 'center',
    lineHeight: fontSize.md * 1.2,
  },
});
