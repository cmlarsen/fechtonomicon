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
  isChecked?: boolean;
}

export const QuizOptionButton: React.FC<QuizOptionButtonProps> = ({
  option,
  index,
  selectedIndex,
  correctIndex,
  onSelect,
  isChecked = false,
}) => {
  const isSelected = selectedIndex === index;
  const isCorrect = index === correctIndex;
  const isIncorrect = isSelected && !isCorrect;

  const getButtonStyle = () => {
    if (!isChecked) {
      return [styles.optionButton, isSelected && styles.optionButtonSelected];
    }

    if (isCorrect && isSelected) {
      return [styles.optionButton, styles.optionButtonCorrect];
    }

    if (isIncorrect) {
      return [styles.optionButton, styles.optionButtonIncorrect];
    }

    if (isCorrect) {
      return [styles.optionButton, styles.optionButtonCorrectUnselected];
    }

    return styles.optionButton;
  };

  const renderIndicator = () => {
    if (!isChecked) return null;

    if (isCorrect && isSelected) {
      return (
        <View style={[styles.indicator, styles.indicatorCorrect]}>
          <Text style={styles.indicatorIcon}>✓</Text>
        </View>
      );
    }

    if (isIncorrect) {
      return (
        <View style={[styles.indicator, styles.indicatorIncorrect]}>
          <Text style={styles.indicatorIcon}>✕</Text>
        </View>
      );
    }

    if (isCorrect) {
      return (
        <View style={[styles.indicator, styles.indicatorCorrectUnselected]}>
          <Text style={styles.indicatorIcon}>✓</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={() => onSelect(index)}
      disabled={isChecked}
      activeOpacity={0.8}
    >
      <View style={styles.optionContent}>
        <Text style={styles.optionText}>{option}</Text>
        {renderIndicator()}
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
    borderWidth: 3,
    borderColor: colors.parchment.dark,
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
    borderWidth: 3,
    backgroundColor: colors.parchment.light,
  },
  optionButtonCorrect: {
    borderColor: colors.green.main,
    borderWidth: 3,
    backgroundColor: colors.parchment.light,
  },
  optionButtonIncorrect: {
    borderColor: colors.burgundy.main,
    borderWidth: 3,
    backgroundColor: colors.parchment.primary,
  },
  optionButtonCorrectUnselected: {
    borderColor: colors.iron.light,
    borderWidth: 3,
    backgroundColor: colors.parchment.primary,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    width: '100%',
    padding: spacing.xs,
  },
  optionText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyMedium,
    color: colors.iron.dark,
    textAlign: 'left',
    flex: 1,
  },
  indicator: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  indicatorCorrect: {
    backgroundColor: colors.green.main,
    borderColor: colors.green.dark,
  },
  indicatorIncorrect: {
    backgroundColor: colors.burgundy.main,
    borderColor: colors.burgundy.dark,
  },
  indicatorCorrectUnselected: {
    backgroundColor: colors.iron.light,
    borderColor: colors.iron.main,
  },
  indicatorIcon: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyBold,
    color: colors.parchment.light,
  },
});
