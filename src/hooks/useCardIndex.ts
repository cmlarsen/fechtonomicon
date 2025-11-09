import { useCallback, useEffect, useRef, useState } from 'react';
import { widgetService } from '../services/widgetService';
import type { Flashcard } from '../types/flashcard';

const updateWidget = (card: Flashcard) => {
  widgetService.updateWidget(card);
};

interface UseCardIndexOptions {
  cards: Flashcard[];
  routeCardId?: string;
}

export const useCardIndex = ({ cards, routeCardId }: UseCardIndexOptions) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const prevCardsLengthRef = useRef(0);
  const hasInitializedFromRoute = useRef(false);

  const handleCardSelect = useCallback(
    (index: number) => {
      setCurrentCardIndex(index);
      const card = cards[index];
      if (card) {
        updateWidget(card);
      }
    },
    [cards]
  );

  // Handle initial load from route params (highest priority)
  useEffect(() => {
    if (cards.length === 0) return;

    if (routeCardId && !hasInitializedFromRoute.current) {
      const foundIndex = cards.findIndex((card) => card.id === routeCardId);
      if (foundIndex !== -1) {
        hasInitializedFromRoute.current = true;
        setCurrentCardIndex(foundIndex);
        updateWidget(cards[foundIndex]);
        prevCardsLengthRef.current = cards.length;
        return;
      }
    }

    // Handle cards array changes (e.g., discipline filter changes)
    if (prevCardsLengthRef.current !== cards.length) {
      setCurrentCardIndex((prevIndex) => {
        const safeIndex = prevIndex >= cards.length ? 0 : prevIndex;
        const cardToShow = cards[safeIndex];
        if (cardToShow) {
          updateWidget(cardToShow);
        }
        prevCardsLengthRef.current = cards.length;
        return safeIndex;
      });
    }
  }, [cards, routeCardId]);

  // Reset the route initialization flag when routeCardId changes
  useEffect(() => {
    if (routeCardId) {
      hasInitializedFromRoute.current = false;
    }
  }, [routeCardId]);

  const currentCard = cards[currentCardIndex];

  // Sync current card to widget whenever it changes
  useEffect(() => {
    if (currentCard) {
      updateWidget(currentCard);
    }
  }, [currentCard]);

  return {
    currentCardIndex,
    currentCard,
    handleCardSelect,
  };
};
