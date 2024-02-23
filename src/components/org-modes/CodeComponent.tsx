"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState, SyntheticEvent } from "react";

// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD
import { hopscotch as codeTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { lfont } from "@/utils/constants";
import { lightModeColor } from "@/app/stores/ThemeColors";
import { Box } from "@mui/material";
import { FaRegCopy } from "react-icons/fa6";
import { generateRandomKey } from "./LineContentComponents";

interface Props {
  line: string;
  language: string;
  name: string;
}

export default function CodeParser({ line, language, name }: Props) {
  let showLineNumbers = true;
  if (language == "picture") {
    showLineNumbers = false;
  }
  const [copied, setCopied] = useState(false);

  const handleClick = (e: SyntheticEvent) => {
    // navigator.clipboard.writeText(line);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Box
      className="pt-4 px-56 relative"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.codeLanguageTextColor,
      }}
    >
      <Box
        className={`flex text-white absolute right-60 items-center ${lfont.className}`}
      >
        <span
          className="mr-5 text-2xl"
          style={{
            color: lightModeColor.codeLanguageTextColor,
          }}
        >
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
        <span
          className="mr-8 text-2xl cursor-pointer"
          style={{
            color: lightModeColor.codeLanguageTextColor,
          }}
        >
          <FaRegCopy onClick={handleClick}></FaRegCopy>
        </span>
      </Box>
      <SyntaxHighlighter
        language={language}
        style={codeTheme}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: "0",
          boxShadow: "white -3px -3px 4px 2px, #7e7e7e 3px 3px 4px 2px",
          borderRadius: "10px",
        }}
        key={generateRandomKey("codeBlock")}
      >
        {line}
      </SyntaxHighlighter>
    </Box>
  );
}
