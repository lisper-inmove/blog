"use client";

import { ThemeColor, darkModeColor, lightModeColor } from "./ThemeColors";
import { create } from "zustand";

type ThemeState = {
  isDarkMode: boolean;
  themeColor: ThemeColor;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  themeColor: lightModeColor,
  isDarkMode: false,
  toggleTheme: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
      themeColor:
        state.themeColor === darkModeColor ? lightModeColor : darkModeColor,
    })),
}));
