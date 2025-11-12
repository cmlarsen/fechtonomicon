import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { QuizSelectionCard } from '../../components/quiz/QuizSelectionCard';
import { DISCIPLINES } from '../../constants/disciplines';
import { useTermStore } from '../../store/termStore';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';
import type { Discipline } from '../../types/term';

interface QuizSelectionProps {
  onSelectQuiz: (discipline: Discipline, mode: 'quick' | 'full') => void;
}

export const QuizSelection: React.FC<QuizSelectionProps> = ({ onSelectQuiz }) => {
  const selectedDisciplines = useTermStore((state) => state.selectedDisciplines);

  // Filter to only show currently selected discipline(s)
  const visibleDisciplines = DISCIPLINES.filter((discipline) =>
    selectedDisciplines.includes(discipline.id)
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.selectionContainer}>
          <Text style={styles.title}>Choose Your Challenge</Text>

          <View style={styles.cardsContainer}>
            {visibleDisciplines.map((discipline) => (
              <QuizSelectionCard
                key={discipline.id}
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
