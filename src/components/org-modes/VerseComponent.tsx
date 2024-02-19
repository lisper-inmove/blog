"use client";

import { useThemeStore } from "@/app/stores/ThemeStore";
import { LineContentProps, LineComponent } from "./LineContentComponents";

interface VerseComponentProps {
  params: {
    contents: LineContentProps[];
  };
}

export default function VerseComponent({ params }: VerseComponentProps) {
  const { isDarkMode, themeColor, toggleTheme } = useThemeStore();

  return (
    <div
      className="px-56 pt-4"
      style={{
        backgroundColor: themeColor.commonBgColor,
        color: themeColor.commonTextColor,
      }}
    >
      {params.contents.map((content: LineContentProps) => {
        return LineComponent(content);
      })}
    </div>
  );
}
