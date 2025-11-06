import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';
import type { Flashcard as FlashcardType } from '../types/flashcard';
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
      const index = cards.findIndex((c) => c.id === card.id);
      if (index !== -1) {
        onCardSelect(index);
      }
    },
    [cards, onCardSelect]
  );

  return (
    <View style={[styles.container]}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 0.33,
    borderRightWidth: 2,
    borderRightColor: colors.gold.main,
  },
  rightColumn: {
    flex: 0.66,
    position: 'relative',
  },
});
