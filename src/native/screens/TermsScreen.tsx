import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { usePostHog } from 'posthog-react-native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BackgroundPattern } from '../../components/BackgroundPattern';
import { LoadingState } from '../../components/LoadingState';
import { TermCard } from '../../components/TermCard';
import { useCardIndex } from '../../hooks/useCardIndex';
import { useCardLoader } from '../../hooks/useCardLoader';
import { useFilteredCards } from '../../hooks/useFilteredCards';
import type { RootStackParamList, RootTabParamList } from '../../navigation/types';
import { getOrCreateUserId } from '../../services/userId';
import { colors, fontFamily, fontSize, shadows, spacing } from '../../theme/tokens';
import { rgba } from '../../utils/colorUtils';

type TermsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Terms'>,
  StackNavigationProp<RootStackParamList>
>;

type TermsScreenRouteProp = RouteProp<RootTabParamList, 'Terms'>;

interface TermsScreenProps {
  navigation: TermsScreenNavigationProp;
  route: TermsScreenRouteProp;
}

export const TermsScreen: React.FC<TermsScreenProps> = ({ navigation, route }) => {
  const posthog = usePostHog();
  const { isLoading } = useCardLoader();
  const { disciplineFilteredCards } = useFilteredCards();
  const { currentCard, currentCardIndex, handleCardSelect } = useCardIndex({
    cards: disciplineFilteredCards,
    routeCardId: route.params?.cardId,
  });

  const handleTermPress = useCallback(
    (cardId: string) => {
      navigation.navigate('Terms', { cardId });
    },
    [navigation]
  );

  const handlePrev = useCallback(async () => {
    if (currentCardIndex > 0) {
      const userId = await getOrCreateUserId();
      posthog?.capture('prev_button_tapped', { userId });
      handleCardSelect(currentCardIndex - 1);
    }
  }, [currentCardIndex, handleCardSelect, posthog]);

  const handleNext = useCallback(async () => {
    if (currentCardIndex < disciplineFilteredCards.length - 1) {
      const userId = await getOrCreateUserId();
      posthog?.capture('next_button_tapped', { userId });
      handleCardSelect(currentCardIndex + 1);
    }
  }, [currentCardIndex, disciplineFilteredCards.length, handleCardSelect, posthog]);

  const showLoading = isLoading;

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        {showLoading ? (
          <LoadingState />
        ) : disciplineFilteredCards.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No cards available for this discipline.</Text>
            <Text style={styles.emptyStateSubtext}>
              Try selecting a different discipline in settings.
            </Text>
          </View>
        ) : (
          <View style={styles.detailContainer}>
            <TermCard
              card={currentCard}
              onTermPress={handleTermPress}
              onPrev={handlePrev}
              onNext={handleNext}
              canGoPrev={currentCardIndex > 0}
              canGoNext={currentCardIndex < disciplineFilteredCards.length - 1}
            />
          </View>
        )}
      </View>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.parchment.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.gold.main,
    ...shadows.sm,
  },
  title: {
    fontSize: fontSize.md,
    letterSpacing: 1.2,
    fontFamily: fontFamily.title,
    color: rgba(colors.gold.main, 0.8),
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    flex: 1,
    textAlign: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  detailContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyStateText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.main,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyStateSubtext: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyItalic,
    color: colors.iron.main,
    textAlign: 'center',
  },
});
