import Carousel, {
  type ICarouselInstance,
} from "react-native-reanimated-carousel";
import { Dimensions, StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";

import { Flashcard } from "./Flashcard";
import type { Flashcard as FlashcardType } from "../types/flashcard";

interface FlashcardSwiperProps {
  cards: FlashcardType[];
  initialIndex?: number;
  onCardChange?: (card: FlashcardType, index: number) => void;
  onRelatedCardPress?: (cardId: string) => void;
  onScrollProgress?: (offsetProgress: number, absoluteProgress: number) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 1; // Cards take 92% of screen width for subtle peek effect

interface AnimatedCardProps {
  item: FlashcardType;
  animationValue: SharedValue<number>;
  onRelatedCardPress?: (cardId: string) => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  item,
  animationValue,
  onRelatedCardPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.8, 1, 0.8]
    );

    const shadowOpacity = interpolate(
      animationValue.value,
      [-0.5, 0, 0.5],
      [0, 0.6, 0]
    );

    return {
      opacity,
      shadowOpacity,
    };
  }, [animationValue]);

  return (
    <Animated.View style={[styles.cardWrapper, animatedStyle]}>
      <Flashcard card={item} onRelatedCardPress={onRelatedCardPress} />
    </Animated.View>
  );
};

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
        renderItem={({ item, animationValue }) => {
          return (
            <AnimatedCard
              item={item}
              animationValue={animationValue}
              onRelatedCardPress={onRelatedCardPress}
            />
          );
        }}
        width={CARD_WIDTH}
        // height={SCREEN_HEIGHT}
        loop={false}
        defaultIndex={initialIndex}
        onSnapToItem={handleSnapToItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 50,
        }}
        // panGestureHandlerProps={{
        //   activeOffsetX: [-10, 10],
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
    elevation: 12,
  },
});
