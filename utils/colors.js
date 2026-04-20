import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

export const LIGHT_COLORS = {
  primary: "#6976cc",
  primaryDark: "#6976cc",
  primaryLight: "#dbeafe",

  secondary: "#2e2e2e",

  background: "#f8fafc",
  surface: "#ffffff",
  surfaceMuted: "#f1f5f9",
  border: "#e2e8f0",

  textPrimary: "#0f172a",
  textSecondary: "#334155",
  textMuted: "#64748b",

  white: "#ffffff",
  danger: "#dc2626",
};

export const DARK_COLORS = {
  primary: "#8b5cf6",
  primaryDark: "#6d28d9",
  primaryLight: "#a78bfa",

  secondary: "#e2e8f0",

  background: "#0f172a",
  surface: "#111827",
  surfaceMuted: "#1f2937",
  border: "#334155",

  textPrimary: "#f8fafc",
  textSecondary: "#d1d5db",
  textMuted: "#94a3b8",

  white: "#ffffff",
  danger: "#fca5a5",
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme() || "light";
  const [scheme, setScheme] = useState(systemScheme);

  useEffect(() => {
    setScheme(systemScheme);
  }, [systemScheme]);

  const toggleTheme = () => {
    setScheme((value) => (value === "dark" ? "light" : "dark"));
  };

  const value = useMemo(() => ({ scheme, toggleTheme }), [scheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export const getThemeColors = (scheme = "light") =>
  scheme === "dark" ? DARK_COLORS : LIGHT_COLORS;

export const useThemeColors = () => {
  const themeContext = useContext(ThemeContext);
  const scheme = themeContext?.scheme || useColorScheme() || "light";
  return getThemeColors(scheme);
};

export const navigationThemeLight = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: LIGHT_COLORS.primary,
    background: LIGHT_COLORS.background,
    card: LIGHT_COLORS.surface,
    text: LIGHT_COLORS.textPrimary,
    border: LIGHT_COLORS.border,
    notification: LIGHT_COLORS.primary,
  },
};

export const navigationThemeDark = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: DARK_COLORS.primary,
    background: DARK_COLORS.background,
    card: DARK_COLORS.surface,
    text: DARK_COLORS.textPrimary,
    border: DARK_COLORS.border,
    notification: DARK_COLORS.primary,
  },
};
