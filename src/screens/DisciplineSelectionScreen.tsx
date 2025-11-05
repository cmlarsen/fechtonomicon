import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useFlashcardStore } from '../store/flashcardStore';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../theme/tokens';
import type { Discipline } from '../types/flashcard';

interface DisciplineSelectionScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'DisciplineSelection'>;
}

const DISCIPLINES: { id: Discipline; name: string; description: string }[] = [
  {
    id: 'meyer-longsword',
    name: 'Meyer Longsword',
    description: "Joachim Meyer's German longsword system",
  },
  {
    id: 'rapier',
    name: 'Rapier',
    description: 'Italian and Spanish rapier fencing',
  },
  {
    id: 'sword-buckler',
    name: 'Sword & Buckler',
    description: 'Medieval sword and buckler combat',
  },
  {
    id: 'messer',
    name: 'Messer',
    description: 'German single-edged sword',
  },
  {
    id: 'longsword',
    name: 'Longsword',
    description: 'General longsword techniques',
  },
];

export const DisciplineSelectionScreen: React.FC<DisciplineSelectionScreenProps> = ({
  navigation,
}) => {
  const { selectedDisciplines, toggleDiscipline } = useFlashcardStore();

  const handleDisciplineToggle = (discipline: Discipline) => {
    toggleDiscipline(discipline);
  };

  const handleDone = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Disciplines</Text>
        <Text style={styles.subtitle}>Choose which disciplines to study</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {DISCIPLINES.map((discipline) => {
          const isSelected = selectedDisciplines.includes(discipline.id);

          return (
            <TouchableOpacity
              key={discipline.id}
              style={[styles.disciplineCard, isSelected && styles.disciplineCardSelected]}
              onPress={() => handleDisciplineToggle(discipline.id)}
              activeOpacity={0.7}
            >
              <View style={styles.disciplineContent}>
                <View style={styles.disciplineHeader}>
                  <Text
                    style={[styles.disciplineName, isSelected && styles.disciplineNameSelected]}
                  >
                    {discipline.name}
                  </Text>
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </View>
                <Text
                  style={[
                    styles.disciplineDescription,
                    isSelected && styles.disciplineDescriptionSelected,
                  ]}
                >
                  {discipline.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone} activeOpacity={0.8}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.title,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    lineHeight: fontSize.xxl * 1.2,
  },
  subtitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.body,
    color: colors.text.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  disciplineCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border.light,
    ...shadows.sm,
  },
  disciplineCardSelected: {
    borderColor: colors.accent.gold,
    backgroundColor: colors.background.secondary,
  },
  disciplineContent: {
    flex: 1,
  },
  disciplineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  disciplineName: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.text.primary,
    flex: 1,
  },
  disciplineNameSelected: {
    color: colors.iron.dark,
  },
  disciplineDescription: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyItalic,
    color: colors.text.secondary,
    lineHeight: fontSize.md * 1.4,
  },
  disciplineDescriptionSelected: {
    color: colors.iron.main,
    fontFamily: fontFamily.bodyMediumItalic,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.border.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  checkboxSelected: {
    backgroundColor: colors.accent.gold,
    borderColor: colors.accent.gold,
  },
  checkmark: {
    color: colors.iron.dark,
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyBold,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  doneButton: {
    backgroundColor: colors.iron.dark,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.md,
  },
  doneButtonText: {
    color: colors.text.inverse,
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
