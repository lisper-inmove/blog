import { Box } from "@mui/material";

interface BodyComponentProps {
  params: {
    components: any[];
  };
}

export default function BodyComponent({ params }: BodyComponentProps) {
  return <div className="w-[100vw]">{params.components}</div>;
}
