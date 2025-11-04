import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  shadows,
  spacing,
} from "../theme/tokens";

import { BackgroundPattern } from "../components/BackgroundPattern";
import { DrawerActions } from "@react-navigation/native";
import type { Flashcard } from "../types/flashcard";
import { FlashcardSwiper } from "../components/FlashcardSwiper";
import flashcardsData from "../../assets/data/flashcards.json";
import { useDrawerContext } from "../contexts/DrawerContext";
import { useFlashcardStore } from "../store/flashcardStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { widgetService } from "../services/widgetService";

interface CardScreenProps {
  navigation: {
    navigate: (screen: string) => void;
    dispatch: (action: unknown) => void;
  };
}

export const CardScreen: React.FC<CardScreenProps> = ({ navigation }) => {
  const { loadCards, loadFromStorage, allCards, selectedDisciplines } =
    useFlashcardStore();
  const { setCards, setOnCardPress } = useDrawerContext();
  const insets = useSafeAreaInsets();
  const [shuffledCards, setShuffledCards] = React.useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

  useEffect(() => {
    try {
      loadFromStorage();
      loadCards((flashcardsData as any).records as Flashcard[]);
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

      // Update current card
      if (shuffled.length > 0) {
        useFlashcardStore.setState({ currentCard: shuffled[0] });
        widgetService.updateWidget(shuffled[0]);
      }
    }
  }, [allCards, selectedDisciplines, setCards]);

  const handleCardChange = (card: Flashcard, index: number) => {
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

  return (
    <BackgroundPattern>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={[styles.swiperContainer]}>
          <FlashcardSwiper
            cards={shuffledCards}
            initialIndex={currentCardIndex}
            onCardChange={handleCardChange}
            onRelatedCardPress={handleRelatedCardPress}
          />
        </View>

        {/* Always-visible FAB with sword-pommel icon */}
        {/* <View style={[styles.fab, { bottom: insets.bottom + spacing.xl }]}> */}
        <View style={[styles.fab]}>
          <TouchableOpacity
            style={styles.fabButton}
            onPress={toggleDrawer}
            activeOpacity={0.85}
          >
            <Text style={styles.fabIcon}>⚔</Text>
          </TouchableOpacity>
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
  fab: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // alignItems: 'center',
    // zIndex: 100,
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
    // Embossed seal effect
    shadowColor: colors.gold.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: fontSize.xl,
    color: colors.gold.dark,
    // Slight embossed text
    textShadowColor: "rgba(255, 255, 255, 0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  footer: {
    padding: spacing.lg,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  footerText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyMedium,
    color: colors.text.light,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
