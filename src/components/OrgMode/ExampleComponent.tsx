import { Box } from "@mui/material";
import { LineComponent, LineContentProps } from "./LineContentComponents";

interface ExampleComponentProps {
    params: {
        contents: LineContentProps[];
    };
}

export default function ExampleComponent({
    params,
}: ExampleComponentProps): React.ReactNode {
    return (
        <Box className="px-56 pt-4">
            {params.contents.map((content: LineContentProps) => {
                return LineComponent(content);
            })}
        </Box>
    );
}
