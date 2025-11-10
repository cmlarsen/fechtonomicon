import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DISCIPLINES } from '../constants/disciplines';
import { colors, fontFamily, fontSize, spacing } from '../theme/tokens';
import type { Discipline } from '../types/term';
import { QuizSelectionCard } from '../components/quiz/QuizSelectionCard';

interface QuizSelectionProps {
  onSelectQuiz: (discipline: Discipline, mode: 'quick' | 'full') => void;
}

export const QuizSelection: React.FC<QuizSelectionProps> = ({ onSelectQuiz }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.selectionContainer}>
          <Text style={styles.title}>Choose Your Challenge</Text>

          <View style={styles.cardsContainer}>
            {DISCIPLINES.map((discipline) => (
              <QuizSelectionCard
                key={discipline.id}
                discipline={discipline.id}
                onQuickQuiz={() => onSelectQuiz(discipline.id, 'quick')}
                onFullQuiz={() => onSelectQuiz(discipline.id, 'full')}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
});
