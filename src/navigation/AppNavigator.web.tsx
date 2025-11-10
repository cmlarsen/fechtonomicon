import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PostHogProvider, usePostHog } from 'posthog-react-native';
import React from 'react';
import { AppState } from 'react-native';
import { CustomTabBar } from '../components-web/CustomTabBar';
import { TabIcon } from '../components/navigation';
import { TermsSearchProvider } from '../contexts/TermsSearchContext';
import { QuizScreen } from '../screens-web/QuizScreen';
import { SearchScreen } from '../screens-web/SearchScreen';
import { SettingsScreen } from '../screens-web/SettingsScreen';
import { TermsScreen } from '../screens-web/TermsScreen';
import { swordsIcon, tomeIcon } from '../utils/tabIcons';
import type { RootStackParamList, RootTabParamList } from './types';

export type { RootStackParamList, RootTabParamList };

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const linking = {
  prefixes: ['fechtonomicon://', 'https://hemaflashcards.app', 'http://localhost:8081'],
  config: {
    screens: {
      Main: {
        screens: {
          Terms: {
            path: 'card/:cardId?',
            parse: {
              cardId: (cardId: string) => cardId,
            },
          },
        },
      },
    },
  },
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Terms"
        component={TermsScreen}
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
          tabBarIcon: ({ color }) => <TabIcon IconComponent={swordsIcon} color={color} size={24} />,
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

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer linking={linking as LinkingOptions<RootStackParamList>}>
      <PostHogProvider
        apiKey="phc_ViNvLkNIZ1xrvw99zorMROwBFCW3yrJ1QWELgql08MZ"
        options={{
          host: 'https://us.i.posthog.com',
        }}
      >
        <TermsSearchProvider>
          <AppLifecycleTracker />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                presentation: 'modal',
                gestureEnabled: true,
                gestureDirection: 'vertical',
                animationTypeForReplace: 'push',
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                presentation: 'modal',
                gestureEnabled: true,
                gestureDirection: 'vertical',
                animationTypeForReplace: 'push',
              }}
            />
          </Stack.Navigator>
        </TermsSearchProvider>
      </PostHogProvider>
    </NavigationContainer>
  );
};
