import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme/tokens';
import { QuizOptionButton } from './QuizOptionButton';

interface QuestionTypeDefinitionProps {
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  showFeedback: boolean;
  onSelect: (index: number) => void;
}

export const QuestionTypeDefinition: React.FC<QuestionTypeDefinitionProps> = ({
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
