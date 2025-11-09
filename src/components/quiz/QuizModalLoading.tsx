import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';
import { BackgroundPattern } from '../BackgroundPattern';
import { QuizExitButton } from './QuizExitButton';

interface QuizModalLoadingProps {
  visible: boolean;
  onExit: () => void;
}

export const QuizModalLoading: React.FC<QuizModalLoadingProps> = ({ visible, onExit }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <BackgroundPattern>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <View style={styles.header}>
            <QuizExitButton onPress={onExit} />
          </View>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Preparing quiz...</Text>
          </View>
        </View>
      </BackgroundPattern>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
  },
});
