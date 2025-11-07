import { usePostHog } from 'posthog-react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import germanData from '../../assets/data/german-longsword-data.json';
import italianData from '../../assets/data/italian-longsword-data.json';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { FloatingSearchBar } from '../components/FloatingSearchBar';
import { LoadingState } from '../components/LoadingState';
import { TermsListDetail } from '../components/TermsListDetail';
import { useTermsSearch } from '../contexts/TermsSearchContext';
import { widgetService } from '../services/widgetService';
import { useFlashcardStore } from '../store/flashcardStore';
import type { Flashcard as FlashcardType } from '../types/flashcard';
import { getDisciplineFromCardId } from '../utils/disciplineMapper';

interface DataFileRecord {
  id: string;
  originalTerm: string;
  englishTerm: string;
  category: string;
  weapon?: string;
  briefDescription?: string;
  fullDescription?: string;
  briefApplication?: string;
  fullApplication?: string;
  [key: string]: unknown;
}

interface DataFile {
  records: DataFileRecord[];
}

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
  const loadCards = useFlashcardStore((state) => state.loadCards);
  const allCards = useFlashcardStore((state) => state.allCards);
  const selectedDisciplines = useFlashcardStore((state) => state.selectedDisciplines);
  const { searchQuery } = useTermsSearch();
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const prevCardsLengthRef = React.useRef(0);
  const cardsLoadedRef = React.useRef(false);

  // Load cards only once on mount
  useEffect(() => {
    if (cardsLoadedRef.current) return;
    cardsLoadedRef.current = true;
    setIsLoading(true);

    try {
      const italianRecords = (italianData as DataFile).records;
      const germanRecords = (germanData as DataFile).records;
      const allRecords = [...italianRecords, ...germanRecords];

      const cardsWithDiscipline: FlashcardType[] = allRecords.map((card) => ({
        ...card,
        weapon: card.weapon || 'longsword',
        briefDescription: card.briefDescription || '',
        discipline: getDisciplineFromCardId(card.id),
      }));

      loadCards(cardsWithDiscipline);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading cards:', error);
      setIsLoading(false);
    }
  }, [loadCards]);

  // Memoize filtered and sorted cards
  const sortedCards = useMemo(() => {
    console.log('sortedCards re-render');
    if (allCards.length === 0) return [];

    const filtered = allCards.filter((card) => {
      return card.discipline && selectedDisciplines.includes(card.discipline);
    });

    return [...filtered].sort((a, b) => a.originalTerm.localeCompare(b.originalTerm));
  }, [allCards, selectedDisciplines]);

  // Preserve current card index when cards list changes
  useEffect(() => {
    if (sortedCards.length === 0) {
      prevCardsLengthRef.current = 0;
      setCurrentCardIndex(0);
      return;
    }

    // Get current card ID from store
    const currentCardId = useFlashcardStore.getState().currentCard?.id;

    if (currentCardId) {
      // Try to find the current card in the new list
      const newIndex = sortedCards.findIndex((card) => card.id === currentCardId);
      if (newIndex !== -1) {
        // Current card still exists, preserve its position
        prevCardsLengthRef.current = sortedCards.length;
        setCurrentCardIndex(newIndex);
        // Update store with the card at new index
        const cardToShow = sortedCards[newIndex];
        if (cardToShow) {
          useFlashcardStore.setState({ currentCard: cardToShow });
          widgetService.updateWidget(cardToShow);
        }
        return;
      }
    }

    // Only update if the cards list actually changed (not just a re-render)
    if (prevCardsLengthRef.current !== sortedCards.length) {
      // Current card not found or list length changed, check if current index is still valid
      setCurrentCardIndex((prevIndex) => {
        const safeIndex = prevIndex >= sortedCards.length ? 0 : prevIndex;
        const cardToShow = sortedCards[safeIndex];
        if (cardToShow) {
          useFlashcardStore.setState({ currentCard: cardToShow });
          widgetService.updateWidget(cardToShow);
        }
        prevCardsLengthRef.current = sortedCards.length;
        return safeIndex;
      });
    }
  }, [sortedCards]);

  // Handle deep link only when route params change
  useEffect(() => {
    if (sortedCards.length === 0) return;

    const cardIdFromRoute = route?.params?.cardId;
    if (!cardIdFromRoute) return;

    const foundIndex = sortedCards.findIndex((card) => card.id === cardIdFromRoute);
    if (foundIndex !== -1) {
      setCurrentCardIndex(foundIndex);
      const cardToShow = sortedCards[foundIndex];
      useFlashcardStore.setState({ currentCard: cardToShow });
      widgetService.updateWidget(cardToShow);
    }
  }, [route?.params?.cardId, sortedCards]);

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

  const handleCardSelect = useCallback(
    (index: number) => {
      setCurrentCardIndex(index);
      const card = sortedCards[index];
      if (card) {
        useFlashcardStore.setState({ currentCard: card });
        widgetService.updateWidget(card);
      }
    },
    [sortedCards]
  );

  const currentCard = sortedCards[currentCardIndex];
  const showLoading = isLoading || sortedCards.length === 0;

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        {showLoading ? (
          <LoadingState />
        ) : (
          <TermsListDetail
            cards={sortedCards}
            currentCardIndex={currentCardIndex}
            selectedCardId={currentCard?.id}
            searchQuery={searchQuery}
            onCardSelect={handleCardSelect}
            onOpenDetails={handleOpenDetails}
            onTermPress={handleTermPress}
          />
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
});
