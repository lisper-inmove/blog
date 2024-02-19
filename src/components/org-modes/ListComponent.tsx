"use client";

import { useThemeStore } from "@/app/stores/ThemeStore";
import {
  BoldText,
  EmptyLine,
  InnercodeText,
  ItalicText,
  LineContentProps,
  StrikeThroughText,
  UnderlineText,
  VerbatimText,
  CommonText,
  LineComponent,
} from "./LineContentComponents";

export interface ListItemComponentProps {
  contents: LineContentProps[];
}

interface ListComponentProps {
  params: {
    items: ListItemComponentProps[];
  };
}

export default function ListComponent({ params }: ListComponentProps) {
  const { isDarkMode, themeColor, toggleTheme } = useThemeStore();

  return (
    <div
      className="px-56 pt-4"
      style={{
        backgroundColor: themeColor.commonBgColor,
        color: themeColor.commonTextColor,
      }}
    >
      {params.items.map((contents: ListItemComponentProps) => {
        let components: any[] = [];
        for (let content of contents.contents) {
          components.push(LineComponent(content));
        }
        return components;
      })}
    </div>
  );
}
