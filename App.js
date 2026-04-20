import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { House, PlusCircle, User, Tv } from "lucide-react-native";

import SignInScreen from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddPostScreen from "./screens/AddPostScreen";
import ReelsScreen from "./screens/ReelsScreen";
import EditPostScreen from "./screens/EditPostScreen";
import AddCommentScreen from "./screens/AddCommentScreen";
import EditCommentScreen from "./screens/EditCommentScreen";
import {
  navigationThemeDark,
  navigationThemeLight,
  ThemeProvider,
  useTheme,
  useThemeColors,
} from "./utils/colors";
import { PostsProvider } from "./utils/PostsContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const colors = useThemeColors();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarActiveBackgroundColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => <House size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <PlusCircle size={size} color={color} />
          ),
          title: "Add Post",
        }}
      />
      <Tab.Screen
        name="Reels"
        component={ReelsScreen}
        options={{
          tabBarIcon: ({ size, color }) => <Tv size={size} color={color} />,
          title: "Reels",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { scheme } = useTheme();
  const theme = scheme === "dark" ? navigationThemeDark : navigationThemeLight;
  const statusBarStyle = scheme === "dark" ? "light" : "dark";

  return (
    <NavigationContainer theme={theme}>
      <StatusBar style={statusBarStyle} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: "#ffffff",
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{ title: "Add Post" }}
        />
        <Stack.Screen
          name="EditPost"
          component={EditPostScreen}
          options={{ title: "Edit Post" }}
        />
        <Stack.Screen
          name="AddComment"
          component={AddCommentScreen}
          options={{ title: "Add Comment" }}
        />
        <Stack.Screen
          name="EditComment"
          component={EditCommentScreen}
          options={{ title: "Edit Comment" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PostsProvider>
        <AppContent />
      </PostsProvider>
    </ThemeProvider>
  );
}
