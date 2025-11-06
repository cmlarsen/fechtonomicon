import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, fontFamily, fontSize, spacing } from '../theme/tokens';
import { DISCIPLINE_INFO, type Discipline } from '../types/flashcard';

interface DisciplineBadgeProps {
  discipline: Discipline;
  size?: 'small' | 'medium';
}

export const DisciplineBadge = memo<DisciplineBadgeProps>(({ discipline, size = 'small' }) => {
  const info = DISCIPLINE_INFO[discipline];
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        isSmall ? styles.badgeSmall : styles.badgeMedium,
        { backgroundColor: colors.parchment.light, borderColor: info.color },
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          isSmall ? styles.badgeTextSmall : styles.badgeTextMedium,
          { color: info.color },
        ]}
      >
        {info.shortName}
      </Text>
    </View>
  );
});

DisciplineBadge.displayName = 'DisciplineBadge';

const styles = StyleSheet.create({
  badge: {
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
  },
  badgeMedium: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  badgeText: {
    fontFamily: fontFamily.bodySemiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeTextSmall: {
    fontSize: fontSize.xs - 1,
  },
  badgeTextMedium: {
    fontSize: fontSize.xs,
  },
});
