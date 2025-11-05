import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import {
  borderRadius,
  colors,
  fontSize,
  shadows,
  spacing,
} from "../theme/tokens";

import { BackgroundPattern } from "../components/BackgroundPattern";
import { DrawerActions } from "@react-navigation/native";
import { Flashcard } from "../components/Flashcard";
import { FlashcardSwiper } from "../components/FlashcardSwiper";
import type { Flashcard as FlashcardType } from "../types/flashcard";
import flashcardsData from "../../assets/data/flashcards.json";
import { useDrawerContext } from "../contexts/DrawerContext";
import { useFlashcardStore } from "../store/flashcardStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { widgetService } from "../services/widgetService";

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

export const CardScreen: React.FC<CardScreenProps> = ({
  navigation,
  route,
}) => {
  const { loadCards, loadFromStorage, allCards, selectedDisciplines } =
    useFlashcardStore();
  const { setCards, setOnCardPress } = useDrawerContext();
  const insets = useSafeAreaInsets();
  const [shuffledCards, setShuffledCards] = React.useState<FlashcardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

  useEffect(() => {
    try {
      loadFromStorage();
      loadCards((flashcardsData as any).records as FlashcardType[]);
    } catch (error) {
      console.error("Error loading cards:", error);
    }
  }, [loadFromStorage, loadCards]);

  useEffect(() => {
    if (allCards.length > 0) {
      // Map weapon types to discipline format for filtering
      const weaponToDiscipline: Record<string, string> = {
        longsword: "meyer-longsword",
        rapier: "rapier",
        messer: "messer",
      };

      // Filter by selected disciplines and shuffle
      const filtered = allCards.filter((card) => {
        const cardDiscipline = weaponToDiscipline[card.weapon] || card.weapon;
        return selectedDisciplines.includes(cardDiscipline as any);
      });

      // Shuffle the cards for a random order
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);

      // Update drawer context with cards
      setCards(shuffled);

      // Handle deep link to specific card
      const cardIdFromRoute = route?.params?.cardId;
      let initialIndex = 0;

      if (cardIdFromRoute) {
        const foundIndex = shuffled.findIndex(
          (card) => card.id === cardIdFromRoute
        );
        if (foundIndex !== -1) {
          initialIndex = foundIndex;
          setCurrentCardIndex(foundIndex);
        }
      }

      // Update current card
      if (shuffled.length > 0) {
        const cardToShow = shuffled[initialIndex];
        useFlashcardStore.setState({ currentCard: cardToShow });
        widgetService.updateWidget(cardToShow);
      }
    }
  }, [allCards, selectedDisciplines, setCards, route?.params?.cardId]);

  const handleCardChange = (card: FlashcardType, index: number) => {
    setCurrentCardIndex(index);
    useFlashcardStore.setState({ currentCard: card });
    widgetService.updateWidget(card);
  };

  const handleRelatedCardPress = (cardId: string) => {
    const relatedCardIndex = shuffledCards.findIndex(
      (card) => card.id === cardId
    );
    if (relatedCardIndex !== -1) {
      setCurrentCardIndex(relatedCardIndex);
      if (Platform.OS === "web") {
        // On web, navigate to the card route
        navigation.navigate("Card", { cardId });
      }
    }
  };

  const handleNextCard = () => {
    const nextIndex = (currentCardIndex + 1) % shuffledCards.length;
    const nextCard = shuffledCards[nextIndex];
    setCurrentCardIndex(nextIndex);
    handleCardChange(nextCard, nextIndex);
    if (Platform.OS === "web") {
      navigation.navigate("Card", { cardId: nextCard.id });
    }
  };

  const handlePrevCard = () => {
    const prevIndex =
      currentCardIndex === 0 ? shuffledCards.length - 1 : currentCardIndex - 1;
    const prevCard = shuffledCards[prevIndex];
    setCurrentCardIndex(prevIndex);
    handleCardChange(prevCard, prevIndex);
    if (Platform.OS === "web") {
      navigation.navigate("Card", { cardId: prevCard.id });
    }
  };

  const handleCardIndexPress = React.useCallback(
    (cardId: string, index: number) => {
      // Scroll to the selected card
      setCurrentCardIndex(index);
      // Close the drawer
      navigation.dispatch(DrawerActions.closeDrawer());
    },
    [navigation]
  );

  // Set the card press callback in the drawer context
  useEffect(() => {
    setOnCardPress(() => handleCardIndexPress);
  }, [handleCardIndexPress, setOnCardPress]);

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const currentCard = shuffledCards[currentCardIndex];

  return (
    <BackgroundPattern>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        {Platform.OS === "web" ? (
          // Web: Single card with prev/next buttons
          <View style={styles.webCardContainer}>
            {currentCard && (
              <Flashcard
                card={currentCard}
                onRelatedCardPress={handleRelatedCardPress}
              />
            )}
          </View>
        ) : (
          // Mobile: Swipeable carousel
          <View style={[styles.swiperContainer]}>
            <FlashcardSwiper
              cards={shuffledCards}
              initialIndex={currentCardIndex}
              onCardChange={handleCardChange}
              onRelatedCardPress={handleRelatedCardPress}
            />
          </View>
        )}

        {/* Navigation controls at bottom */}
        <View style={[styles.bottomNav]}>
          {Platform.OS === "web" && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePrevCard}
              activeOpacity={0.85}
            >
              <Text style={styles.navButtonText}>←</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.fabButton}
            onPress={toggleDrawer}
            activeOpacity={0.85}
          >
            <Text style={styles.fabIcon}>⚔</Text>
          </TouchableOpacity>

          {Platform.OS === "web" && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={handleNextCard}
              activeOpacity={0.85}
            >
              <Text style={styles.navButtonText}>→</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  swiperContainer: {
    flex: 1,
  },
  webCardContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
  },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
    paddingVertical: spacing.md,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.round,
    backgroundColor: colors.parchment.light,
    justifyContent: "center",
    alignItems: "center",
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
    textShadowColor: "rgba(255, 255, 255, 0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.round,
    backgroundColor: colors.parchment.light,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "bold",
  },
});
