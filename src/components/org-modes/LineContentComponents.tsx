export interface LineContentProps {
  type: string;
  style: string;
  value: string;
  prefix: string;
  link: string;
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
      <span key={generateRandomKey("commonText")} className="text-lg">
        {content.value}
      </span>
    </>
  );
}

export function IFrame(content: LineContentProps) {
  return (
    <>
      <iframe
        src={content.link}
        style={{
          width: "500px",
          height: "200px",
        }}
      ></iframe>
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
        className="text-lg text-cyan-600"
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
        className="text-red-500 text-lg"
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
        className="text-orange-500 italic text-lg"
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
        className="text-sky-500 underline text-lg"
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
      <span key={generateRandomKey("code")} className="text-red-500 text-lg">
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
        className="text-orange-900 font-bold text-lg"
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
      className="text-blue-300 line-through text-lg"
    >
      {content.value}
    </span>
  );
}

export function EmptyLine() {
  return <br key={generateRandomKey("emptyLine")} />;
}

export function LineComponent(content: LineContentProps) {
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
  } else if (content.type == "iframe") {
    return IFrame(content);
  } else if (content.type === "newline" || content.type == "emptyLine") {
    return EmptyLine();
  }
}
