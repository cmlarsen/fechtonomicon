import { usePostHog } from 'posthog-react-native';
import { memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFlashcardStore } from '../store/flashcardStore';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../theme/tokens';
import type { Flashcard as FlashcardType } from '../types/flashcard';
import { CornerBrackets } from './CornerBrackets';
import { DisciplineBadge } from './DisciplineBadge';
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
      <CornerBrackets />
      {card.discipline && (
        <View style={styles.badgeContainer}>
          <DisciplineBadge discipline={card.discipline} size="small" />
        </View>
      )}
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
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={handleDetailsPress}
            activeOpacity={0.85}
          >
            <Text style={styles.detailsButtonText}>View Full Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

Flashcard.displayName = 'Flashcard';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.parchment.primary,
    borderRadius: borderRadius.lg,
    ...shadows.parchment,
    borderWidth: 1.5,
    borderColor: colors.gold.main,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
  },

  content: {
    flex: 1,
    padding: spacing.xl,
    paddingTop: spacing.lg,
    justifyContent: 'flex-start',
  },
  header: {
    marginBottom: spacing.md,
  },
  titleContainer: {},
  originalTerm: {
    fontSize: fontSize.xxxl,
    lineHeight: fontSize.xxxl * 1.2,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    // marginBottom: spacing.xs,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  englishTerm: {
    fontSize: fontSize.xl,
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
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    lineHeight: fontSize.md * 1.4,
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

    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
});
