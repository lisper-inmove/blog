import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { lfont } from "@/utils/constants";
import { lightModeColor } from "@/app/stores/ThemeColors";

interface Props {
  line: string;
  language: string;
}

export default function CodeParser({ line, language }: Props) {
  let showLineNumbers = true;
  if (language == "picture") {
    showLineNumbers = false;
  }
  return (
    <div
      className="pt-4 px-56"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.codeLanguageTextColor,
      }}
    >
      <div className={`flex text-white absolute right-60 ${lfont.className}`}>
        <span
          className="mr-5"
          style={{
            color: lightModeColor.codeLanguageTextColor,
          }}
        >
          {language}
        </span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{ margin: "0" }}
      >
        {line}
      </SyntaxHighlighter>
    </div>
  );
}