import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useThemeColors } from "../utils/colors";
import { PlusCircle } from "lucide-react-native";
import EntryCard from "../components/EntryCard";
import { usePosts } from "../utils/PostsContext";

export default function AddPostScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const { addPost } = usePosts();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow photo/video access to upload media."
      );
    }
  };

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && !result.cancelled) {
      const asset = result.assets?.[0] || result;
      setMediaUri(asset.uri);
      setMediaType(asset.type || asset.mediaType || "image");
    }
  };

  const handlePublish = () => {
    if (!title.trim() && !body.trim() && !mediaUri) {
      Alert.alert(
        "Missing information",
        "Please add text or select a photo/video to create your post."
      );
      return;
    }

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    addPost({
      id: `${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      author: "You",
      date: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      tags: tagList,
      mediaUri,
      mediaType,
    });

    setTitle("");
    setBody("");
    setTags("");
    setMediaUri(null);
    setMediaType(null);
    setStatusMessage("Your post is live and will appear on Home!");

    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Create a New Post</Text>
        <Text style={styles.subheading}>
          Post photos, videos, and captions with an Instagram-style flow.
        </Text>
      </View>

      <View style={styles.mediaSection}>
        <Text style={styles.sectionLabel}>Media</Text>
        <Pressable style={styles.mediaButton} onPress={pickMedia}>
          <PlusCircle size={20} color={colors.white} />
          <Text style={styles.mediaButtonText}>
            Add Photo or Video
          </Text>
        </Pressable>

        {mediaUri ? (
          <View style={styles.mediaPreviewCard}>
            {mediaType === "image" ? (
              <Image source={{ uri: mediaUri }} style={styles.mediaPreviewImage} />
            ) : (
              <View style={styles.mediaPreviewVideo}>
                <Text style={styles.mediaPreviewVideoText}>
                  Video selected
                </Text>
              </View>
            )}
            <Pressable
              style={styles.removeMediaButton}
              onPress={() => {
                setMediaUri(null);
                setMediaType(null);
              }}
            >
              <Text style={styles.removeMediaText}>Remove media</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <View style={styles.cardSection}>
        <EntryCard
          icon={<PlusCircle size={24} color={colors.primary} />}
          title="Post Title"
          description="Give your post a catchy title."
          delay={0}
        />
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter post title..."
            placeholderTextColor={colors.textMuted}
          />
        </View>
      </View>

      <View style={styles.cardSection}>
        <EntryCard
          icon={<PlusCircle size={24} color={colors.primary} />}
          title="Post Content"
          description="Write the full content of your post."
          delay={100}
        />
        <View style={styles.formGroup}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={body}
            onChangeText={setBody}
            placeholder="Write your post content here..."
            placeholderTextColor={colors.textMuted}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>
      </View>

      <View style={styles.cardSection}>
        <EntryCard
          icon={<PlusCircle size={24} color={colors.primary} />}
          title="Tags"
          description="Separate tags with commas for better discovery."
          delay={200}
        />
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            value={tags}
            onChangeText={setTags}
            placeholder="e.g. travel, food, reels"
            placeholderTextColor={colors.textMuted}
          />
        </View>
      </View>

      {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}

      <Pressable
        style={({ pressed }) => [
          styles.submitButton,
          pressed && styles.submitButtonPressed,
        ]}
        onPress={handlePublish}
      >
        <Text style={styles.submitButtonText}>Publish Post</Text>
      </Pressable>
    </ScrollView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primaryLight,
    },
    contentContainer: {
      padding: 20,
      paddingBottom: 32,
    },
    header: {
      backgroundColor: colors.primary,
      borderRadius: 22,
      padding: 22,
      marginBottom: 22,
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 18,
      elevation: 8,
    },
    heading: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.white,
      marginBottom: 8,
    },
    subheading: {
      fontSize: 15,
      color: colors.primaryLight,
      lineHeight: 22,
    },
    mediaSection: {
      marginBottom: 20,
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 16,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 14,
      elevation: 4,
    },
    sectionLabel: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 12,
    },
    mediaButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: colors.primary,
      marginBottom: 14,
    },
    mediaButtonText: {
      color: colors.white,
      fontSize: 15,
      fontWeight: "700",
    },
    mediaPreviewCard: {
      borderRadius: 18,
      overflow: "hidden",
      backgroundColor: colors.surfaceMuted,
      marginTop: 10,
    },
    mediaPreviewImage: {
      width: "100%",
      minHeight: 200,
      backgroundColor: colors.surfaceMuted,
    },
    mediaPreviewVideo: {
      width: "100%",
      minHeight: 200,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surfaceMuted,
    },
    mediaPreviewVideoText: {
      color: colors.textSecondary,
      fontSize: 16,
      fontWeight: "600",
    },
    removeMediaButton: {
      paddingVertical: 12,
      alignItems: "center",
      backgroundColor: colors.surface,
    },
    removeMediaText: {
      color: colors.danger,
      fontWeight: "700",
    },
    cardSection: {
      marginBottom: 20,
      borderRadius: 20,
      backgroundColor: colors.surface,
      padding: 16,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 14,
      elevation: 4,
    },
    formGroup: {
      marginTop: 12,
    },
    input: {
      backgroundColor: colors.surfaceMuted,
      borderRadius: 16,
      padding: 16,
      fontSize: 16,
      color: colors.textPrimary,
      borderWidth: 1,
      borderColor: colors.primaryLight,
    },
    textArea: {
      minHeight: 140,
      paddingTop: 16,
    },
    tagPreviewContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 12,
    },
    tagItem: {
      backgroundColor: colors.primaryLight,
      borderRadius: 16,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    tagText: {
      color: colors.primaryDark,
      fontSize: 13,
      fontWeight: "600",
    },
    statusText: {
      marginBottom: 18,
      color: colors.primaryDark,
      fontSize: 14,
      textAlign: "center",
    },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: 18,
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.18,
      shadowRadius: 20,
      elevation: 7,
    },
    submitButtonPressed: {
      opacity: 0.85,
    },
    submitButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "800",
    },
  });
