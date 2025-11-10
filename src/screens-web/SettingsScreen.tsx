import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { usePostHog } from 'posthog-react-native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { WebTopNav } from '../components-web/WebTopNav';
import { DISCIPLINES } from '../constants/disciplines';
import type { RootStackParamList, RootTabParamList } from '../navigation/types';
import { useTermStore } from '../store/termStore';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../theme/tokens';
import type { Discipline } from '../types/term';

type SettingsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Settings'>,
  StackNavigationProp<RootStackParamList>
>;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const posthog = usePostHog();
  const selectedDisciplines = useTermStore((state) => state.selectedDisciplines);
  const toggleDiscipline = useTermStore((state) => state.toggleDiscipline);

  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    if (route.state) {
      const tabState = route.state;
      if (tabState.index !== undefined && tabState.routes[tabState.index]) {
        return tabState.routes[tabState.index].name as keyof RootTabParamList | 'Settings';
      }
    }
    return 'Settings';
  });

  const handleDisciplineSelect = useCallback(
    (discipline: Discipline) => {
      toggleDiscipline(discipline);
      posthog?.capture('discipline_selected', {
        discipline,
      });
    },
    [toggleDiscipline, posthog]
  );

  const handleSettings = useCallback(() => {
    // Already on settings, do nothing
  }, []);

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        <WebTopNav
          navigation={navigation}
          currentRoute={currentRouteName}
          onSettings={handleSettings}
        />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Discipline</Text>
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.titleSemiBold,
    color: colors.iron.dark,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  disciplineCard: {
    backgroundColor: colors.parchment.light,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.gold.main,
    ...shadows.sm,
  },
  disciplineCardSelected: {
    borderColor: colors.gold.dark,
    backgroundColor: colors.gold.light,
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
    color: colors.iron.dark,
    flex: 1,
  },
  disciplineNameSelected: {
    color: colors.iron.dark,
  },
  disciplineDescription: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyItalic,
    color: colors.iron.main,
    lineHeight: fontSize.md * 1.4,
  },
  disciplineDescriptionSelected: {
    color: colors.iron.dark,
    fontFamily: fontFamily.bodyMediumItalic,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gold.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  radioButtonSelected: {
    borderColor: colors.gold.dark,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.gold.dark,
  },
});
