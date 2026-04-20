import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import PostCard from "../components/PostCard";
import { usePosts } from "../utils/PostsContext";
import { useThemeColors } from "../utils/colors";

const PAGE_SIZE = 3;

export default function HomeScreen() {
  const colors = useThemeColors();
  const { posts } = usePosts();
  const [page, setPage] = useState(1);
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    setVisiblePosts(posts.slice(0, page * PAGE_SIZE));
  }, [posts, page]);

  const loadMorePosts = () => {
    if (visiblePosts.length < posts.length) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Fresh Stories</Text>
        <Text style={styles.heroSubtitle}>
          The latest posts appear here; new submissions show instantly after publishing.
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{posts.length}</Text>
            <Text style={styles.statLabel}>Total posts</Text>
          </View>
          <View style={styles.statBoxAccent}>
            <Text style={styles.statNumberAccent}>{visiblePosts.length}</Text>
            <Text style={styles.statLabelAccent}>Loaded now</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={visiblePosts}
        renderItem={({ item, index }) => (
          <PostCard post={item} delay={index * 75} onPress={() => null} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.4}
        ListFooterComponent={() => (
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>
              {visiblePosts.length < posts.length
                ? "Scroll to load more posts"
                : "You’re all caught up!"}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No posts yet</Text>
            <Text style={styles.emptySubtitle}>
              Add your first post using the Add Post tab.
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    heroCard: {
      backgroundColor: colors.primary,
      padding: 20,
      margin: 16,
      borderRadius: 18,
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 7,
    },
    heroTitle: {
      fontSize: 26,
      fontWeight: "800",
      color: colors.white,
      marginBottom: 8,
    },
    heroSubtitle: {
      fontSize: 15,
      color: colors.primaryLight,
      lineHeight: 22,
      marginBottom: 20,
    },
    statsRow: {
      flexDirection: "row",
      gap: 12,
    },
    statBox: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
    },
    statBoxAccent: {
      flex: 1,
      backgroundColor: colors.surfaceMuted,
      borderRadius: 14,
      padding: 14,
    },
    statNumber: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.primary,
    },
    statLabel: {
      marginTop: 4,
      color: colors.textMuted,
      fontSize: 12,
    },
    statNumberAccent: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.primaryDark,
    },
    statLabelAccent: {
      marginTop: 4,
      color: colors.textSecondary,
      fontSize: 12,
    },
    listContent: {
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
    footerTextContainer: {
      paddingVertical: 16,
      alignItems: "center",
    },
    footerText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    emptyContainer: {
      alignItems: "center",
      padding: 36,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 20,
    },
  });
