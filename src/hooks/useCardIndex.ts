import { useCallback, useEffect, useRef, useState } from 'react';
import { widgetService } from '../services/widgetService';
import type { Term } from '../types/term';

const updateWidget = (card: Term) => {
  widgetService.updateWidget(card);
};

const indexOfId = (cards: Term[], id: string | undefined): number =>
  id ? cards.findIndex((card) => card.id === id) : -1;

interface UseCardIndexOptions {
  cards: Term[];
  routeCardId?: string;
}

export const useCardIndex = ({ cards, routeCardId }: UseCardIndexOptions) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // The card currently shown, tracked by id so we can follow it across list
  // changes (e.g. a discipline switch that produces a new, equal-length list).
  const currentCardIdRef = useRef<string | undefined>(undefined);
  const prevCardsRef = useRef<Term[] | null>(null);
  const prevRouteCardIdRef = useRef<string | undefined>(undefined);

  // Single place that moves the selection, keeping currentCardIdRef in sync so
  // the effect below never depends on effect-ordering to know the current card.
  const selectIndex = useCallback((index: number, sourceCards: Term[]) => {
    currentCardIdRef.current = sourceCards[index]?.id;
    setCurrentCardIndex(index);
  }, []);

  const handleCardSelect = useCallback(
    (index: number) => {
      selectIndex(index, cards);
    },
    [cards, selectIndex]
  );

  useEffect(() => {
    if (cards.length === 0) return;

    // 1) A newly-delivered route param takes priority — but only when it
    //    actually changes. Reacting to every render would jump the user back to
    //    the linked card and discard their Prev/Next navigation.
    const routeChanged = routeCardId !== prevRouteCardIdRef.current;
    prevRouteCardIdRef.current = routeCardId;

    if (routeCardId && routeChanged) {
      const foundIndex = indexOfId(cards, routeCardId);
      if (foundIndex !== -1) {
        prevCardsRef.current = cards;
        selectIndex(foundIndex, cards);
        return;
      }
    }

    // 2) The cards list itself changed (discipline switch, reload). Follow the
    //    currently-shown card if it still exists, otherwise reset to the first
    //    card. Comparing by reference — not length — so a same-length switch to
    //    a different discipline still resets instead of showing an unrelated card.
    if (prevCardsRef.current === cards) return;
    prevCardsRef.current = cards;
    const keptIndex = indexOfId(cards, currentCardIdRef.current);
    selectIndex(keptIndex === -1 ? 0 : keptIndex, cards);
  }, [cards, routeCardId, selectIndex]);

  const currentCard = cards[currentCardIndex];

  // Sync the current card to the widget whenever it changes.
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
