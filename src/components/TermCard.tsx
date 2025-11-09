import { memo, useCallback, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTermStore } from '../store/termStore';
import { borderRadius, colors, fontFamily, fontSize, spacing } from '../theme/tokens';
import type { Term } from '../types/term';
import { rgba } from '../utils/colorUtils';
import { LinkedText } from './LinkedText';
import { Pager } from './Pager';
import { SectionDivider } from './SectionDivider';
import { VideoSection } from './VideoEmbed';

interface TermCardProps {
  card: Term | undefined;
  onTermPress?: (cardId: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  canGoPrev?: boolean;
  canGoNext?: boolean;
}

export const TermCard = memo<TermCardProps>(
  ({ card, onTermPress, onPrev, onNext, canGoPrev = false, canGoNext = false }) => {
    const allCards = useTermStore((state) => state.allCards);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleTermPress = useCallback(
      (cardId: string) => {
        if (onTermPress) {
          onTermPress(cardId);
        }
      },
      [onTermPress]
    );

    const getTermFromId = useCallback((id: string) => {
      const parts = id.split('.');
      return parts[parts.length - 1].replace(/_/g, ' ');
    }, []);

    useEffect(() => {
      if (card?.id && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }, [card?.id]);

    if (!card) {
      return null;
    }

    return (
      <View style={styles.container} testID="flashcard-container">
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text selectable style={styles.originalTerm}>
                  {card.originalTerm}
                </Text>
                <Text selectable style={styles.englishTerm}>
                  {card.englishTerm}
                </Text>
              </View>
            </View>

            <View style={styles.briefContent}>
              {card.briefDescription && (
                <>
                  <SectionDivider label="DESCRIPTION" ornament="❦" />
                  <LinkedText
                    text={card.briefDescription}
                    allCards={allCards}
                    onTermPress={handleTermPress}
                    style={styles.briefDescription}
                    card={card}
                    fieldName="Description"
                    ignoreWords={[card.originalTerm]}
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
                    style={styles.briefDescription}
                    card={card}
                    fieldName="Application"
                    ignoreWords={[card.originalTerm]}
                  />
                </>
              )}
            </View>

            {card.videoLinks && card.videoLinks.length > 0 && (
              <>
                <SectionDivider label="VIDEOS" ornament="▶" />
                <VideoSection videoLinks={card.videoLinks} />
              </>
            )}

            {card.fullDescription && (
              <>
                <SectionDivider label="TECHNICAL DETAILS" ornament="⚙" />
                <LinkedText
                  text={card.fullDescription}
                  allCards={allCards}
                  onTermPress={handleTermPress}
                  style={styles.description}
                  card={card}
                  fieldName="Technical Details"
                  ignoreWords={[card.originalTerm]}
                />
              </>
            )}

            {card.fullApplication && (
              <>
                <SectionDivider label="DETAILED APPLICATION" ornament="📖" />
                <LinkedText
                  text={card.fullApplication}
                  allCards={allCards}
                  onTermPress={handleTermPress}
                  style={styles.description}
                  card={card}
                  fieldName="Detailed Application"
                  ignoreWords={[card.originalTerm]}
                />
              </>
            )}

            {card.related && card.related.length > 0 && (
              <>
                <SectionDivider label="RELATED CONCEPTS" ornament="⚜" />
                <View style={styles.chipContainer}>
                  {card.related.map((relatedId) => (
                    <TouchableOpacity
                      key={relatedId}
                      style={styles.chip}
                      onPress={() => handleTermPress(relatedId)}
                      activeOpacity={0.85}
                    >
                      <Text selectable style={styles.chipText}>
                        {getTermFromId(relatedId)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        </ScrollView>
        <Pager onPrev={onPrev} onNext={onNext} canGoPrev={canGoPrev} canGoNext={canGoNext} />
      </View>
    );
  }
);

TermCard.displayName = 'TermCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: rgba(colors.parchment.light, 0.6),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl,
  },
  header: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  titleContainer: {
    alignItems: 'center',
  },
  originalTerm: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  englishTerm: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bodyMediumItalic,
    color: colors.iron.main,
  },
  briefContent: {
    flexShrink: 0,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
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
  briefDescription: {
    fontSize: fontSize.xl,
    lineHeight: fontSize.md * 1.4,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: fontSize.lg,
    lineHeight: fontSize.md * 1.4,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    marginBottom: spacing.md,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  chip: {
    backgroundColor: colors.gold.light,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gold.dark,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
  chipText: {
    color: colors.iron.dark,
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodySemiBold,
    textTransform: 'capitalize',
  },
});
