import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function BodyComponent(child: ReactNode) {
  return <Box className="w-[100vw] m-auto">{child}</Box>;
}
