import { lightModeColor } from "@/app/stores/ThemeColors";
import { LineContentProps, LineComponent } from "./LineContentComponents";

interface ExampleComponentProps {
  params: {
    contents: LineContentProps[];
  };
}

export default function ExampleComponent({ params }: ExampleComponentProps) {
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
