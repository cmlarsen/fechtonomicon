import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../theme/tokens';

interface CitationSheetProps {
  visible: boolean;
  citations: Array<{
    type: string;
    ref?: string;
    locator?: string;
    note?: string;
  }>;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const CitationSheet: React.FC<CitationSheetProps> = ({ visible, citations, onClose }) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      // Parchment-fold animation: slide up
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            {/* Decorative handle */}
            <View style={styles.handle} />
            <Text style={styles.flourish}>❦</Text>

            {/* Title */}
            <Text style={styles.title}>Citations</Text>

            {/* Citation List */}
            <View style={styles.content}>
              {citations.map((citation, index) => (
                <View key={index} style={styles.citationItem}>
                  <Text style={styles.citationType}>{citation.type}</Text>
                  {citation.locator && (
                    <Text style={styles.citationLocator}>{citation.locator}</Text>
                  )}
                  {citation.note && <Text style={styles.citationNote}>{citation.note}</Text>}
                </View>
              ))}
            </View>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(42, 24, 16, 0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.parchment.primary,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingBottom: spacing.xxl,
    maxHeight: SCREEN_HEIGHT * 0.7,
    ...shadows.parchment,
    borderTopWidth: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.gold.main,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gold.main,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: spacing.md,
    opacity: 0.3,
  },
  flourish: {
    fontSize: fontSize.xl,
    color: colors.gold.main,
    textAlign: 'center',
    marginVertical: spacing.sm,
    opacity: 0.6,
  },
  title: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    textAlign: 'center',
    marginBottom: spacing.lg,
    // Embossed text
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    maxHeight: SCREEN_HEIGHT * 0.4,
  },
  citationItem: {
    backgroundColor: colors.parchment.dark,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.gold.main,
    ...shadows.inset,
  },
  citationType: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bodyBold,
    color: colors.iron.dark,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  citationLocator: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyMedium,
    color: colors.iron.main,
    marginBottom: spacing.xs,
  },
  citationNote: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    opacity: 0.85,
  },
  closeButton: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
    backgroundColor: colors.gold.light,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gold.dark,
    alignItems: 'center',
    // Embossed button
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
