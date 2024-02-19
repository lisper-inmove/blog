import { lightModeColor } from "@/app/stores/ThemeColors";
import { lfont } from "@/utils/constants";
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
      <Box
        className={`flex flex-col justify-start items-start ${lfont.className}`}
      >
        <h3>Last Update At: {params.date}</h3>
        <h3 className="font-bold">Keywords: {params.keywords}</h3>
      </Box>
    </Box>
  );
}
