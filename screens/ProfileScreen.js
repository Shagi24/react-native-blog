import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTheme, useThemeColors } from "../utils/colors";
import { clearToken } from "../utils/tokenHelper";

const PANEL_HEIGHT = 260;

export default function ProfileScreen({ navigation }) {
  const { toggleTheme, scheme } = useTheme();
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const [profileImage, setProfileImage] = useState(null);
  const [displayName, setDisplayName] = useState("Your Name");
  const [bio, setBio] = useState("Write a short bio about yourself.");
  const [statusMessage, setStatusMessage] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(PANEL_HEIGHT)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: settingsOpen ? 0 : PANEL_HEIGHT,
      useNativeDriver: true,
      speed: 18,
      bounciness: 8,
    }).start();
  }, [settingsOpen, slideAnim]);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow photo access to upload your profile picture."
      );
    }
  };

  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && !result.cancelled) {
      const uri = result.assets?.[0]?.uri || result.uri;
      setProfileImage(uri);
    }
  };

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await clearToken();
      navigation.replace("SignIn");
    } catch (error) {
      Alert.alert("Sign Out Error", "Unable to sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

  const handleSaveProfile = () => {
    setStatusMessage("Profile details updated.");
    setTimeout(() => setStatusMessage(""), 2500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.body}>Upload your photo and manage app settings.</Text>

      <TouchableOpacity style={styles.avatarWrapper} onPress={pickProfileImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitial}>U</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.profileName}>Your Name</Text>
      <Text style={styles.profileSubtext}>Tap your avatar to upload a new photo.</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={pickProfileImage}>
        <Text style={styles.uploadButtonText}>Change Profile Photo</Text>
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Enter your name"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={setBio}
          placeholder="Share a little about yourself"
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      {statusMessage ? <Text style={styles.statusMessage}>{statusMessage}</Text> : null}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setSettingsOpen((value) => !value)}
      >
        <Text style={styles.settingsButtonText}>
          {settingsOpen ? "Hide Settings" : "Open Settings"}
        </Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.settingsPanel,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.panelHandle} />
        <Text style={styles.panelTitle}>Settings</Text>
        <Text style={styles.panelSubtitle}>
          Manage your theme and account actions from here.
        </Text>
        <TouchableOpacity
          style={styles.panelActionButton}
          onPress={toggleTheme}
        >
          <Text style={styles.panelActionText}>
            Switch to {scheme === "dark" ? "Light" : "Dark"} Mode
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.panelActionButton,
            styles.panelDangerButton,
            signingOut && styles.signOutButtonDisabled,
          ]}
          onPress={handleSignOut}
          disabled={signingOut}
        >
          {signingOut ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.panelActionText}>Sign Out</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 24,
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 8,
    },
    body: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: 24,
    },
    avatarWrapper: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: colors.primary,
      overflow: "hidden",
      marginBottom: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.surfaceMuted,
    },
    avatarImage: {
      width: "100%",
      height: "100%",
    },
    avatarPlaceholder: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: colors.surface,
    },
    avatarInitial: {
      color: colors.primary,
      fontSize: 36,
      fontWeight: "800",
    },
    profileName: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 4,
    },
    profileSubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 24,
      textAlign: "center",
    },
    uploadButton: {
      width: "100%",
      paddingVertical: 14,
      borderRadius: 16,
      backgroundColor: colors.primary,
      alignItems: "center",
      marginBottom: 20,
    },
    uploadButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "700",
    },
    inputGroup: {
      width: "100%",
      marginBottom: 16,
    },
    inputLabel: {
      color: colors.textPrimary,
      fontSize: 14,
      fontWeight: "700",
      marginBottom: 8,
    },
    input: {
      width: "100%",
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 12,
      color: colors.textPrimary,
      fontSize: 15,
    },
    bioInput: {
      minHeight: 90,
    },
    statusMessage: {
      width: "100%",
      color: colors.primary,
      marginBottom: 12,
      textAlign: "center",
      fontWeight: "700",
    },
    saveButton: {
      width: "100%",
      paddingVertical: 14,
      borderRadius: 16,
      backgroundColor: colors.secondary,
      alignItems: "center",
      marginBottom: 20,
    },
    saveButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "700",
    },
    settingsButton: {
      width: "100%",
      paddingVertical: 14,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: "center",
      marginBottom: 14,
    },
    settingsButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "700",
    },
    settingsPanel: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: PANEL_HEIGHT,
      backgroundColor: colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.12,
      shadowRadius: 18,
      elevation: 10,
    },
    panelHandle: {
      width: 60,
      height: 5,
      borderRadius: 3,
      backgroundColor: colors.border,
      alignSelf: "center",
      marginBottom: 14,
    },
    panelTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: colors.textPrimary,
      marginBottom: 6,
      textAlign: "center",
    },
    panelSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: 18,
      lineHeight: 20,
    },
    panelActionButton: {
      width: "100%",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: "center",
      marginBottom: 12,
    },
    panelActionText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "700",
    },
    panelDangerButton: {
      backgroundColor: colors.danger,
    },
    signOutButtonDisabled: {
      opacity: 0.6,
    },
  });
