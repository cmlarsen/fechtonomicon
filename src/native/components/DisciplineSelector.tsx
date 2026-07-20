import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DISCIPLINES } from '../../constants/disciplines';
import { useTermStore } from '../../store/termStore';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';
import type { Discipline } from '../../types/term';

export const DisciplineSelector: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedDisciplines = useTermStore((state) => state.selectedDisciplines);
  const toggleDiscipline = useTermStore((state) => state.toggleDiscipline);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleDisciplineSelect = useCallback(
    (discipline: Discipline) => {
      toggleDiscipline(discipline);
    },
    [toggleDiscipline]
  );

  // Discipline selection is single-select (see the store's toggleDiscipline and
  // the Settings screens), so show the one selected discipline's name.
  const selectedName = useMemo(() => {
    const [selectedId] = selectedDisciplines;
    if (!selectedId) return 'No discipline selected';
    return DISCIPLINES.find((d) => d.id === selectedId)?.name ?? 'No discipline selected';
  }, [selectedDisciplines]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={handleToggle} activeOpacity={0.7}>
        <View style={styles.headerContent}>
          <Text style={styles.selectedText}>{selectedName}</Text>
        </View>
        <Text style={[styles.arrow, isExpanded && styles.arrowExpanded]}>▼</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContent}>
          {DISCIPLINES.map((discipline) => {
            const isSelected = selectedDisciplines.includes(discipline.id);
            return (
              <TouchableOpacity
                key={discipline.id}
                style={[styles.disciplineItem, isSelected && styles.disciplineItemSelected]}
                onPress={() => handleDisciplineSelect(discipline.id)}
                activeOpacity={0.7}
              >
                <View style={styles.disciplineContent}>
                  <Text
                    style={[styles.disciplineName, isSelected && styles.disciplineNameSelected]}
                  >
                    {discipline.name}
                  </Text>
                  <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                    {isSelected && <View style={styles.radioButtonInner} />}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.parchment.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.gold.main,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerContent: {
    flex: 1,
    paddingVertical: spacing.sm,
  },
  headerLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.main,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  selectedText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
  },
  arrow: {
    fontSize: fontSize.md,
    color: colors.gold.dark,
    marginLeft: spacing.md,
    transform: [{ rotate: '0deg' }],
  },
  arrowExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  expandedContent: {
    backgroundColor: colors.parchment.primary,
  },
  disciplineItem: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  disciplineItemSelected: {
    backgroundColor: colors.gold.light,
  },
  disciplineContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disciplineName: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    flex: 1,
  },
  disciplineNameSelected: {
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
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
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gold.dark,
  },
});
