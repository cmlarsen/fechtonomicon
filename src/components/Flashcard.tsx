import { usePostHog } from 'posthog-react-native';
import { memo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFlashcardStore } from '../store/flashcardStore';
import { borderRadius, colors, fontFamily, fontSize, spacing } from '../theme/tokens';
import type { Flashcard as FlashcardType } from '../types/flashcard';
import { SecondaryButton } from './buttons';
import { LinkedText } from './LinkedText';
import { SectionDivider } from './SectionDivider';

interface FlashcardProps {
  card: FlashcardType;
  onOpenDetails?: () => void;
  onTermPress?: (cardId: string) => void;
}

export const Flashcard = memo<FlashcardProps>(({ card, onOpenDetails, onTermPress }) => {
  const posthog = usePostHog();
  const allCards = useFlashcardStore((state) => state.allCards);

  const handleTermPress = useCallback(
    (cardId: string) => {
      if (onTermPress) {
        onTermPress(cardId);
      }
    },
    [onTermPress]
  );

  const handleDetailsPress = useCallback(() => {
    posthog?.capture('details_button_tapped', {
      cardId: card.id,
      cardTerm: card.originalTerm,
    });
    if (onOpenDetails) {
      onOpenDetails();
    }
  }, [onOpenDetails, posthog, card.id, card.originalTerm]);

  return (
    <View style={styles.container} testID="flashcard-container">
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
      {onOpenDetails && (
        <View style={styles.detailsButtonContainer}>
          <SecondaryButton
            title="More"
            onPress={handleDetailsPress}
            size="small"
            style={styles.detailsButton}
          />
        </View>
      )}
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
  },

  content: {
    flex: 1,
    padding: spacing.md,
    paddingTop: spacing.xs,
    justifyContent: 'flex-start',
  },
  header: {},
  titleContainer: {},
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
    fontSize: fontSize.sm,
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
