"use client";
import { Headline } from "@/entities/PostChild";
import { Box } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

interface TableContentProps {
    params: {
        headlines: Headline[];
    };
}

export default function TableContentComponent({ params }: TableContentProps) {
    let tableContent = renderTableHead(params.headlines);
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div
            className={`z-50 hover:z-50 fixed top-20 left-5 p-2 rounded-md transition-all bg-gray-300 dark:bg-gray-600 duration-300 ${
                isExpanded ? "w-96" : ""
            }`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            style={{
                backdropFilter: "blur(20px)", // Standard syntax
            }}
        >
            {isExpanded ? "" : <MdExpandMore />}
            {isExpanded ? tableContent : ""}
        </div>
    );
}

const renderTableHead = (headlines: Headline[]) => {
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
            {headlines.map((headline, index) => (
                <div
                    key={index}
                    className="ml-1 hover:text-gray-700 text-gray-500 dark:hover:text-gray-300 dark:text-gray-400 text-sm"
                    style={{
                        marginLeft: `${(headline.level - 1) * 0.5}em`,
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
                        {headline.prefix} {headline.value}
                    </Link>
                </div>
            ))}
        </Box>
    );
};
