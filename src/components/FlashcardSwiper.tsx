import React, { useEffect, useRef, useCallback, memo, useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel, {
  type ICarouselInstance,
} from "react-native-reanimated-carousel";
import type { Flashcard as FlashcardType } from "../types/flashcard";
import { Flashcard } from "./Flashcard";

interface FlashcardSwiperProps {
  cards: FlashcardType[];
  initialIndex?: number;
  onCardChange?: (card: FlashcardType, index: number) => void;
  onRelatedCardPress?: (cardId: string) => void;
  onOpenDetails?: (card: FlashcardType) => void;
  onTermPress?: (cardId: string) => void;
  onScrollProgress?: (offsetProgress: number, absoluteProgress: number) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 1; // Cards take 92% of screen width for subtle peek effect

interface AnimatedCardProps {
  item: FlashcardType;
  animationValue: SharedValue<number>;
  onOpenDetails?: (card: FlashcardType) => void;
  onTermPress?: (cardId: string) => void;
}

const AnimatedCard = memo<AnimatedCardProps>(
  ({ item, animationValue, onOpenDetails, onTermPress }) => {
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

    const handleOpenDetails = useCallback(() => {
      if (onOpenDetails) {
        onOpenDetails(item);
      }
    }, [item, onOpenDetails]);

    return (
      <Animated.View style={[styles.cardWrapper, animatedStyle]}>
        <Flashcard
          card={item}
          onOpenDetails={onOpenDetails ? handleOpenDetails : undefined}
          onTermPress={onTermPress}
        />
      </Animated.View>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

// Custom comparison function for memo to prevent unnecessary re-renders
const arePropsEqual = (
  prevProps: FlashcardSwiperProps,
  nextProps: FlashcardSwiperProps
): boolean => {
  // If cards array length changed, need to re-render
  if (prevProps.cards.length !== nextProps.cards.length) {
    return false;
  }

  // If initialIndex changed, need to re-render
  if (prevProps.initialIndex !== nextProps.initialIndex) {
    return false;
  }

  // Check if card IDs are the same (reference equality for callbacks)
  const prevCardIds = prevProps.cards.map((c) => c.id).join(",");
  const nextCardIds = nextProps.cards.map((c) => c.id).join(",");
  if (prevCardIds !== nextCardIds) {
    return false;
  }

  // Callbacks should be stable, but if they change, we need to re-render
  if (
    prevProps.onCardChange !== nextProps.onCardChange ||
    prevProps.onRelatedCardPress !== nextProps.onRelatedCardPress ||
    prevProps.onOpenDetails !== nextProps.onOpenDetails ||
    prevProps.onTermPress !== nextProps.onTermPress
  ) {
    return false;
  }

  return true;
};

const FlashcardSwiperComponent: React.FC<FlashcardSwiperProps> = ({
  cards,
  initialIndex = 0,
  onCardChange,
  onRelatedCardPress,
  onOpenDetails,
  onTermPress,
}) => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const currentIndexRef = useRef(initialIndex);

  // Create a stable key based on card IDs to force remount only when cards actually change
  const carouselKey = useMemo(() => {
    return cards.map((c) => c.id).join("-");
  }, [cards]);

  useEffect(() => {
    if (initialIndex !== currentIndexRef.current && carouselRef.current) {
      carouselRef.current.scrollTo({
        index: initialIndex,
        animated: true,
      });
      currentIndexRef.current = initialIndex;
    }
  }, [initialIndex]);

  const handleSnapToItem = useCallback(
    (index: number) => {
      currentIndexRef.current = index;
      if (onCardChange && cards[index]) {
        onCardChange(cards[index], index);
      }
    },
    [onCardChange, cards]
  );

  const renderItem = useCallback(
    ({
      item,
      animationValue,
    }: {
      item: FlashcardType;
      animationValue: SharedValue<number>;
    }) => {
      return (
        <AnimatedCard
          item={item}
          animationValue={animationValue}
          onOpenDetails={onOpenDetails}
          onTermPress={onTermPress}
        />
      );
    },
    [onOpenDetails, onTermPress]
  );

  if (cards.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel
        key={carouselKey}
        ref={carouselRef}
        data={cards}
        renderItem={renderItem}
        width={CARD_WIDTH}
        loop={false}
        defaultIndex={initialIndex}
        onSnapToItem={handleSnapToItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
};

export const FlashcardSwiper = memo(FlashcardSwiperComponent, arePropsEqual);
FlashcardSwiper.displayName = "FlashcardSwiper";

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
