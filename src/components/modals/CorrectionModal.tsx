import { usePostHog } from 'posthog-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
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
} from 'react-native';
import { getOrCreateUserId } from '../../services/userId';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../../theme/tokens';
import type { Term } from '../../types/term';
import { getNetlifyFunctionUrl } from '../../utils/netlifyConfig';
import { IconButton, PrimaryButton } from '../buttons';

interface CorrectionModalProps {
  visible: boolean;
  card: Term | null;
  fieldName: string;
  fieldValue: string;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const EMAIL_ADDRESS = 'cmlarsen+fechtonomicon@gmail.com';

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  visible,
  card,
  fieldName,
  fieldValue,
  onClose,
}) => {
  const posthog = usePostHog();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [editedText, setEditedText] = useState(fieldValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const fallbackToEmail = async () => {
    if (!card) return;

    const subject = encodeURIComponent(`Suggested Edit: ${card.originalTerm} - ${fieldName}`);
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
      onClose();
    }
  };

  const handleSubmitEdit = async () => {
    if (!card || isSubmitting) return;

    setIsSubmitting(true);

    const userId = await getOrCreateUserId();

    posthog?.capture('submit_edit_tapped', {
      userId,
      cardId: card.id,
      cardTerm: card.originalTerm,
      fieldName,
      hasChanges: editedText !== fieldValue,
    });

    try {
      const response = await fetch(getNetlifyFunctionUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          cardId: card.id,
          fieldName,
          originalValue: fieldValue,
          correctedValue: editedText,
          term: card.originalTerm,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        posthog?.capture('edit_submitted_success', {
          userId,
          cardId: card.id,
          fieldName,
          prNumber: data.prNumber,
        });

        Alert.alert(
          'Edit Submitted!',
          `Your edit suggestion has been submitted. Edit # #${data.prNumber} has been created.`,
          [
            {
              text: 'Close',
              style: 'cancel',
              onPress: onClose,
            },
            {
              text: 'View PR',
              onPress: () => {
                if (data.prUrl) {
                  Linking.openURL(data.prUrl);
                }
                onClose();
              },
            },
          ]
        );
      } else {
        throw new Error(data.error || 'Failed to submit edit');
      }
    } catch (error) {
      posthog?.capture('edit_submit_failed', {
        userId,
        cardId: card.id,
        fieldName,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      Alert.alert(
        'Submission Failed',
        'Unable to submit edit automatically. Would you like to send it via email instead?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              setIsSubmitting(false);
            },
          },
          {
            text: 'Send Email',
            onPress: async () => {
              setIsSubmitting(false);
              await fallbackToEmail();
            },
          },
        ]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!card) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <Animated.View
            style={[
              styles.sheet,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
              {/* Close button in upper right */}
              <View style={styles.closeButtonContainer}>
                <IconButton icon="✕" onPress={onClose} size="small" variant="gold" />
              </View>

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
                <PrimaryButton
                  title={isSubmitting ? 'Submitting...' : 'Submit Edit'}
                  onPress={handleSubmitEdit}
                  size="medium"
                  disabled={isSubmitting}
                />
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
    backgroundColor: 'rgba(42, 24, 16, 0.6)',
    justifyContent: 'flex-end',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
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
    position: 'relative',
    marginBottom: spacing.md,
    marginHorizontal: spacing.sm,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
  },
  title: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xl,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
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
});
