import { Box } from "@mui/material";
import { LineContentProps, LineComponent } from "./LineContentComponents";
import { lightModeColor } from "@/app/stores/ThemeColors";

interface ListComponentProps {
  params: {
    items: LineContentProps[];
  };
}

export default function ListComponent({ params }: ListComponentProps) {
  return (
    <Box
      className="px-56 pt-4 text-teal-800"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
      }}
    >
      {params.items.map((content: LineContentProps) => {
        let components: any[] = [];
        components.push(LineComponent(content));
        return components;
      })}
    </Box>
  );
}
