import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, shadows, spacing } from '../theme/tokens';
import type { Flashcard } from '../types/flashcard';
import { IconButtonWithLabel, SecondaryButton } from './buttons';

interface CommandBarProps {
  currentCard: Flashcard | undefined;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onDetails: () => void;
}

export const CommandBar: React.FC<CommandBarProps> = ({
  currentCard,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onDetails,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.toolbar, { paddingBottom: insets.bottom }]}>
      <IconButtonWithLabel
        icon="◀"
        label="Prev"
        onPress={onPrev}
        disabled={!canGoPrev}
        size="medium"
        variant="gold"
        style={styles.toolbarButton}
      />
      <SecondaryButton
        title="Details"
        onPress={onDetails}
        disabled={!currentCard}
        size="medium"
        variant="parchment"
        style={styles.detailsButton}
      />
      <IconButtonWithLabel
        icon="▶"
        label="Next"
        onPress={onNext}
        disabled={!canGoNext}
        size="medium"
        variant="gold"
        style={styles.toolbarButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.parchment.primary,
    borderTopWidth: 2,
    borderTopColor: colors.gold.main,
    ...shadows.sm,
  },
  toolbarButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  detailsButton: {
    flex: 1.5,
    marginHorizontal: spacing.md,
  },
});
