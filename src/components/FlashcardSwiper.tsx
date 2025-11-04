import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { Flashcard } from './Flashcard';
import type { Flashcard as FlashcardType } from '../types/flashcard';
import { spacing } from '../theme/tokens';

interface FlashcardSwiperProps {
  cards: FlashcardType[];
  initialIndex?: number;
  onCardChange?: (card: FlashcardType, index: number) => void;
  onRelatedCardPress?: (cardId: string) => void;
  onScrollProgress?: (offsetProgress: number, absoluteProgress: number) => void;
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.92; // Cards take 92% of screen width for subtle peek effect

export const FlashcardSwiper: React.FC<FlashcardSwiperProps> = ({
  cards,
  initialIndex = 0,
  onCardChange,
  onRelatedCardPress,
}) => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const currentIndexRef = useRef(initialIndex);

  useEffect(() => {
    if (initialIndex !== currentIndexRef.current && carouselRef.current) {
      carouselRef.current.scrollTo({
        index: initialIndex,
        animated: true,
      });
      currentIndexRef.current = initialIndex;
    }
  }, [initialIndex]);

  const handleSnapToItem = (index: number) => {
    currentIndexRef.current = index;
    if (onCardChange && cards[index]) {
      onCardChange(cards[index], index);
    }
  };

  if (cards.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={cards}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <Flashcard card={item} onRelatedCardPress={onRelatedCardPress} />
          </View>
        )}
        width={CARD_WIDTH}
        height={SCREEN_HEIGHT}
        loop={false}
        defaultIndex={initialIndex}
        onSnapToItem={handleSnapToItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 50,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
