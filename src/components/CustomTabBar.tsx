import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, fontFamily, fontSize } from '../theme/tokens';
import { tomeIcon } from '../utils/tabIcons';
import { TabIcon } from './TabIcon';

export const CustomTabBar: React.FC<BottomTabBarProps> = (props) => {
  const { state, descriptors, navigation } = props;
  const stackNavigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const handleSearchPress = () => {
    Keyboard.dismiss();
    stackNavigation.navigate('Search');
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            Keyboard.dismiss();
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

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Search"
          onPress={handleSearchPress}
          style={styles.tabItem}
        >
          <TabIcon IconComponent={tomeIcon} color={colors.gold.main} size={24} />
          <Text
            style={[
              styles.label,
              {
                color: colors.gold.main,
              },
            ]}
          >
            Search
          </Text>
        </Pressable>
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
