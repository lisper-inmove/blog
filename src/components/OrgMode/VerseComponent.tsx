import { Block } from "@/entities/PostChild";
import { Box } from "@mui/material";

interface VerseComponentProps {
    block: Block;
}

export default function VerseComponent({ block }: VerseComponentProps) {
    return <Box className="px-56 pt-4">Verse</Box>;
}
