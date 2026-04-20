import { View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "../utils/colors";

export default function EntryCard({ icon, title, description, delay = 0 }) {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={[styles.card, { opacity: 1, transform: [{ translateY: 0 }] }]}> 
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceMuted,
      borderRadius: 16,
      padding: 16,
      marginBottom: 14,
    },
    iconWrapper: {
      marginRight: 12,
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: colors.primaryLight,
      justifyContent: "center",
      alignItems: "center",
    },
    textWrapper: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 4,
    },
    description: {
      fontSize: 13,
      color: colors.textSecondary,
      lineHeight: 18,
    },
  });
