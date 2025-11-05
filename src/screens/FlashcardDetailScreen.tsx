import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import flashcardsData from '../../assets/data/german-longsword-data.json';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { CornerBrackets } from '../components/CornerBrackets';
import { LinkedText } from '../components/LinkedText';
import { SectionDivider } from '../components/SectionDivider';
import { useFlashcardStore } from '../store/flashcardStore';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../theme/tokens';
import type { Flashcard as FlashcardType } from '../types/flashcard';

interface FlashcardDetailScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: { cardId?: string }) => void;
  };
  route: {
    params: {
      cardId: string;
    };
  };
}

export const FlashcardDetailScreen: React.FC<FlashcardDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { allCards } = useFlashcardStore();
  const insets = useSafeAreaInsets();
  const scrollViewRef = React.useRef<ScrollView>(null);

  const card = React.useMemo(() => {
    const cardId = route.params?.cardId;
    if (!cardId) return null;

    // Try to find in allCards first
    const foundCard = allCards.find((c) => c.id === cardId);
    if (foundCard) return foundCard;

    // Fallback to flashcardsData
    const records = (flashcardsData as any).records as FlashcardType[];
    return records.find((c) => c.id === cardId) || null;
  }, [route.params?.cardId, allCards]);

  React.useEffect(() => {
    if (route.params?.cardId && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [route.params?.cardId]);

  const getTermFromId = (id: string) => {
    const parts = id.split('.');
    return parts[parts.length - 1].replace(/_/g, ' ');
  };

  const handleRelatedCardPress = (cardId: string) => {
    navigation.navigate('FlashcardDetail', { cardId });
  };

  if (!card) {
    return (
      <BackgroundPattern>
        <View style={styles.container}>
          <Text style={styles.errorText}>Card not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </BackgroundPattern>
    );
  }

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        {/* Close Button - Fixed to top right of screen */}
        <TouchableOpacity
          style={[styles.closeButton, { top: spacing.md, right: spacing.md }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top, paddingBottom: insets.bottom },
          ]}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          bounces={true}
        >
          <View style={styles.cardContainer}>
            <CornerBrackets />

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
                    onTermPress={handleRelatedCardPress}
                    style={styles.description}
                  />
                </>
              )}
              {card.fullDescription && (
                <>
                  <SectionDivider label="TECHNICAL DETAILS" ornament="⚙" />
                  <LinkedText
                    text={card.fullDescription}
                    allCards={allCards}
                    onTermPress={handleRelatedCardPress}
                    style={styles.description}
                  />
                </>
              )}
              {card.briefApplication && (
                <>
                  <SectionDivider label="APPLICATION" ornament="⚔" />
                  <LinkedText
                    text={card.briefApplication}
                    allCards={allCards}
                    onTermPress={handleRelatedCardPress}
                    style={styles.description}
                  />
                </>
              )}
              {card.fullApplication && (
                <>
                  <SectionDivider label="DETAILED APPLICATION" ornament="📖" />
                  <LinkedText
                    text={card.fullApplication}
                    allCards={allCards}
                    onTermPress={handleRelatedCardPress}
                    style={styles.description}
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
                        onPress={() => handleRelatedCardPress(relatedId)}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.chipText}>{getTermFromId(relatedId)}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
              <SectionDivider label="TAGS" ornament="⚜" />
              <View style={styles.badgeContainer}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.badgeText}>{card.category}</Text>
                </View>
                <View style={styles.weaponBadge}>
                  <Text style={styles.badgeText}>{card.weapon}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    minWidth: 0,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: colors.parchment.primary,
    borderRadius: borderRadius.lg,
    ...shadows.parchment,
    borderWidth: 1.5,
    borderColor: colors.gold.main,
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'center',
    minWidth: 0,
  },
  content: {
    padding: spacing.xl,
  },
  closeButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.parchment.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.gold.main,
    zIndex: 10,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 3,
  },
  closeButtonText: {
    fontSize: fontSize.xl,
    color: colors.iron.dark,
    fontFamily: fontFamily.bodyBold,
    lineHeight: fontSize.xl,
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
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  englishTerm: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bodyMediumItalic,
    color: colors.iron.main,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0.5,
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
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    lineHeight: fontSize.md * 1.4,
    marginBottom: spacing.md,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  errorText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    marginBottom: spacing.md,
  },
  backButton: {
    backgroundColor: colors.gold.light,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.gold.dark,
  },
  backButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
