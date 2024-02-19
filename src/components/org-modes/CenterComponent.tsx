"use client";

import { useThemeStore } from "@/app/stores/ThemeStore";
import { LineContentProps, LineComponent } from "./LineContentComponents";

interface CenterComponentProps {
  params: {
    contents: LineContentProps[];
  };
}

export default function CenterComponent({ params }: CenterComponentProps) {
  const { isDarkMode, themeColor, toggleTheme } = useThemeStore();

  return (
    <div
      className="px-56 pt-4 text-center"
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
