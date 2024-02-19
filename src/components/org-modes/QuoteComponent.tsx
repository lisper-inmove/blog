import { lightModeColor } from "@/app/stores/ThemeColors";
import { LineContentProps, LineComponent } from "./LineContentComponents";
import { Box } from "@mui/material";

interface QuoteComponentProps {
  params: {
    contents: LineContentProps[];
  };
}

export default function QuoteComponent({ params }: QuoteComponentProps) {
  return (
    <Box
      className="px-56 pt-4"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
      }}
    >
      {params.contents.map((content: LineContentProps) => {
        return LineComponent(content);
      })}
    </Box>
  );
}
