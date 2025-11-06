import {
  CormorantGaramond_300Light,
  CormorantGaramond_300Light_Italic,
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_500Medium,
  CormorantGaramond_500Medium_Italic,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_600SemiBold_Italic,
  CormorantGaramond_700Bold,
  CormorantGaramond_700Bold_Italic,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Texturina_600SemiBold,
  Texturina_700Bold,
  Texturina_800ExtraBold,
} from '@expo-google-fonts/texturina';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme/tokens';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const [fontsLoaded, fontError] = useFonts({
    'CormorantGaramond-Light': CormorantGaramond_300Light,
    'CormorantGaramond-LightItalic': CormorantGaramond_300Light_Italic,
    'CormorantGaramond-Regular': CormorantGaramond_400Regular,
    'CormorantGaramond-Italic': CormorantGaramond_400Regular_Italic,
    'CormorantGaramond-Medium': CormorantGaramond_500Medium,
    'CormorantGaramond-MediumItalic': CormorantGaramond_500Medium_Italic,
    'CormorantGaramond-SemiBold': CormorantGaramond_600SemiBold,
    'CormorantGaramond-SemiBoldItalic': CormorantGaramond_600SemiBold_Italic,
    'CormorantGaramond-Bold': CormorantGaramond_700Bold,
    'CormorantGaramond-BoldItalic': CormorantGaramond_700Bold_Italic,
    'Texturina-SemiBold': Texturina_600SemiBold,
    'Texturina-Bold': Texturina_700Bold,
    'Texturina-ExtraBold': Texturina_800ExtraBold,
  });

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const content = (
    <GestureHandlerRootView style={styles.container}>
      <AppNavigator />
    </GestureHandlerRootView>
  );

  // On web, wrap content in a centered container with max-width
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webOuterContainer}>
        <View style={styles.webInnerContainer}>{content}</View>
      </View>
    );
  }

  return content;
}

export default function App() {
  return <AppContent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment.primary,
  },
  webOuterContainer: {
    flex: 1,
    backgroundColor: '#2a1810',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webInnerContainer: {
    width: '100%',
    maxWidth: 480,
    height: '100%',
    maxHeight: 900,
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  } as ViewStyle,
});
