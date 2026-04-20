import { View, Text, StyleSheet, Animated, Pressable, Image } from "react-native";
import { useEffect, useRef } from "react";
import { Heart, MessageCircle, Share2, PlayCircle } from "lucide-react-native";
import { useThemeColors } from "../utils/colors";

export default function PostCard({ post, delay = 0, onPress }) {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 650,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, delay]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Pressable onPress={onPress} style={styles.card}>
        <View style={styles.header}>
          <View style={styles.authorInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {post.author?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.date}>{post.date}</Text>
            </View>
          </View>
        </View>

        {post.mediaUri ? (
          <View style={styles.mediaContainer}>
            {post.mediaType === "image" ? (
              <Image source={{ uri: post.mediaUri }} style={styles.mediaImage} />
            ) : (
              <View style={styles.videoPlaceholder}>
                <PlayCircle size={42} color={colors.white} />
                <Text style={styles.videoText}>Video Post</Text>
              </View>
            )}
          </View>
        ) : null}

        <View style={styles.content}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body} numberOfLines={3}>
            {post.body}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.stat}>
            <Heart size={16} color={colors.primary} />
            <Text style={styles.statText}>{post.likes}</Text>
          </View>
          <View style={styles.stat}>
            <MessageCircle size={16} color={colors.primary} />
            <Text style={styles.statText}>{post.comments}</Text>
          </View>
          <View style={styles.stat}>
            <Share2 size={16} color={colors.primary} />
            <Text style={styles.statText}>{post.shares}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginBottom: 16,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      padding: 18,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 5,
    },
    header: {
      marginBottom: 14,
    },
    authorInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    avatarText: {
      color: colors.white,
      fontWeight: "700",
      fontSize: 16,
    },
    authorName: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.textPrimary,
    },
    date: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: 2,
    },
    content: {
      marginBottom: 14,
    },
    title: {
      fontSize: 18,
      fontWeight: "800",
      color: colors.textPrimary,
      marginBottom: 8,
    },
    body: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    mediaContainer: {
      borderRadius: 18,
      overflow: "hidden",
      marginBottom: 14,
      backgroundColor: colors.surfaceMuted,
    },
    mediaImage: {
      width: "100%",
      height: 220,
      backgroundColor: colors.surfaceMuted,
    },
    videoPlaceholder: {
      width: "100%",
      height: 220,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
    },
    videoText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "700",
      color: colors.white,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
    },
    stat: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    statText: {
      fontSize: 12,
      color: colors.textMuted,
      fontWeight: "600",
    },
  });
