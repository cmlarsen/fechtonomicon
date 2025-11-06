import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fontFamily, fontSize, spacing } from "../theme/tokens";

import React from "react";

interface SectionDividerProps {
  label?: string;
  ornament?: string; // Unicode character like ⚔ 🗡 ❧ ⚜
  onEdit?: () => void;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  ornament = "⚔",
  onEdit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.ornament}>{ornament}</Text>
        <View style={styles.line} />
      </View>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {onEdit && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={onEdit}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
    alignItems: "center",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gold.main,
    opacity: 0.3,
  },
  ornament: {
    marginHorizontal: spacing.md,
    fontSize: fontSize.lg,
    color: colors.gold.main,
    opacity: 0.6,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  label: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.text.light,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  editButton: {
    padding: spacing.xs,
  },
  editIcon: {
    fontSize: fontSize.xs,
    opacity: 0.7,
  },
});
