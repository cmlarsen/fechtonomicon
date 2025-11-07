import { usePostHog } from 'posthog-react-native';
import React, { useCallback } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { FloatingSearchBar } from '../components/FloatingSearchBar';
import { LoadingState } from '../components/LoadingState';
import { TermsCardDisplay } from '../components/terms/TermsCardDisplay';
import { TermsList } from '../components/terms/TermsList';
import { TermsListHeader } from '../components/terms/TermsListHeader';
import { useTermsSearch } from '../contexts/TermsSearchContext';
import { useCardIndex } from '../hooks/useCardIndex';
import { useCardLoader } from '../hooks/useCardLoader';
import { useFilteredCards } from '../hooks/useFilteredCards';
import { colors } from '../theme/tokens';
import type { Flashcard as FlashcardType } from '../types/flashcard';

interface CardScreenProps {
  navigation: {
    navigate: (screen: string, params?: { cardId?: string }) => void;
    dispatch: (action: unknown) => void;
  };
  route?: {
    params?: {
      cardId?: string;
    };
  };
}

export const CardScreen: React.FC<CardScreenProps> = ({ navigation, route }) => {
  const posthog = usePostHog();
  const { searchQuery } = useTermsSearch();
  const { isLoading } = useCardLoader();
  const { disciplineFilteredCards, filteredAndSortedCards } = useFilteredCards();
  const { currentCard, handleCardSelect } = useCardIndex({
    cards: disciplineFilteredCards,
    routeCardId: route?.params?.cardId,
  });

  const handleOpenDetails = useCallback(
    (card: FlashcardType) => {
      posthog?.capture('details_button_tapped', {
        cardId: card.id,
        cardTerm: card.originalTerm,
      });
      navigation.navigate('FlashcardDetail', { cardId: card.id });
    },
    [navigation, posthog]
  );

  const handleTermPress = useCallback(
    (cardId: string) => {
      navigation.navigate('FlashcardDetail', { cardId });
    },
    [navigation]
  );

  const handleCardPress = useCallback(
    (card: FlashcardType) => {
      Keyboard.dismiss();
      const index = disciplineFilteredCards.findIndex((c) => c.id === card.id);
      if (index !== -1) {
        handleCardSelect(index);
      }
    },
    [disciplineFilteredCards, handleCardSelect]
  );

  const handleDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const insets = useSafeAreaInsets();
  const showLoading = isLoading || disciplineFilteredCards.length === 0;

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        {showLoading ? (
          <LoadingState />
        ) : (
          <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <View style={[styles.detailContainer, { paddingBottom: insets.bottom }]}>
              {/* Left Column - Term List */}
              <View style={styles.leftColumn}>
                <TermsListHeader />
                <TermsList
                  cards={filteredAndSortedCards}
                  selectedCardId={currentCard?.id}
                  onCardPress={handleCardPress}
                  searchQuery={searchQuery}
                />
              </View>

              {/* Right Column - Card Display */}
              <View style={styles.rightColumn}>
                <TermsCardDisplay
                  card={currentCard}
                  onOpenDetails={handleOpenDetails}
                  onTermPress={handleTermPress}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      <FloatingSearchBar />
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1 / 3,
    backgroundColor: colors.parchment.primary,
    borderRightWidth: 2,
    borderRightColor: colors.gold.main,
  },
  rightColumn: {
    flex: 2 / 3,
    position: 'relative',
  },
});
