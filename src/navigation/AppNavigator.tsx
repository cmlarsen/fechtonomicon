import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { CardScreen } from '../screens/CardScreen';
import { DisciplineSelectionScreen } from '../screens/DisciplineSelectionScreen';
import { DrawerContent } from '../components/DrawerContent';
import { DrawerProvider } from '../contexts/DrawerContext';
import { colors } from '../theme/tokens';

export type RootDrawerParamList = {
  Card: undefined;
  DisciplineSelection: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createStackNavigator();

const linking = {
  prefixes: ['hemaflashcards://', 'https://hemaflashcards.app'],
  config: {
    screens: {
      Card: 'card',
      DisciplineSelection: 'disciplines',
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

export const AppNavigator: React.FC = () => {
  return (
    <DrawerProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
          }}
        >
          <Stack.Screen name="Main" component={DrawerNavigator} />
          <Stack.Screen name="DisciplineSelection" component={DisciplineSelectionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DrawerProvider>
  );
};
