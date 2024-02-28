import { lightModeColor } from "@/app/stores/ThemeColors";
import { LineContentProps, LineComponent } from "./LineContentComponents";

interface ParagraphComponentProps {
  params: {
    contents: LineContentProps[];
    isResults: boolean;
  };
}

export default function ParagraphComponent({
  params,
}: ParagraphComponentProps) {
  return (
    <div
      className="px-56 pt-4 text-xl"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: params.isResults ? lightModeColor.resultsTextColor : lightModeColor.commonTextColor,
      }}
    >
      {params.contents.map((content: LineContentProps) => {
        return LineComponent(content);
      })}
    </div>
  );
}
