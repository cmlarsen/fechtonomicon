import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { usePostHog } from 'posthog-react-native';
import React, { useCallback } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { CommandBar } from '../components/CommandBar';
import { Flashcard } from '../components/Flashcard';
import { LoadingState } from '../components/LoadingState';
import { useCardIndex } from '../hooks/useCardIndex';
import { useCardLoader } from '../hooks/useCardLoader';
import { useFilteredCards } from '../hooks/useFilteredCards';
import type { RootStackParamList, RootTabParamList } from '../navigation/AppNavigator';
import { colors, fontFamily, fontSize, spacing } from '../theme/tokens';
import type { Flashcard as FlashcardType } from '../types/flashcard';

type CardScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Terms'>,
  StackNavigationProp<RootStackParamList>
>;

type CardScreenRouteProp = RouteProp<RootTabParamList, 'Terms'>;

interface CardScreenProps {
  navigation: CardScreenNavigationProp;
  route: CardScreenRouteProp;
}

export const CardScreen: React.FC<CardScreenProps> = ({ navigation, route }) => {
  const posthog = usePostHog();
  const { isLoading } = useCardLoader();
  const { disciplineFilteredCards } = useFilteredCards();
  const { currentCard, currentCardIndex, handleCardSelect } = useCardIndex({
    cards: disciplineFilteredCards,
    routeCardId: route.params?.cardId,
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
      // Navigate to the Terms screen with the cardId param to display that card
      navigation.navigate('Terms', { cardId });
    },
    [navigation]
  );

  const handlePrev = useCallback(() => {
    if (currentCardIndex > 0) {
      posthog?.capture('prev_button_tapped');
      handleCardSelect(currentCardIndex - 1);
    }
  }, [currentCardIndex, handleCardSelect, posthog]);

  const handleNext = useCallback(() => {
    if (currentCardIndex < disciplineFilteredCards.length - 1) {
      posthog?.capture('next_button_tapped');
      handleCardSelect(currentCardIndex + 1);
    }
  }, [currentCardIndex, disciplineFilteredCards.length, handleCardSelect, posthog]);

  const handleDetails = useCallback(() => {
    if (currentCard) {
      handleOpenDetails(currentCard);
    }
  }, [currentCard, handleOpenDetails]);

  const handleDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const showLoading = isLoading || disciplineFilteredCards.length === 0;

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        {showLoading ? (
          <LoadingState />
        ) : (
          <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <View style={styles.detailContainer}>
              <Flashcard card={currentCard} onTermPress={handleTermPress} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {!showLoading && (
        <CommandBar
          currentCard={currentCard}
          canGoPrev={currentCardIndex > 0}
          canGoNext={currentCardIndex < disciplineFilteredCards.length - 1}
          onPrev={handlePrev}
          onNext={handleNext}
          onDetails={handleDetails}
        />
      )}
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    flex: 1,
  },
});
