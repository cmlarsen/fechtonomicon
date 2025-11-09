import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../../theme/tokens';
import { DISCIPLINE_INFO, type Discipline } from '../../types/term';
import { PrimaryButton, SecondaryButton } from '../buttons';

interface QuizSelectionCardProps {
  discipline: Discipline;
  onQuickQuiz: () => void;
  onFullQuiz: () => void;
}

export const QuizSelectionCard: React.FC<QuizSelectionCardProps> = ({
  discipline,
  onQuickQuiz,
  onFullQuiz,
}) => {
  const disciplineInfo = DISCIPLINE_INFO[discipline];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{disciplineInfo.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Quick Quiz (10)" onPress={onQuickQuiz} size="small" />
        <SecondaryButton title="Full Quiz (50)" onPress={onFullQuiz} size="small" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.parchment.light,
    borderRadius: borderRadius.xl,
    borderWidth: 3,
    borderColor: colors.gold.main,
    padding: spacing.xl,
    gap: spacing.lg,
    ...shadows.parchment,
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: spacing.md,
  },
});
