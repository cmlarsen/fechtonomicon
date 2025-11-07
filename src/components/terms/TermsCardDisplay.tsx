import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme/tokens';
import type { Flashcard as FlashcardType } from '../../types/flashcard';
import { Flashcard } from '../Flashcard';

interface TermsCardDisplayProps {
  card: FlashcardType | undefined;
  onOpenDetails: (card: FlashcardType) => void;
  onTermPress: (cardId: string) => void;
}

export const TermsCardDisplay: React.FC<TermsCardDisplayProps> = ({
  card,
  onOpenDetails,
  onTermPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {card && (
        <View style={styles.cardWrapper}>
          <Flashcard
            card={card}
            onOpenDetails={() => onOpenDetails(card)}
            onTermPress={onTermPress}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.parchment.light,
  },
  cardScrollView: {
    flex: 1,
  },
  cardScrollContent: {
    padding: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  cardWrapper: {
    width: '100%',
    flex: 1,
  },
  scrollToTopContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
  },
});
