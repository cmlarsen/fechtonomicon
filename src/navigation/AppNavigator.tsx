import { CardScreen } from "../screens/CardScreen";
import { DisciplineSelectionScreen } from "../screens/DisciplineSelectionScreen";
import { DrawerContent } from "../components/DrawerContent";
import { DrawerProvider } from "../contexts/DrawerContext";
import { FlashcardDetailScreen } from "../screens/FlashcardDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import type React from "react";
import { colors } from "../theme/tokens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

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
  prefixes: [
    "hemaflashcards://",
    "https://hemaflashcards.app",
    "http://localhost:8081",
  ],
  config: {
    screens: {
      Main: {
        screens: {
          Card: {
            path: "card/:cardId?",
            parse: {
              cardId: (cardId: string) => cardId,
            },
          },
        },
      },
      DisciplineSelection: "disciplines",
      FlashcardDetail: {
        path: "card/:cardId/detail",
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
        drawerPosition: "left",
        drawerType: "front",
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

export const AppNavigator: React.FC = () => {
  return (
    <DrawerProvider>
      <NavigationContainer linking={linking as any}>
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
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="FlashcardDetail"
            component={FlashcardDetailScreen}
            options={{
              presentation: "modal",
              gestureEnabled: true,
              gestureDirection: "vertical",
              animationTypeForReplace: "push",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DrawerProvider>
  );
};
