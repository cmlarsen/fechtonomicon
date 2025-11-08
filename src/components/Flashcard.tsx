import { memo, useCallback, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SwordArrowIcon from '../../assets/icons/np_sword_arrow.svg';
import { useFlashcardStore } from '../store/flashcardStore';
import { borderRadius, colors, fontFamily, fontSize, spacing } from '../theme/tokens';
import type { Flashcard as FlashcardType } from '../types/flashcard';
import { rgba } from '../utils/colorUtils';
import { LinkedText } from './LinkedText';
import { SectionDivider } from './SectionDivider';
import { VideoSection } from './VideoEmbed';

interface FlashcardProps {
  card: FlashcardType | undefined;
  onTermPress?: (cardId: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  canGoPrev?: boolean;
  canGoNext?: boolean;
}

export const Flashcard = memo<FlashcardProps>(
  ({ card, onTermPress, onPrev, onNext, canGoPrev = false, canGoNext = false }) => {
    const allCards = useFlashcardStore((state) => state.allCards);
    const insets = useSafeAreaInsets();
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
                    style={styles.description}
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
                    style={styles.description}
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

            <SectionDivider label="TAGS" ornament="⚜" />
            <View style={styles.badgeContainer}>
              <View style={styles.categoryBadge}>
                <Text selectable style={styles.badgeText}>
                  {card.category}
                </Text>
              </View>
              <View style={styles.weaponBadge}>
                <Text selectable style={styles.badgeText}>
                  {card.weapon}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {(onPrev || onNext) && (
          <View style={[styles.floatingButtons, { paddingBottom: insets.bottom }]}>
            {onPrev && (
              <TouchableOpacity
                style={[
                  styles.arrowButton,
                  styles.burgundyVariant,
                  !canGoPrev && styles.disabledButton,
                  styles.floatingButtonLeft,
                ]}
                onPress={onPrev}
                disabled={!canGoPrev}
                activeOpacity={0.7}
              >
                <View style={[styles.arrowIconContainer, styles.arrowLeft]}>
                  <SwordArrowIcon
                    width={24}
                    height={24}
                    fill={colors.burgundy.dark}
                    color={colors.burgundy.dark}
                  />
                </View>
              </TouchableOpacity>
            )}
            {onNext && (
              <TouchableOpacity
                style={[
                  styles.arrowButton,
                  styles.burgundyVariant,
                  !canGoNext && styles.disabledButton,
                  styles.floatingButtonRight,
                ]}
                onPress={onNext}
                disabled={!canGoNext}
                activeOpacity={0.7}
              >
                <View style={[styles.arrowIconContainer, styles.arrowRight]}>
                  <SwordArrowIcon
                    width={24}
                    height={24}
                    fill={colors.burgundy.dark}
                    color={colors.burgundy.dark}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }
);

Flashcard.displayName = 'Flashcard';

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
  description: {
    fontSize: fontSize.md,
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
  floatingButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    pointerEvents: 'box-none',
  },
  floatingButtonLeft: {
    pointerEvents: 'auto',
  },
  floatingButtonRight: {
    pointerEvents: 'auto',
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.parchment.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  burgundyVariant: {
    borderColor: colors.burgundy.main,
    shadowColor: colors.burgundy.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  arrowIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLeft: {
    transform: [{ rotate: '-90deg' }],
  },
  arrowRight: {
    transform: [{ rotate: '90deg' }],
  },
});
