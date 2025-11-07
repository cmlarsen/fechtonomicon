import { useCallback, useEffect, useRef, useState } from 'react';
import { useFlashcardStore } from '../store/flashcardStore';
import type { Flashcard } from '../types/flashcard';
import { widgetService } from '../services/widgetService';

const updateCardInStoreAndWidget = (card: Flashcard) => {
  useFlashcardStore.setState({ currentCard: card });
  widgetService.updateWidget(card);
};

interface UseCardIndexOptions {
  cards: Flashcard[];
  routeCardId?: string;
}

export const useCardIndex = ({ cards, routeCardId }: UseCardIndexOptions) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const prevCardsLengthRef = useRef(0);

  const handleCardSelect = useCallback(
    (index: number) => {
      setCurrentCardIndex(index);
      const card = cards[index];
      if (card) {
        updateCardInStoreAndWidget(card);
      }
    },
    [cards]
  );

  useEffect(() => {
    if (cards.length === 0) {
      prevCardsLengthRef.current = 0;
      setCurrentCardIndex(0);
      return;
    }

    const currentCardId = useFlashcardStore.getState().currentCard?.id;

    if (currentCardId) {
      const newIndex = cards.findIndex((card) => card.id === currentCardId);
      if (newIndex !== -1) {
        prevCardsLengthRef.current = cards.length;
        setCurrentCardIndex(newIndex);
        const cardToShow = cards[newIndex];
        if (cardToShow) {
          updateCardInStoreAndWidget(cardToShow);
        }
        return;
      }
    }

    if (prevCardsLengthRef.current !== cards.length) {
      setCurrentCardIndex((prevIndex) => {
        const safeIndex = prevIndex >= cards.length ? 0 : prevIndex;
        const cardToShow = cards[safeIndex];
        if (cardToShow) {
          updateCardInStoreAndWidget(cardToShow);
        }
        prevCardsLengthRef.current = cards.length;
        return safeIndex;
      });
    }
  }, [cards]);

  useEffect(() => {
    if (cards.length === 0 || !routeCardId) return;

    const foundIndex = cards.findIndex((card) => card.id === routeCardId);
    if (foundIndex !== -1) {
      setCurrentCardIndex(foundIndex);
      const cardToShow = cards[foundIndex];
      updateCardInStoreAndWidget(cardToShow);
    }
  }, [routeCardId, cards]);

  const currentCard = cards[currentCardIndex];

  return {
    currentCardIndex,
    currentCard,
    handleCardSelect,
  };
};
