import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  shadows,
  spacing,
} from "../theme/tokens";

import type { Flashcard } from "../types/flashcard";

interface CorrectionModalProps {
  visible: boolean;
  card: Flashcard | null;
  fieldName: string;
  fieldValue: string;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;
const EMAIL_ADDRESS = "cmlarsen+fechtonomicon@gmail.com";

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  visible,
  card,
  fieldName,
  fieldValue,
  onClose,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [editedText, setEditedText] = useState(fieldValue);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setEditedText(fieldValue);

      // Start animation and keyboard simultaneously
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();

      // Focus immediately with minimal delay to ensure TextInput is rendered
      // This allows keyboard to open simultaneously with modal animation
      const timer = setTimeout(() => {
        textInputRef.current?.focus();
      }, 50);

      return () => {
        clearTimeout(timer);
        textInputRef.current?.blur();
      };
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim, fieldValue]);

  const handleSendEmail = async () => {
    if (!card) return;

    const subject = encodeURIComponent(
      `Suggested Edit: ${card.originalTerm} - ${fieldName}`
    );
    const body = encodeURIComponent(`Card ID: ${card.id}
Term: ${card.originalTerm} / ${card.englishTerm}
Field: ${fieldName}
Original Value: ${fieldValue}
Corrected Value: ${editedText}

Additional notes:
`);

    const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;

    try {
      const canOpen = await Linking.canOpenURL(mailtoUrl);
      if (canOpen) {
        await Linking.openURL(mailtoUrl);
        onClose();
      }
    } catch {
      // Email failed, just close
      onClose();
    }
  };

  if (!card) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Animated.View
            style={[
              styles.sheet,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              {/* Close button in upper right */}
              <TouchableOpacity
                style={styles.closeIconButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.closeIconText}>✕</Text>
              </TouchableOpacity>

              <Text style={styles.title}>Suggest Edit</Text>

              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
              >
                <TextInput
                  ref={textInputRef}
                  style={styles.input}
                  multiline
                  numberOfLines={8}
                  value={editedText}
                  onChangeText={setEditedText}
                  placeholder="Edit the text here..."
                  placeholderTextColor={colors.text.light}
                  textAlignVertical="top"
                />
              </ScrollView>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.emailButton}
                  onPress={handleSendEmail}
                >
                  <Text style={styles.buttonText}>Send Email</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(42, 24, 16, 0.6)",
    justifyContent: "flex-end",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.parchment.primary,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    paddingBottom: spacing.md,
    maxHeight: SCREEN_HEIGHT * 0.85,
    ...shadows.parchment,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: colors.gold.main,
    position: "relative",
    marginBottom: spacing.md,
    marginHorizontal: spacing.sm,
  },
  closeIconButton: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    backgroundColor: colors.parchment.light,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.gold.main,
    zIndex: 10,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 3,
  },
  closeIconText: {
    fontSize: fontSize.lg,
    color: colors.iron.dark,
    fontFamily: fontFamily.bodyBold,
    lineHeight: fontSize.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    textAlign: "center",
    marginTop: spacing.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xl,
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  scrollView: {
    maxHeight: SCREEN_HEIGHT * 0.4,
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.parchment.dark,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.gold.main,
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: colors.iron.dark,
    minHeight: 150,
    ...shadows.inset,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  emailButton: {
    width: "100%",
    backgroundColor: colors.gold.light,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.gold.dark,
    alignItems: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
