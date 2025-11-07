import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFlashcardStore } from '../../store/flashcardStore';
import { borderRadius, colors, fontFamily, fontSize, spacing } from '../../theme/tokens';
import type { Discipline } from '../../types/flashcard';

const DISCIPLINES: { id: Discipline; name: string }[] = [
  {
    id: 'italian-longsword',
    name: 'Italian Longsword',
  },
  {
    id: 'german-longsword',
    name: 'German Longsword',
  },
];

export const DisciplineSelector: React.FC = () => {
  const selectedDisciplines = useFlashcardStore((state) => state.selectedDisciplines);
  const toggleDiscipline = useFlashcardStore((state) => state.toggleDiscipline);

  const handleDisciplineSelect = (discipline: Discipline) => {
    if (!selectedDisciplines.includes(discipline)) {
      toggleDiscipline(discipline);
    }
  };

  return (
    <View style={styles.container}>
      {DISCIPLINES.map((discipline) => {
        const isSelected = selectedDisciplines.includes(discipline.id);

        return (
          <TouchableOpacity
            key={discipline.id}
            style={[styles.button, isSelected && styles.buttonSelected]}
            onPress={() => handleDisciplineSelect(discipline.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, isSelected && styles.buttonTextSelected]}>
              {discipline.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.iron.light,
  },
  buttonSelected: {
    backgroundColor: colors.gold.main,
    borderColor: colors.gold.dark,
  },
  buttonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
    textAlign: 'center',
  },
  buttonTextSelected: {
    color: colors.parchment.primary,
    fontFamily: fontFamily.bodyBold,
  },
});
