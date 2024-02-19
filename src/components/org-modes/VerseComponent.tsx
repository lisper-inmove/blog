import { lightModeColor } from "@/app/stores/ThemeColors";
import { LineContentProps, LineComponent } from "./LineContentComponents";

interface VerseComponentProps {
  params: {
    contents: LineContentProps[];
  };
}

export default function VerseComponent({ params }: VerseComponentProps) {
  return (
    <div
      className="px-56 pt-4"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
      }}
    >
      {params.contents.map((content: LineContentProps) => {
        return LineComponent(content);
      })}
    </div>
  );
}
