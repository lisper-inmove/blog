import { lightModeColor } from "@/app/stores/ThemeColors";
import { LineContentProps, LineComponent } from "./LineContentComponents";
import { Box } from "@mui/material";

interface IframeComponentProps {
  params: {
    content: LineContentProps;
    attributes: any;
  };
}

export default function IframeComponent({ params }: IframeComponentProps) {
  return (
    <Box
      className="px-56 pt-4"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
      }}
    >
      {LineComponent(params.content)}
    </Box>
  );
}
