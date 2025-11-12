import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundPattern } from '../../components/BackgroundPattern';
import { IconButton } from '../../components/buttons';
import { QuizModal } from '../../components/quiz/QuizModal';
import { useQuiz } from '../../hooks/useQuiz';
import type { RootStackParamList } from '../../navigation/types';
import { spacing } from '../../theme/tokens';
import { QuizSelection } from '../components/QuizSelection';

interface QuizScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Quiz'>;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    state,
    handleSelectQuiz,
    handleAnswerSelect,
    handleCheck,
    handleContinue,
    handleExit,
    handleRestart,
  } = useQuiz();

  const handleClose = useCallback(() => {
    Keyboard.dismiss();
    navigation.goBack();
  }, [navigation]);

  return (
    <BackgroundPattern>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.closeButtonContainer}>
          <IconButton icon="✕" onPress={handleClose} size="small" variant="gold" />
        </View>
        <QuizSelection onSelectQuiz={handleSelectQuiz} />
        <QuizModal
          visible={state.modalVisible}
          isComplete={state.isComplete}
          currentQuestion={state.currentQuestion}
          quizCards={state.quizCards}
          score={state.score}
          selectedAnswer={state.selectedAnswer}
          isChecked={state.isChecked}
          showFeedbackPanel={state.showFeedbackPanel}
          isCorrectAnswer={state.isCorrectAnswer}
          onAnswerSelect={handleAnswerSelect}
          onCheck={handleCheck}
          onContinue={handleContinue}
          onExit={handleExit}
          onRestart={handleRestart}
        />
      </View>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 1000,
  },
});
