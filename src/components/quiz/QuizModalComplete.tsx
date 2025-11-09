import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../theme/tokens';
import { BackgroundPattern } from '../BackgroundPattern';
import { QuizExitButton } from './QuizExitButton';
import { QuizFinalScore } from './QuizFinalScore';

interface QuizModalCompleteProps {
  visible: boolean;
  score: { correct: number; total: number };
  onRestart: () => void;
  onExit: () => void;
}

export const QuizModalComplete: React.FC<QuizModalCompleteProps> = ({
  visible,
  score,
  onRestart,
  onExit,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <BackgroundPattern>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <View style={styles.header}>
            <QuizExitButton onPress={onExit} />
          </View>
          <QuizFinalScore
            correct={score.correct}
            total={score.total}
            onRestart={onRestart}
            onExit={onExit}
          />
        </View>
      </BackgroundPattern>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
});
