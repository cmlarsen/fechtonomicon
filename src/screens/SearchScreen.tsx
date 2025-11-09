import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { IconButton } from '../components/buttons';
import { TermsList } from '../components/terms/TermsList';
import { TermsSearchBar } from '../components/terms/TermsSearchBar';
import { useTermsSearch } from '../contexts/TermsSearchContext';
import { useFilteredCards } from '../hooks/useFilteredCards';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing } from '../theme/tokens';
import type { Term } from '../types/term';

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
  const insets = useSafeAreaInsets();
  const pendingCardIdRef = useRef<string | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleCardPress = useCallback(
    (card: Term) => {
      Keyboard.dismiss();
      // Store the cardId and close the modal
      pendingCardIdRef.current = card.id;
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

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <BackgroundPattern>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <View style={[styles.container, { paddingTop: insets.top }]}>
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

          <View style={[styles.searchBarContainer, { paddingBottom: insets.bottom }]}>
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
      </KeyboardAvoidingView>
    </BackgroundPattern>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
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
