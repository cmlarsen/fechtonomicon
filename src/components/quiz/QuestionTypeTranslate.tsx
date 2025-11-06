import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme/tokens';
import { QuizOptionButton } from './QuizOptionButton';

interface QuestionTypeTranslateProps {
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  showFeedback: boolean;
  onSelect: (index: number) => void;
}

export const QuestionTypeTranslate: React.FC<QuestionTypeTranslateProps> = ({
  options,
  selectedIndex,
  correctIndex,
  showFeedback,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <QuizOptionButton
          key={option}
          option={option}
          index={index}
          selectedIndex={selectedIndex}
          correctIndex={correctIndex}
          showFeedback={showFeedback}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    width: '100%',
  },
});
