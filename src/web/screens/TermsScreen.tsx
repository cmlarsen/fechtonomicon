import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BackgroundPattern } from '../../components/BackgroundPattern';
import { LoadingState } from '../../components/LoadingState';
import { useCardIndex } from '../../hooks/useCardIndex';
import { useCardLoader } from '../../hooks/useCardLoader';
import { useFilteredCards } from '../../hooks/useFilteredCards';
import type { RootStackParamList, RootTabParamList } from '../../navigation/types';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';
import type { Term } from '../../types/term';
import { WebTopNav } from '../components/WebTopNav';
import { WebTwoColumnLayout } from '../components/WebTwoColumnLayout';

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
  const { isLoading } = useCardLoader();
  const { disciplineFilteredCards } = useFilteredCards();
  const { currentCard } = useCardIndex({
    cards: disciplineFilteredCards,
    routeCardId: route.params?.cardId,
  });

  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    if (route.state) {
      const tabState = route.state;
      if (tabState.index !== undefined && tabState.routes[tabState.index]) {
        return tabState.routes[tabState.index].name as keyof RootTabParamList;
      }
    }
    return 'Terms';
  });

  const handleCardPress = useCallback(
    (card: Term) => {
      navigation.navigate('Terms', { cardId: card.id });
    },
    [navigation]
  );

  const handleTermPress = useCallback(
    (cardId: string) => {
      navigation.navigate('Terms', { cardId });
    },
    [navigation]
  );

  const handleSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  const showLoading = isLoading;

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        <WebTopNav
          navigation={navigation}
          currentRoute={currentRouteName}
          onSettings={handleSettings}
        />
        {showLoading ? (
          <LoadingState />
        ) : disciplineFilteredCards.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No cards available for this discipline.</Text>
            <Text style={styles.emptyStateSubtext}>
              Try selecting a different discipline in settings.
            </Text>
          </View>
        ) : (
          <WebTwoColumnLayout
            cards={disciplineFilteredCards}
            currentCard={currentCard}
            selectedCardId={currentCard?.id}
            onCardPress={handleCardPress}
            onTermPress={handleTermPress}
          />
        )}
      </View>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyStateText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.main,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyStateSubtext: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyItalic,
    color: colors.iron.main,
    textAlign: 'center',
  },
});
