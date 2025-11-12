import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { BackgroundPattern } from '../../components/BackgroundPattern';
import { IconButton } from '../../components/buttons';
import { TermsList } from '../../components/terms/TermsList';
import { TermsSearchBar } from '../../components/terms/TermsSearchBar';
import { useTermsSearch } from '../../contexts/TermsSearchContext';
import { useFilteredCards } from '../../hooks/useFilteredCards';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme/tokens';
import type { Term } from '../../types/term';

type SearchScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Search'>,
  StackNavigationProp<RootStackParamList>
>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const { searchQuery, setSearchQuery } = useTermsSearch();
  const { filteredAndSortedCards } = useFilteredCards();
  const [isKeyboardVisible] = useState(false);

  const handleCardPress = useCallback(
    (card: Term) => {
      Keyboard.dismiss();
      navigation.goBack();
      navigation.navigate('Main', {
        screen: 'Terms',
        params: { cardId: card.id },
      });
    },
    [navigation]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  const dismissKeyboard = useCallback(() => {
    setSearchQuery('');
    Keyboard.dismiss();
  }, [setSearchQuery]);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <IconButton icon="✕" onPress={handleClose} size="small" variant="gold" />
        </View>

        <View style={styles.content}>
          <View style={styles.listContainer}>
            <TermsList
              cards={filteredAndSortedCards}
              selectedCardId={undefined}
              onCardPress={handleCardPress}
              searchQuery={searchQuery}
              showSelected={false}
              scrollToSelected={false}
            />
          </View>
        </View>

        <View style={styles.searchBarContainer}>
          <TermsSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={handleClearSearch}
          />
          {isKeyboardVisible && (
            <IconButton icon="✕" onPress={dismissKeyboard} size="small" variant="gold" />
          )}
        </View>
      </View>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.parchment.primary,
    borderTopWidth: 1,
    borderTopColor: colors.gold.main,
  },
});
