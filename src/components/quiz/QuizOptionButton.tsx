import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, fontFamily, fontSize, spacing } from '../../theme/tokens';

interface QuizOptionButtonProps {
  option: string;
  index: number;
  selectedIndex: number | null;
  correctIndex: number;
  showFeedback: boolean;
  onSelect: (index: number) => void;
}

export const QuizOptionButton: React.FC<QuizOptionButtonProps> = ({
  option,
  index,
  selectedIndex,
  correctIndex,
  showFeedback,
  onSelect,
}) => {
  const getButtonStyle = () => {
    if (!showFeedback) {
      return [styles.optionButton, selectedIndex === index && styles.optionButtonSelected];
    }

    if (index === correctIndex) {
      return [styles.optionButton, styles.optionButtonCorrect];
    }

    if (index === selectedIndex && index !== correctIndex) {
      return [styles.optionButton, styles.optionButtonIncorrect];
    }

    return styles.optionButton;
  };

  const getTextStyle = () => {
    if (!showFeedback) {
      return styles.optionText;
    }

    if (index === correctIndex) {
      return [styles.optionText, styles.optionTextCorrect];
    }

    if (index === selectedIndex && index !== correctIndex) {
      return [styles.optionText, styles.optionTextIncorrect];
    }

    return styles.optionText;
  };

  const _showCheckmark = showFeedback && index === correctIndex;

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={() => onSelect(index)}
      disabled={showFeedback || selectedIndex !== null}
      activeOpacity={0.8}
    >
      <View style={styles.optionContent}>
        <Text style={getTextStyle()}>{option}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    backgroundColor: colors.parchment.primary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: colors.gold.main,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'stretch',
    ...{
      shadowColor: colors.gold.dark,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
  },
  optionButtonSelected: {
    borderColor: colors.gold.dark,
    borderWidth: 2,
    transform: [{ scale: 1.02 }],
  },
  optionButtonCorrect: {
    borderColor: colors.green.light,
    borderWidth: 2,
  },
  optionButtonIncorrect: {
    borderColor: colors.burgundy.light,
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: spacing.xs,
    width: '100%',
    padding: spacing.xs,
  },
  optionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyMedium,
    color: colors.iron.dark,
    textAlign: 'left',
    flex: 1,
  },
  optionTextCorrect: {
    color: colors.iron.dark,
    fontFamily: fontFamily.bodySemiBold,
  },
  optionTextIncorrect: {
    color: colors.iron.dark,
  },
  checkmark: {
    fontSize: fontSize.xl,
    color: colors.green.light,
    fontFamily: fontFamily.bodyBold,
    flexShrink: 0,
  },
});
