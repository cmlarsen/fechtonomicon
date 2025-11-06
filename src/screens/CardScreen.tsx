import { DrawerActions } from '@react-navigation/native';
import { usePostHog } from 'posthog-react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import germanData from '../../assets/data/german-longsword-data.json';
import italianData from '../../assets/data/italian-longsword-data.json';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { Flashcard } from '../components/Flashcard';
import { FlashcardSwiper } from '../components/FlashcardSwiper';
import { LoadingState } from '../components/LoadingState';
import { useDrawerContext } from '../contexts/DrawerContext';
import { widgetService } from '../services/widgetService';
import { useFlashcardStore } from '../store/flashcardStore';
import { borderRadius, colors, fontSize, shadows, spacing } from '../theme/tokens';
import type { Flashcard as FlashcardType } from '../types/flashcard';
import { getDisciplineFromCardId } from '../utils/disciplineMapper';

interface DataFile {
  records: FlashcardType[];
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
  const { setCards, setOnCardPress } = useDrawerContext();
  const insets = useSafeAreaInsets();
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

      const cardsWithDiscipline = allRecords.map((card) => ({
        ...card,
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

  // Update drawer context only when sortedCards changes
  useEffect(() => {
    setCards(sortedCards);
  }, [sortedCards, setCards]);

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

  const handleCardChange = useCallback((card: FlashcardType, index: number) => {
    setCurrentCardIndex(index);
    useFlashcardStore.setState({ currentCard: card });
    widgetService.updateWidget(card);
  }, []);

  const handleRelatedCardPress = useCallback(
    (cardId: string) => {
      const relatedCardIndex = sortedCards.findIndex((card) => card.id === cardId);
      if (relatedCardIndex !== -1) {
        setCurrentCardIndex(relatedCardIndex);
        if (Platform.OS === 'web') {
          navigation.navigate('Card', { cardId });
        }
      }
    },
    [sortedCards, navigation]
  );

  const handleNextCard = useCallback(() => {
    const nextIndex = (currentCardIndex + 1) % sortedCards.length;
    const nextCard = sortedCards[nextIndex];
    setCurrentCardIndex(nextIndex);
    handleCardChange(nextCard, nextIndex);
    if (Platform.OS === 'web') {
      navigation.navigate('Card', { cardId: nextCard.id });
    }
  }, [currentCardIndex, sortedCards, handleCardChange, navigation]);

  const handlePrevCard = useCallback(() => {
    const prevIndex = currentCardIndex === 0 ? sortedCards.length - 1 : currentCardIndex - 1;
    const prevCard = sortedCards[prevIndex];
    setCurrentCardIndex(prevIndex);
    handleCardChange(prevCard, prevIndex);
    if (Platform.OS === 'web') {
      navigation.navigate('Card', { cardId: prevCard.id });
    }
  }, [currentCardIndex, sortedCards, handleCardChange, navigation]);

  const handleCardIndexPress = useCallback(
    (_cardId: string, index: number) => {
      setCurrentCardIndex(index);
      navigation.dispatch(DrawerActions.closeDrawer());
    },
    [navigation]
  );

  // Set the card press callback in the drawer context
  useEffect(() => {
    setOnCardPress(() => handleCardIndexPress);
  }, [handleCardIndexPress, setOnCardPress]);

  const toggleDrawer = useCallback(() => {
    posthog?.capture('fab_tapped');
    navigation.dispatch(DrawerActions.toggleDrawer());
  }, [navigation, posthog]);

  const currentCard = sortedCards[currentCardIndex];
  const showLoading = isLoading || sortedCards.length === 0;

  return (
    <BackgroundPattern>
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {showLoading ? (
          // Loading state
          <LoadingState />
        ) : Platform.OS === 'web' ? (
          // Web: Single card with prev/next buttons
          <View style={styles.webCardContainer}>
            {currentCard && (
              <Flashcard
                card={currentCard}
                onOpenDetails={() => handleOpenDetails(currentCard)}
                onTermPress={handleTermPress}
              />
            )}
          </View>
        ) : (
          // Mobile: Swipeable carousel
          <View style={[styles.swiperContainer]}>
            <FlashcardSwiper
              cards={sortedCards}
              initialIndex={currentCardIndex}
              onCardChange={handleCardChange}
              onRelatedCardPress={handleRelatedCardPress}
              onOpenDetails={handleOpenDetails}
              onTermPress={handleTermPress}
            />
          </View>
        )}

        {/* Navigation controls at bottom - only show when not loading */}
        {!showLoading && (
          <View style={[styles.bottomNav]}>
            {Platform.OS === 'web' && (
              <TouchableOpacity
                style={styles.navButton}
                onPress={handlePrevCard}
                activeOpacity={0.85}
              >
                <Text style={styles.navButtonText}>←</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.fabButton} onPress={toggleDrawer} activeOpacity={0.85}>
              <Text style={styles.fabIcon}>⚔</Text>
            </TouchableOpacity>

            {Platform.OS === 'web' && (
              <TouchableOpacity
                style={styles.navButton}
                onPress={handleNextCard}
                activeOpacity={0.85}
              >
                <Text style={styles.navButtonText}>→</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swiperContainer: {
    flex: 1,
  },
  webCardContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.sm,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.round,
    backgroundColor: colors.parchment.light,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.parchment,
    borderWidth: 3,
    borderColor: colors.gold.main,
    shadowColor: colors.gold.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: fontSize.xl,
    color: colors.gold.dark,
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.round,
    backgroundColor: colors.parchment.light,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.parchment,
    borderWidth: 2,
    borderColor: colors.gold.main,
    shadowColor: colors.gold.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  navButtonText: {
    fontSize: fontSize.xxl,
    color: colors.gold.dark,
    fontWeight: 'bold',
  },
});
