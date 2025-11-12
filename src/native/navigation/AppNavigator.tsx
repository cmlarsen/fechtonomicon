import type { DrawerHeaderProps } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PostHogProvider, usePostHog } from 'posthog-react-native';
import React from 'react';
import { AppState } from 'react-native';
import { TermsSearchProvider } from '../../contexts/TermsSearchContext';
import type { RootStackParamList, RootTabParamList } from '../../navigation/types';
import { NativeHeader } from '../components/NativeHeader';
import { SearchDrawerContent } from '../components/SearchDrawerContent';
import { QuizScreen } from '../screens/QuizScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TermsScreen } from '../screens/TermsScreen';

export type { RootStackParamList, RootTabParamList };

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

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
      Quiz: 'quiz',
    },
  },
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SearchDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        header: (props: DrawerHeaderProps) => <NativeHeader {...props} />,
        drawerPosition: 'left',
        drawerType: 'front',
        swipeEnabled: false,
        drawerStyle: {
          width: '85%',
        },
        overlayColor: 'rgba(0, 0, 0, 0.5)',
      }}
      initialRouteName="Terms"
    >
      <Drawer.Screen name="Terms" component={TermsScreen} />
    </Drawer.Navigator>
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
        autocapture={false}
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
            <Stack.Screen name="Main" component={DrawerNavigator} />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
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
