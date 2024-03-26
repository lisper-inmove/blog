"use client";
import React, { useState } from "react";
import { PostHeadline } from "@/app/models/post";
import { MdExpandMore } from "react-icons/md";
import { generateRandomKey } from "./org-modes/LineContentComponents";
import { Box } from "@mui/material";
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
    <div
      className={`z-50 hover:z-50 fixed top-20 left-5 p-2 rounded-md transition-all duration-300 ${isExpanded ? "w-96" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{
        backgroundColor: "#c9c9c9a6",
        backdropFilter: "blur(10px)", // Standard syntax
      }}
    >
      {isExpanded ? "" : <MdExpandMore />}
      {isExpanded ? tableContent : ""}
    </div>
  );
}

const renderTablehead = (headlines: PostHeadline[]) => {
  const handleClick = (index: string) => {
    const element = document.getElementById(index);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  return (
    <Box>
      {headlines.map((headline) => (
        <div
          key={generateRandomKey("tableContent")}
          className="ml-1 hover:text-gray-700 text-gray-500"
          style={{
            marginLeft: `${(headline.level - 1) * 2}em`,
            scrollMarginTop: "200px",
          }}
        >
          <Link
            href={`#${headline.prefix}`}
            onClick={(e: any) => {
              e.preventDefault();
              handleClick(headline.prefix);
            }}
          >
            {headline.prefix} {headline.name}
          </Link>
        </div>
      ))}
    </Box>
  );
};
