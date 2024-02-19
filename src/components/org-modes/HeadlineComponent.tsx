"use client";
import { PostHeadline } from "@/app/models/post";
import { lightModeColor } from "@/app/stores/ThemeColors";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface HeadlineComponentProps {
  params: {
    headline: PostHeadline;
  };
}
export default function HeadlineComponent({ params }: HeadlineComponentProps) {
  let levelToFontSize = [32, 28, 24, 22, 20, 18, 16, 14, 12, 10];
  return (
    <Box
      className="mx-auto px-52 flex justify-start items-center"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.headlineTextColor,
      }}
    >
      <Box className="pr-10">
        <Typography
          style={{
            fontSize: levelToFontSize[params.headline.level - 1],
          }}
        >
          <Link
            href={`#${params.headline.prefix}`}
            id={params.headline.prefix}
            onClick={(e: any) => {
              e.preventDefault();
            }}
          >
            {params.headline.prefix} {params.headline.name}
          </Link>
        </Typography>
      </Box>
      <Box className="text-xl" style={{ color: lightModeColor.tagTextColor }}>
        {params.headline.tags.join("::")}
      </Box>
    </Box>
  );
}
