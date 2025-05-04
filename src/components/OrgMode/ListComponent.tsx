import { Box } from "@mui/material";
import { LineComponent, LineContentProps } from "./LineContentComponents";

interface ListComponentProps {
    params: {
        items: LineContentProps[];
    };
}

export default function ListComponent({ params }: ListComponentProps) {
    return (
        <Box className="px-56 pt-4 text-teal-800">
            {params.items.map((content: LineContentProps) => {
                const components: any[] = [];
                components.push(LineComponent(content));
                return components;
            })}
        </Box>
    );
}
