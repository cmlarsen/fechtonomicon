import React, { useCallback, useRef } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, fontFamily, fontSize, spacing } from '../../theme/tokens';

interface TermsSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
}

export const TermsSearchBar: React.FC<TermsSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
}) => {
  const inputRef = useRef<TextInput>(null);

  const handleClearSearch = useCallback(() => {
    onClearSearch();
    inputRef.current?.blur();
    Keyboard.dismiss();
  }, [onClearSearch]);

  const handleInputFocus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Search terms..."
          placeholderTextColor={colors.text.secondary}
          value={searchQuery}
          onChangeText={onSearchChange}
          onFocus={handleInputFocus}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSearch}
            activeOpacity={0.7}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.parchment.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.gold.main,
    borderTopWidth: 1,
    borderTopColor: colors.gold.main,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.parchment.light,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    paddingHorizontal: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.body,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  clearButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    fontFamily: fontFamily.bodySemiBold,
  },
});
