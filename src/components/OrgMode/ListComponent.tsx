import { SingleElement } from "@/entities/PostChild";
import { Box } from "@mui/material";
import { LineComponent } from "./LineContentComponents";

export default function ListComponent(lines: SingleElement[]) {
    return (
        <Box className="px-56 pt-4 text-teal-800">
            {lines.map((content: SingleElement) => {
                const components: any[] = [];
                components.push(LineComponent(content));
                return components;
            })}
        </Box>
    );
}
