"use client";
import React, { useState } from "react";
import { PostHeadline } from "@/app/models/post";
import { MdExpandMore } from "react-icons/md";
import { generateRandomKey } from "./org-modes/LineContentComponents";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface TableContentProps {
  params: {
    headlines: PostHeadline[];
  };
}

export default function TableContentComponent({ params }: TableContentProps) {
  let tableContent = renderTablehead(params.headlines);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Box
      className={`z-0 hover:z-50 fixed top-32 left-5 p-2 bg-gray-300 rounded-md transition-all duration-300 ${isExpanded ? "w-96" : "w-10"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {isExpanded ? "" : <MdExpandMore />}
      {isExpanded ? tableContent : ""}
    </Box>
  );
}

const renderTablehead = (headlines: PostHeadline[]) => {
  const handleClick = (index: string) => {
    const element = document.getElementById(index);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box>
      {headlines.map((headline) => (
        <Box
          key={generateRandomKey("tableContent")}
          className="ml-1 hover:text-red-500"
          style={{
            marginLeft: `${(headline.level - 1) * 2}em`,
            scrollMarginTop: "200px",
          }}
        >
          <Typography>
            {headline.prefix} {headline.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
