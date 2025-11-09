import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';

import type { Term } from '../../types/term';

interface CardListItemProps {
  card: Term;
  isSelected: boolean;
  onPress: (card: Term) => void;
}

export const CardListItem = React.memo<CardListItemProps>(({ card, isSelected, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(card);
  }, [card, onPress]);

  return (
    <TouchableOpacity
      style={[styles.cardItem, isSelected && styles.cardItemSelected]}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardTextContainer}>
          <Text style={[styles.originalTerm, isSelected && styles.originalTermSelected]}>
            {card.originalTerm}
          </Text>
          <Text style={[styles.englishTerm, isSelected && styles.englishTermSelected]}>
            {card.englishTerm}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

CardListItem.displayName = 'CardListItem';

const styles = StyleSheet.create({
  cardItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(201, 171, 106, 0.3)',
    backgroundColor: colors.parchment.primary,
    minHeight: 64,
    justifyContent: 'center',
  },
  cardItemSelected: {
    backgroundColor: colors.gold.light,
    borderLeftWidth: 4,
    borderLeftColor: colors.gold.dark,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  originalTerm: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  originalTermSelected: {
    color: colors.iron.dark,
    fontFamily: fontFamily.bodyBold,
  },
  englishTerm: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyItalic,
    color: colors.text.secondary,
  },
  englishTermSelected: {
    color: colors.iron.main,
  },
});
