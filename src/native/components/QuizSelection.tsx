import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    <View style={[styles.container]}>
      <View style={styles.selectionContainer}>
        <Text style={styles.title}>
          Quiz{'\n'}
          {selectedDisciplines
            .map((discipline) => DISCIPLINES.find((d) => d.id === discipline)?.name)
            .join(', ')}
        </Text>

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
    paddingBottom: spacing.xxl,
  },
  selectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: spacing.md,
  },
});
