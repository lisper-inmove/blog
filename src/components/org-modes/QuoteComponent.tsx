"use client";

import { useThemeStore } from "@/app/stores/ThemeStore";
import { LineContentProps, LineComponent } from "./LineContentComponents";

interface QuoteComponentProps {
  params: {
    contents: LineContentProps[];
  };
}

export default function QuoteComponent({ params }: QuoteComponentProps) {
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
