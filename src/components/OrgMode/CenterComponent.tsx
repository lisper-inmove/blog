import { LineValue } from "@/entities/PostChild";
import { Box } from "@mui/material";
import { LineComponent } from "./LineContentComponents";

interface CenterComponentProps {
    params: {
        contents: LineValue[];
    };
}

export default function CenterComponent({ params }: CenterComponentProps) {
    return (
        <Box className="px-56 pt-4 text-center">
            {params.contents.map((content: LineValue) => {
                return LineComponent(content);
            })}
        </Box>
    );
}
