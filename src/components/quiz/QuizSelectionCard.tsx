import React from 'react';
import { StyleSheet, View } from 'react-native';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../../theme/tokens';
import { PrimaryButton, SecondaryButton } from '../buttons';

interface QuizSelectionCardProps {
  onQuickQuiz: () => void;
  onFullQuiz: () => void;
}

export const QuizSelectionCard: React.FC<QuizSelectionCardProps> = ({
  onQuickQuiz,
  onFullQuiz,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Quick Quiz (10)" onPress={onQuickQuiz} size="medium" />
        <SecondaryButton title="Long Quiz (50)" onPress={onFullQuiz} size="medium" />
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
