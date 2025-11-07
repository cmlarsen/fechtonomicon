import React, { useCallback, useMemo } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/tokens';
import type { Flashcard as FlashcardType } from '../types/flashcard';
import { TAB_BAR_HEIGHT } from './FloatingSearchBar';
import { TermsCardDisplay } from './terms/TermsCardDisplay';
import { TermsList } from './terms/TermsList';
import { TermsListHeader } from './terms/TermsListHeader';

interface TermsListDetailProps {
  cards: FlashcardType[];
  currentCardIndex: number;
  selectedCardId: string | undefined;
  searchQuery: string;
  onCardSelect: (index: number) => void;
  onOpenDetails: (card: FlashcardType) => void;
  onTermPress: (cardId: string) => void;
}

export const TermsListDetail: React.FC<TermsListDetailProps> = ({
  cards,
  currentCardIndex,
  selectedCardId,
  searchQuery,
  onCardSelect,
  onOpenDetails,
  onTermPress,
}) => {
  const insets = useSafeAreaInsets();

  const filteredAndSortedCards = useMemo(() => {
    if (cards.length === 0) return [];

    let filtered = cards;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = cards.filter((card) => {
        return (
          card.originalTerm.toLowerCase().startsWith(query) ||
          card.englishTerm.toLowerCase().startsWith(query)
        );
      });
    }

    return [...filtered].sort((a, b) => a.originalTerm.localeCompare(b.originalTerm));
  }, [cards, searchQuery]);

  const currentCard = cards[currentCardIndex];

  const handleCardPress = useCallback(
    (card: FlashcardType) => {
      Keyboard.dismiss();
      const index = cards.findIndex((c) => c.id === card.id);
      if (index !== -1) {
        onCardSelect(index);
      }
    },
    [cards, onCardSelect]
  );

  const handleDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        {/* Left Column - Term List */}
        <View style={styles.leftColumn}>
          <TermsListHeader />
          <TermsList
            cards={filteredAndSortedCards}
            selectedCardId={selectedCardId}
            onCardPress={handleCardPress}
            searchQuery={searchQuery}
          />
        </View>

        {/* Right Column - Card Display */}
        <View style={styles.rightColumn}>
          <TermsCardDisplay
            card={currentCard}
            onOpenDetails={onOpenDetails}
            onTermPress={onTermPress}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
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
