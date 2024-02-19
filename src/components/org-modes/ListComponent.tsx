import { Box } from "@mui/material";
import { LineContentProps, LineComponent } from "./LineContentComponents";
import { lightModeColor } from "@/app/stores/ThemeColors";

export interface ListItemComponentProps {
  contents: LineContentProps[];
}

interface ListComponentProps {
  params: {
    items: ListItemComponentProps[];
  };
}

export default function ListComponent({ params }: ListComponentProps) {
  return (
    <Box
      className="px-56 pt-4"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
      }}
    >
      {params.items.map((contents: ListItemComponentProps) => {
        let components: any[] = [];
        for (let content of contents.contents) {
          components.push(LineComponent(content));
        }
        return components;
      })}
    </Box>
  );
}
