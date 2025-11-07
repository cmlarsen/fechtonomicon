import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { useTermsSearch } from '../contexts/TermsSearchContext';
import { TermsSearchBar } from './terms/TermsSearchBar';

export const TAB_BAR_HEIGHT = 79;

export const FloatingSearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useTermsSearch();

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        console.log('keyboardWillShow', e.endCoordinates.height);
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const bottomOffset = keyboardHeight > 0 ? keyboardHeight - TAB_BAR_HEIGHT - 20 : 0;

  return (
    <View
      style={[
        styles.container,
        {
          bottom: bottomOffset,
        },
      ]}
      pointerEvents="box-none"
    >
      <TermsSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={handleClearSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,

    height: TAB_BAR_HEIGHT,
    zIndex: 1000,
    backgroundColor: 'red',
  },
});
