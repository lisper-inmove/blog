import { lightModeColor } from "@/app/stores/ThemeColors";
import { Box, Typography } from "@mui/material";

interface TitleComponentProps {
  params: {
    title: string;
    subtitle: string;
    date: string;
    keywords: string;
  };
}

export default function TitleComponent({ params }: TitleComponentProps) {
  return (
    <Box
      className="pt-8 flex flex-col px-52 pb-8"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
      }}
    >
      <Box className="flex justify-center">
        <h1 className="text-4xl">{params.title}</h1>
      </Box>
      <Box className="flex flex-col">
        <Box className="flex flex-col justify-start items-start">
          <Typography>Created At: {params.date}</Typography>
          <Typography>Keywords: {params.keywords}</Typography>
        </Box>
        <Box className="max-w-2xl">
          <Typography className="text-red-600 indent-8">
            {params.subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
