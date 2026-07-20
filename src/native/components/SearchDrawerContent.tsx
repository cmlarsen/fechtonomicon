import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TermsList } from '../../components/terms/TermsList';
import { TermsSearchBar } from '../../components/terms/TermsSearchBar';
import { useTermsSearch } from '../../contexts/TermsSearchContext';
import { useFilteredCards } from '../../hooks/useFilteredCards';
import { colors } from '../../theme/tokens';
import type { Term } from '../../types/term';
import { DisciplineSelector } from './DisciplineSelector';

export const SearchDrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { searchQuery, setSearchQuery } = useTermsSearch();
  const { filteredAndSortedCards } = useFilteredCards();
  const insets = useSafeAreaInsets();

  const handleCardPress = useCallback(
    (card: Term) => {
      Keyboard.dismiss();
      navigation.closeDrawer();
      // Navigate to the Terms screen with the selected card
      setTimeout(() => {
        navigation.navigate('Terms', { cardId: card.id });
      }, 100);
    },
    [navigation]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topSection}>
        <DisciplineSelector />
      </View>

      <View style={styles.searchBarContainer}>
        <TermsSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
        />
      </View>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment.primary,
  },
  topSection: {},
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
});
