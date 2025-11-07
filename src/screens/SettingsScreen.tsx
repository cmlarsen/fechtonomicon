import { usePostHog } from 'posthog-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { useFlashcardStore } from '../store/flashcardStore';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../theme/tokens';
import type { Discipline } from '../types/flashcard';

const DISCIPLINES: { id: Discipline; name: string; description: string }[] = [
  {
    id: 'italian-longsword',
    name: 'Italian Longsword',
    description: "Fiore dei Liberi and Filippo Vadi's Italian longsword systems",
  },
  {
    id: 'german-longsword',
    name: 'German Longsword',
    description: "Joachim Meyer's German longsword system",
  },
];

export const SettingsScreen: React.FC = () => {
  const posthog = usePostHog();
  const insets = useSafeAreaInsets();
  const selectedDisciplines = useFlashcardStore((state) => state.selectedDisciplines);
  const toggleDiscipline = useFlashcardStore((state) => state.toggleDiscipline);

  const handleDisciplineSelect = (discipline: Discipline) => {
    if (!selectedDisciplines.includes(discipline)) {
      toggleDiscipline(discipline);
      posthog?.capture('discipline_selected', {
        discipline,
      });
    }
  };

  const appVersion = '1.0.0';

  return (
    <BackgroundPattern>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Customize your study experience</Text>
          </View>

          {/* Discipline Selection Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Discipline</Text>
            <Text style={styles.sectionDescription}>Choose which discipline to study</Text>
            {DISCIPLINES.map((discipline) => {
              const isSelected = selectedDisciplines.includes(discipline.id);

              return (
                <TouchableOpacity
                  key={discipline.id}
                  style={[styles.disciplineCard, isSelected && styles.disciplineCardSelected]}
                  onPress={() => handleDisciplineSelect(discipline.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.disciplineContent}>
                    <View style={styles.disciplineHeader}>
                      <Text
                        style={[styles.disciplineName, isSelected && styles.disciplineNameSelected]}
                      >
                        {discipline.name}
                      </Text>
                      <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                        {isSelected && <View style={styles.radioButtonInner} />}
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
          </View>

          {/* App Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>App Name</Text>
              <Text style={styles.infoValue}>Fechtonomicon</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>{appVersion}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Description</Text>
              <Text style={styles.infoValue}>
                Study Historical European Martial Arts with interactive flashcards
              </Text>
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
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
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
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.titleSemiBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyItalic,
    color: colors.text.secondary,
    marginBottom: spacing.md,
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
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  radioButtonSelected: {
    borderColor: colors.accent.gold,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent.gold,
  },
  infoCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  infoLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.body,
    color: colors.text.primary,
  },
});
