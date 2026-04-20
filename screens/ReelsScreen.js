import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { useThemeColors } from "../utils/colors";
import { Play } from "lucide-react-native";

const reels = [
  {
    id: "1",
    title: "Sunset Skate",
    description: "A quick reel of street skating at sunset.",
    source: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "2",
    title: "Mountain Flow",
    description: "Relaxing mountain scenery in motion.",
    source: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "3",
    title: "City Lights",
    description: "Fast-paced city reel with neon highlights.",
    source: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=800&q=60",
  },
];

export default function ReelsScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const [selectedReel, setSelectedReel] = useState(reels[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsPlaying(true);
  }, [selectedReel]);

  const renderReel = ({ item }) => {
    const isActive = item.id === selectedReel.id;
    return (
      <TouchableOpacity
        style={[styles.reelCard, isActive && styles.activeReelCard]}
        onPress={() => setSelectedReel(item)}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.reelInfo}>
          <Text style={styles.reelTitle}>{item.title}</Text>
          <Text style={styles.reelDescription} numberOfLines={1}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reels</Text>
      <Text style={styles.subheading}>
        Tap any reel to start watching videos from the internet.
      </Text>

      <View style={styles.playerContainer}>
        <Video
          ref={videoRef}
          source={{ uri: selectedReel.source }}
          style={styles.video}
          useNativeControls
          resizeMode="cover"
          isLooping
          shouldPlay={isPlaying}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setIsPlaying(false);
            }
          }}
        />
        <View style={styles.playerLabel}>
          <Play size={18} color={colors.white} />
          <Text style={styles.playerLabelText}>{selectedReel.title}</Text>
        </View>
      </View>

      <FlatList
        data={reels}
        keyExtractor={(item) => item.id}
        renderItem={renderReel}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    heading: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.primary,
      marginBottom: 6,
    },
    subheading: {
      fontSize: 15,
      color: colors.textSecondary,
      marginBottom: 18,
      lineHeight: 22,
    },
    playerContainer: {
      width: "100%",
      height: Dimensions.get("window").width * 0.75,
      borderRadius: 24,
      overflow: "hidden",
      backgroundColor: colors.surface,
      marginBottom: 20,
    },
    video: {
      width: "100%",
      height: "100%",
    },
    playerLabel: {
      position: "absolute",
      left: 16,
      bottom: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "rgba(0,0,0,0.45)",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
    },
    playerLabelText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: "700",
    },
    listContent: {
      paddingBottom: 20,
    },
    reelCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 18,
      marginBottom: 14,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeReelCard: {
      borderColor: colors.primary,
      shadowColor: colors.primary,
      shadowOpacity: 0.15,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    thumbnail: {
      width: 110,
      height: 90,
    },
    reelInfo: {
      flex: 1,
      padding: 12,
    },
    reelTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 4,
    },
    reelDescription: {
      fontSize: 13,
      color: colors.textSecondary,
    },
  });
