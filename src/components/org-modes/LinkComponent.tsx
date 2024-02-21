import { LineContentProps, LineComponent } from "./LineContentComponents";
import { lightModeColor } from "@/app/stores/ThemeColors";

export default function LinkComponent(params: LineContentProps) {
  return (
    <div
      className="px-56 pt-4"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
      }}
    >
      {LineComponent(params)}
    </div>
  );
}
