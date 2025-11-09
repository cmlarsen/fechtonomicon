import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { usePostHog } from 'posthog-react-native';
import React, { useCallback } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MagnifyingGlassIcon from '../../assets/icons/np_magnifying-glass.svg';
import SwordsIcon from '../../assets/icons/np_swords.svg';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { IconButton } from '../components/buttons';
import { LoadingState } from '../components/LoadingState';
import { TermCard } from '../components/TermCard';
import { useCardIndex } from '../hooks/useCardIndex';
import { useCardLoader } from '../hooks/useCardLoader';
import { useFilteredCards } from '../hooks/useFilteredCards';
import type { RootStackParamList, RootTabParamList } from '../navigation/AppNavigator';
import { colors, fontFamily, fontSize, shadows, spacing } from '../theme/tokens';
import { rgba } from '../utils/colorUtils';

type TermsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Terms'>,
  StackNavigationProp<RootStackParamList>
>;

type TermsScreenRouteProp = RouteProp<RootTabParamList, 'Terms'>;

interface TermsScreenProps {
  navigation: TermsScreenNavigationProp;
  route: TermsScreenRouteProp;
}

export const TermsScreen: React.FC<TermsScreenProps> = ({ navigation, route }) => {
  const posthog = usePostHog();
  const insets = useSafeAreaInsets();
  const stackNavigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isLoading } = useCardLoader();
  const { disciplineFilteredCards } = useFilteredCards();
  const { currentCard, currentCardIndex, handleCardSelect } = useCardIndex({
    cards: disciplineFilteredCards,
    routeCardId: route.params?.cardId,
  });

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

  const handleSearch = useCallback(() => {
    Keyboard.dismiss();
    stackNavigation.navigate('Search');
  }, [stackNavigation]);

  const handleSettings = useCallback(() => {
    Keyboard.dismiss();
    stackNavigation.navigate('Settings');
  }, [stackNavigation]);

  const showLoading = isLoading || disciplineFilteredCards.length === 0;

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        {!showLoading && (
          <View style={[styles.header, { paddingTop: insets.top }]}>
            <View style={styles.headerLeft}>
              <IconButton
                IconComponent={SwordsIcon}
                onPress={handleSettings}
                size="small"
                variant="burgundy"
              />
            </View>
            <Text style={styles.title}>Fechtonomicon</Text>
            <View style={styles.headerRight}>
              <IconButton
                IconComponent={MagnifyingGlassIcon}
                onPress={handleSearch}
                size="small"
                variant="burgundy"
              />
            </View>
          </View>
        )}

        {showLoading ? (
          <LoadingState />
        ) : (
          <View style={styles.detailContainer}>
            <TermCard
              card={currentCard}
              onTermPress={handleTermPress}
              onPrev={handlePrev}
              onNext={handleNext}
              canGoPrev={currentCardIndex > 0}
              canGoNext={currentCardIndex < disciplineFilteredCards.length - 1}
            />
          </View>
        )}
      </View>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.parchment.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.gold.main,
    ...shadows.sm,
  },
  title: {
    fontSize: fontSize.md,
    letterSpacing: 1.2,
    fontFamily: fontFamily.title,
    color: rgba(colors.gold.main, 0.8),
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    flex: 1,
    textAlign: 'center',
  },
  headerLeft: {
    alignItems: 'flex-start',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  detailContainer: {
    flex: 1,
  },
});
