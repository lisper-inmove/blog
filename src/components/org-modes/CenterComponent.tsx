import { LineContentProps, LineComponent } from "./LineContentComponents";
import { lightModeColor } from "@/app/stores/ThemeColors";

interface CenterComponentProps {
  params: {
    contents: LineContentProps[];
  };
}

export default function CenterComponent({ params }: CenterComponentProps) {
  return (
    <div
      className="px-56 pt-4 text-center"
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
