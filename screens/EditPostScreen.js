import { View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "../utils/colors";

export default function EditPostScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Post</Text>
      <Text style={styles.body}>Edit an existing blog post here.</Text>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 12,
    },
    body: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
    },
  });
