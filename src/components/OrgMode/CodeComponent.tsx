"use client";
import { SyntheticEvent, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD
import { Box } from "@mui/material";
import { FaRegCopy } from "react-icons/fa6";
import {
    hopscotch as dark,
    solarizedlight as light,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
// import * as styles from "react-syntax-highlighter/dist/esm/styles/prism";

import { generateRandomKey } from "./LineContentComponents";

interface Props {
    line: string;
    language: string;
    name: string;
}

export default function CodeComponent({ line, language, name }: Props) {
    // console.log(styles);
    const [theme, setTheme] = useState(dark);
    let showLineNumbers = true;
    if (language == "picture") {
        showLineNumbers = false;
    }
    const [copied, setCopied] = useState(false);

    const handleClick = (e: SyntheticEvent) => {
        navigator.clipboard.writeText(line);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        setTheme(darkModeMediaQuery.matches ? dark : light);
    }, [theme]);

    return (
        <Box className="pt-4 mb-8 relative">
            <Box className="flex text-amber-900 dark:text-amber-700 absolute items-center right-1">
                <span className="text-2xl mr-5">
                    {copied ? (
                        <h1 className="fadeIn2S" key="copy-success">
                            Success
                        </h1>
                    ) : (
                        <h1 className="fadeIn2S" key="not-copy">
                            {name === "" ? "" : `${name} -- `}
                            {language}
                        </h1>
                    )}
                </span>
                <span className="mr-8 text-2xl cursor-pointer">
                    <FaRegCopy onClick={handleClick}></FaRegCopy>
                </span>
            </Box>
            <SyntaxHighlighter
                language={language}
                style={theme}
                showLineNumbers={showLineNumbers}
                customStyle={{
                    margin: "0",
                    boxShadow:
                        "white -3px -3px 4px 2px, #7e7e7e 3px 3px 4px 2px",
                    borderRadius: "10px",
                }}
                key={generateRandomKey("codeBlock")}
            >
                {line}
            </SyntaxHighlighter>
        </Box>
    );
}
