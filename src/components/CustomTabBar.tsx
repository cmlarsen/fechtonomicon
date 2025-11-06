import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TermsSearchBar } from './terms/TermsSearchBar';
import { useTermsSearch } from '../contexts/TermsSearchContext';
import { colors, fontFamily, fontSize } from '../theme/tokens';

export const CustomTabBar: React.FC<BottomTabBarProps> = (props) => {
  const { state, descriptors, navigation } = props;
  const { searchQuery, setSearchQuery } = useTermsSearch();
  const activeRoute = state.routes[state.index];
  const isTermsTab = activeRoute.name === 'Terms';

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      {isTermsTab && (
        <View style={styles.searchContainer}>
          <TermsSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={handleClearSearch}
          />
        </View>
      )}
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const TabBarIcon = options.tabBarIcon;
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
            >
              {TabBarIcon?.({
                focused: isFocused,
                color: isFocused ? colors.iron.dark : colors.gold.main,
                size: 24,
              })}
              {typeof label === 'string' && (
                <Text
                  style={[
                    styles.label,
                    {
                      color: isFocused ? colors.iron.dark : colors.gold.main,
                    },
                  ]}
                >
                  {label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.parchment.primary,
    borderTopWidth: 1,
    borderTopColor: colors.gold.main,
  },
  searchContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(201, 171, 106, 0.3)',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    marginTop: 4,
  },
});
