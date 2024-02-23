export interface LineContentProps {
  type: string;
  style: string;
  value: string;
  prefix: string;
  link: string;
  textSize: string;
}
export function generateRandomKey(prefix: string) {
  return `${prefix}-${Math.random()}-${Math.random()}`;
}

export function CommonText(content: LineContentProps) {
  return (
    <>
      <span
        style={{ whiteSpace: "pre-wrap" }}
        key={generateRandomKey("span-pre-wrap")}
      >
        {content.prefix}
      </span>
      <span
        key={generateRandomKey("commonText")}
        className={`${content.textSize}`}
      >
        {content.value}
      </span>
    </>
  );
}

export function LinkText(content: LineContentProps) {
  return (
    <>
      <span
        style={{ whiteSpace: "pre-wrap" }}
        key={generateRandomKey("span-pre-wrap")}
      >
        {content.prefix}
      </span>
      <span
        key={generateRandomKey("commonText")}
        className={`${content.textSize} text-green-500`}
      >
        <a href={content.link} key={generateRandomKey("for-link")}>
          {content.value}
        </a>
      </span>
    </>
  );
}

export function VerbatimText(content: LineContentProps) {
  return (
    <>
      <span key={generateRandomKey("span-pre-wrap")}>{content.prefix}</span>
      <span
        key={generateRandomKey("verbatim")}
        className={`${content.textSize} text-red-500`}
      >
        {content.value}
      </span>
    </>
  );
}

export function ItalicText(content: LineContentProps) {
  return (
    <>
      <span key={generateRandomKey("span-pre-wrap")}>{content.prefix}</span>
      <span
        key={generateRandomKey("italic")}
        // className="text-orange-500 italic text-lg"
        className={`italic ${content.textSize} text-purple-500`}
      >
        {content.value}
      </span>
    </>
  );
}

export function UnderlineText(content: LineContentProps) {
  return (
    <>
      <span key={generateRandomKey("span-pre-wrap")}>{content.prefix}</span>
      <span
        key={generateRandomKey("underline")}
        className={`underline ${content.textSize} text-sky-500`}
      >
        {content.value}
      </span>
    </>
  );
}

export function InnercodeText(content: LineContentProps) {
  return (
    <>
      <span key={generateRandomKey("span-pre-wrap")}>{content.prefix}</span>
      <span
        key={generateRandomKey("code")}
        className={`${content.textSize} text-red-500`}
      >
        {content.value}
      </span>
    </>
  );
}

export function BoldText(content: LineContentProps) {
  return (
    <>
      <span key={generateRandomKey("span-pre-wrap")}>{content.prefix}</span>
      <span
        key={generateRandomKey("bold")}
        className={`font-bold ${content.textSize} text-orange-800`}
      >
        {content.value}
      </span>
    </>
  );
}

export function StrikeThroughText(content: LineContentProps) {
  return (
    <span
      key={generateRandomKey("strikeThrough")}
      className={`line-through ${content.textSize} text-blue-300`}
    >
      {content.value}
    </span>
  );
}

export function EmptyLine() {
  return <br key={generateRandomKey("emptyLine")} />;
}

export function LineComponent(content: LineContentProps) {
  if (content.textSize == "") {
    content.textSize = "text-lg";
  }
  if (content.type === "text" && content.style === "text") {
    return CommonText(content);
  } else if (content.type === "text" && content.style === "verbatim") {
    return VerbatimText(content);
  } else if (content.type === "text" && content.style === "italic") {
    return ItalicText(content);
  } else if (content.type === "text" && content.style === "underline") {
    return UnderlineText(content);
  } else if (content.type === "text" && content.style === "code") {
    return InnercodeText(content);
  } else if (content.type === "text" && content.style === "bold") {
    return BoldText(content);
  } else if (content.type === "text" && content.style === "strikeThrough") {
    return StrikeThroughText(content);
  } else if (content.type === "link") {
    return LinkText(content);
  } else if (content.type === "newline" || content.type == "emptyLine") {
    return EmptyLine();
  }
}
