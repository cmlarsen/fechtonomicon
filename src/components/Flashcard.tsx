import { memo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFlashcardStore } from '../store/flashcardStore';
import { borderRadius, colors, fontFamily, fontSize, spacing } from '../theme/tokens';
import type { Flashcard as FlashcardType } from '../types/flashcard';
import { rgba } from '../utils/colorUtils';
import { LinkedText } from './LinkedText';
import { SectionDivider } from './SectionDivider';

interface FlashcardProps {
  card: FlashcardType | undefined;
  onTermPress?: (cardId: string) => void;
}

export const Flashcard = memo<FlashcardProps>(({ card, onTermPress }) => {
  const allCards = useFlashcardStore((state) => state.allCards);
  const insets = useSafeAreaInsets();

  const handleTermPress = useCallback(
    (cardId: string) => {
      if (onTermPress) {
        onTermPress(cardId);
      }
    },
    [onTermPress]
  );

  if (!card) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} testID="flashcard-container">
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.originalTerm}>{card.originalTerm}</Text>
            <Text style={styles.englishTerm}>{card.englishTerm}</Text>
          </View>
        </View>

        {card.briefDescription && (
          <>
            <SectionDivider label="DESCRIPTION" ornament="❦" />
            <LinkedText
              text={card.briefDescription}
              allCards={allCards}
              onTermPress={handleTermPress}
              style={styles.description}
              card={card}
              fieldName="Description"
            />
          </>
        )}

        {card.briefApplication && (
          <>
            <SectionDivider label="APPLICATION" ornament="⚔" />
            <LinkedText
              text={card.briefApplication}
              allCards={allCards}
              onTermPress={handleTermPress}
              style={styles.description}
              card={card}
              fieldName="Application"
            />
          </>
        )}
      </View>
    </View>
  );
});

Flashcard.displayName = 'Flashcard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
    backgroundColor: rgba(colors.parchment.light, 0.6),
  },

  content: {
    flex: 1,
    padding: spacing.md,
    paddingTop: spacing.xs,
    justifyContent: 'flex-start',
  },
  header: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  titleContainer: {
    alignItems: 'center',
  },
  originalTerm: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    // marginBottom: spacing.xs,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  englishTerm: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bodyMediumItalic,
    color: colors.iron.main,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    justifyContent: 'center',
  },
  categoryBadge: {
    backgroundColor: colors.parchment.light,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    borderWidth: 1.5,
    borderColor: colors.gold.main,
  },
  weaponBadge: {
    backgroundColor: colors.parchment.light,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    borderWidth: 1.5,
    borderColor: colors.gold.dark,
  },
  badgeText: {
    color: colors.iron.main,
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bodySemiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: fontSize.md,
    lineHeight: fontSize.md * 1.4,
    fontFamily: fontFamily.body,
    color: colors.iron.main,

    marginBottom: spacing.md,
  },
  detailsButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.gold.light,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.gold.dark,
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
  detailsButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailsButtonContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xs,
    paddingBottom: spacing.md,
  },
});
