"use client";

import { useThemeStore } from "@/app/stores/ThemeStore";
import { LineContentProps, LineComponent } from "./LineContentComponents";

interface ParagraphComponentProps {
  params: {
    contents: LineContentProps[];
  };
}

export default function ParagraphComponent({
  params,
}: ParagraphComponentProps) {
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
