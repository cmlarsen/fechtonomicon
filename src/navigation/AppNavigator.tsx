import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PostHogProvider, usePostHog } from 'posthog-react-native';
import React from 'react';
import { AppState, StyleSheet } from 'react-native';
import { DrawerContent } from '../components/DrawerContent';
import { TabIcon } from '../components/TabIcon';
import { DrawerProvider } from '../contexts/DrawerContext';
import { CardScreen } from '../screens/CardScreen';
import { FlashcardDetailScreen } from '../screens/FlashcardDetailScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { colors, fontFamily, fontSize } from '../theme/tokens';
import { blacksmithingIcon, swordsIcon, tomeIcon } from '../utils/tabIcons';

export type RootStackParamList = {
  Main: undefined;
  FlashcardDetail: { cardId: string };
};

export type RootTabParamList = {
  Terms: undefined;
  Quiz: undefined;
  Settings: undefined;
};

export type RootDrawerParamList = {
  Card: { cardId?: string } | undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const linking = {
  prefixes: ['hemaflashcards://', 'https://hemaflashcards.app', 'http://localhost:8081'],
  config: {
    screens: {
      Main: {
        screens: {
          Terms: {
            screens: {
              Card: {
                path: 'card/:cardId?',
                parse: {
                  cardId: (cardId: string) => cardId,
                },
              },
            },
          },
        },
      },
      FlashcardDetail: {
        path: 'card/:cardId/detail',
        parse: {
          cardId: (cardId: string) => cardId,
        },
      },
    },
  },
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Card"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerType: 'front',
        drawerStyle: {
          width: 300,
          backgroundColor: colors.background.card,
        },
      }}
    >
      <Drawer.Screen name="Card" component={CardScreen} />
    </Drawer.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.iron.dark,
        tabBarInactiveTintColor: colors.gold.main,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="Terms"
        component={DrawerNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabIcon IconComponent={tomeIcon} color={color} size={24} />,
          tabBarLabel: 'Terms',
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon IconComponent={swordsIcon} color={color} size={24} />,
          tabBarLabel: 'Quiz',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon IconComponent={blacksmithingIcon} color={color} size={24} />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

function AppLifecycleTracker() {
  const posthog = usePostHog();

  React.useEffect(() => {
    if (posthog) {
      posthog.capture('app_opened');
    }
  }, [posthog]);

  React.useEffect(() => {
    if (!posthog) return;

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        posthog.capture('app_closed');
      }
    });

    return () => {
      subscription.remove();
    };
  }, [posthog]);

  return null;
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.parchment.primary,
    borderTopWidth: 1,
    borderTopColor: colors.gold.main,
  },
  tabBarLabel: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    marginTop: 4,
  },
  tabBarIcon: {
    marginTop: 4,
  },
});

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer linking={linking as LinkingOptions<RootStackParamList>}>
      <DrawerProvider>
        <PostHogProvider
          apiKey="phc_ViNvLkNIZ1xrvw99zorMROwBFCW3yrJ1QWELgql08MZ"
          options={{
            host: 'https://us.i.posthog.com',
          }}
        >
          <AppLifecycleTracker />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen
              name="FlashcardDetail"
              component={FlashcardDetailScreen}
              options={{
                presentation: 'modal',
                gestureEnabled: true,
                gestureDirection: 'vertical',
                animationTypeForReplace: 'push',
              }}
            />
          </Stack.Navigator>
        </PostHogProvider>
      </DrawerProvider>
    </NavigationContainer>
  );
};
