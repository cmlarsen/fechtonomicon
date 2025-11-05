import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';

interface BackgroundPatternProps {
  children: React.ReactNode;
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/floralbg.png')}
        style={styles.pattern}
        resizeMode="repeat"
        imageStyle={styles.patternImage}
      >
        <LinearGradient
          colors={['rgba(42, 24, 16, 0)', 'rgba(42, 24, 16, 0)', 'rgba(42, 24, 16, 0.15)']}
          locations={[0, 0.6, 1]}
          style={styles.vignette}
        >
          {children}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: colors.parchment.primary,
  },
  pattern: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  patternImage: {
    opacity: 0.3,
  },
  vignette: {
    flex: 1,
  },
});
