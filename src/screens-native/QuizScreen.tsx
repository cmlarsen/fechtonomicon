import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { QuizSelection } from '../components-native/QuizSelection';
import { QuizModal } from '../components/quiz/QuizModal';
import { useQuiz } from '../hooks/useQuiz';
import type { RootStackParamList, RootTabParamList } from '../navigation/types';

type QuizScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Quiz'>,
  StackNavigationProp<RootStackParamList>
>;

interface QuizScreenProps {
  navigation: QuizScreenNavigationProp;
}

export const QuizScreen: React.FC<QuizScreenProps> = () => {
  const {
    state,
    handleSelectQuiz,
    handleAnswerSelect,
    handleCheck,
    handleContinue,
    handleExit,
    handleRestart,
  } = useQuiz();

  return (
    <BackgroundPattern>
      <View style={styles.container}>
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
});
