import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackgroundPattern } from '../../components/BackgroundPattern';
import { QuizModal } from '../../components/quiz/QuizModal';
import { useQuiz } from '../../hooks/useQuiz';
import type { RootStackParamList, RootTabParamList } from '../../navigation/types';
import { QuizSelection } from '../components/QuizSelection';
import { WebTopNav } from '../components/WebTopNav';

type QuizScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Quiz'>,
  StackNavigationProp<RootStackParamList>
>;

interface QuizScreenProps {
  navigation: QuizScreenNavigationProp;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const {
    state,
    handleSelectQuiz,
    handleAnswerSelect,
    handleCheck,
    handleContinue,
    handleExit,
    handleRestart,
  } = useQuiz();

  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    if (route.state) {
      const tabState = route.state;
      if (tabState.index !== undefined && tabState.routes[tabState.index]) {
        return tabState.routes[tabState.index].name as keyof RootTabParamList;
      }
    }
    return 'Quiz';
  });

  const handleSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        <WebTopNav
          navigation={navigation}
          currentRoute={currentRouteName}
          onSettings={handleSettings}
        />
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
