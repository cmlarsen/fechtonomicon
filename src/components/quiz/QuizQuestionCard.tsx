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
    alignItems: 'center',
  },
  originalTerm: {
    fontSize: fontSize.xxxl,
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
    fontFamily: fontFamily.bodyBoldItalic,

    color: colors.iron.main,
    textAlign: 'center',
    lineHeight: fontSize.md * 1.2,
  },
});
