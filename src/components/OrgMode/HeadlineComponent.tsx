"use client";
import { Headline } from "@/entities/PostChild";
import { Box } from "@mui/material";
import Link from "next/link";

interface HeadlineComponentProps {
    headline: Headline;
}
export default function HeadlineComponent({
    headline,
}: HeadlineComponentProps) {
    const levelToFontSize: number[] = [32, 28, 24, 22, 20, 18, 16, 14, 12, 10];
    const textIndent: string[] = [];
    for (let i = 0; i < levelToFontSize.length; i++) {
        textIndent.push(`indent-${i * 4}`);
    }
    return (
        <Box className="mx-auto px-30 flex justify-start items-center">
            <Box className="pr-10 pt-5">
                <Link
                    href={`#${headline.prefix}`}
                    id={headline.prefix}
                    onClick={(e: any) => {
                        e.preventDefault();
                    }}
                >
                    <h3
                        className={textIndent[headline.level - 1]}
                        style={{
                            fontSize: levelToFontSize[headline.level - 1],
                        }}
                    >
                        {headline.prefix}: {headline.value}
                    </h3>
                </Link>
            </Box>
            <Box className="text-xl">{headline.tags.join("::")}</Box>
        </Box>
    );
}
