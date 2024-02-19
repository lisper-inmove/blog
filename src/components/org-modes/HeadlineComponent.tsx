"use client";

import { PostHeadline } from "@/app/models/post";
import { useThemeStore } from "@/app/stores/ThemeStore";

interface HeadlineComponentProps {
  params: {
    headline: PostHeadline;
  };
}
export default function HeadlineComponent({ params }: HeadlineComponentProps) {
  const { isDarkMode, themeColor, toggleTheme } = useThemeStore();
  let levelToFontSize = [32, 28, 24, 22, 20, 18, 16, 14, 12, 10];
  return (
    <div
      className="mx-auto px-52 flex justify-start items-center"
      style={{
        backgroundColor: themeColor.commonBgColor,
        color: themeColor.headlineTextColor,
        fontSize: levelToFontSize[params.headline.level - 1],
      }}
    >
      <div className="pr-10">
        {params.headline.prefix} {params.headline.name}
      </div>
      <div className="text-xl" style={{ color: themeColor.tagTextColor }}>
        {params.headline.tags.join("::")}
      </div>
    </div>
  );
}
