import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PostHogProvider, usePostHog } from 'posthog-react-native';
import React from 'react';
import { AppState } from 'react-native';
import { DrawerContent } from '../components/DrawerContent';
import { DrawerProvider } from '../contexts/DrawerContext';
import { CardScreen } from '../screens/CardScreen';
import { DisciplineSelectionScreen } from '../screens/DisciplineSelectionScreen';
import { FlashcardDetailScreen } from '../screens/FlashcardDetailScreen';
import { colors } from '../theme/tokens';

export type RootStackParamList = {
  Main: undefined;
  DisciplineSelection: undefined;
  FlashcardDetail: { cardId: string };
};

export type RootDrawerParamList = {
  Card: { cardId?: string } | undefined;
  DisciplineSelection: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['hemaflashcards://', 'https://hemaflashcards.app', 'http://localhost:8081'],
  config: {
    screens: {
      Main: {
        screens: {
          Card: {
            path: 'card/:cardId?',
            parse: {
              cardId: (cardId: string) => cardId,
            },
          },
        },
      },
      DisciplineSelection: 'disciplines',
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
    <DrawerProvider>
      <NavigationContainer linking={linking as LinkingOptions<RootStackParamList>}>
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
            <Stack.Screen name="Main" component={DrawerNavigator} />
            <Stack.Screen
              name="DisciplineSelection"
              component={DisciplineSelectionScreen}
              options={{
                presentation: 'modal',
              }}
            />
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
      </NavigationContainer>
    </DrawerProvider>
  );
};
