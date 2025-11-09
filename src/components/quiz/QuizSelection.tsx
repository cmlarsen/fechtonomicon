import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';
import type { Discipline } from '../../types/term';
import { BackgroundPattern } from '../BackgroundPattern';
import { QuizSelectionCard } from './QuizSelectionCard';

interface QuizSelectionProps {
  onSelectQuiz: (discipline: Discipline, mode: 'quick' | 'full') => void;
}

export const QuizSelection: React.FC<QuizSelectionProps> = ({ onSelectQuiz }) => {
  const insets = useSafeAreaInsets();

  return (
    <BackgroundPattern>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.selectionContainer}>
            <Text style={styles.title}>Choose Your Challenge</Text>

            <View style={styles.cardsContainer}>
              <QuizSelectionCard
                discipline="italian-longsword"
                onQuickQuiz={() => onSelectQuiz('italian-longsword', 'quick')}
                onFullQuiz={() => onSelectQuiz('italian-longsword', 'full')}
              />
              <QuizSelectionCard
                discipline="german-longsword"
                onQuickQuiz={() => onSelectQuiz('german-longsword', 'quick')}
                onFullQuiz={() => onSelectQuiz('german-longsword', 'full')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  selectionContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xl,
    paddingVertical: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    textAlign: 'center',
  },
  cardsContainer: {
    gap: spacing.xl,
  },
});
