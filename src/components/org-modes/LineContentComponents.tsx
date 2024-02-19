export interface LineContentProps {
  type: string;
  style: string;
  value: string;
}
export function generateRandomKey(prefix: string) {
  return `${prefix}-${Math.random()}-${Math.random()}`;
}

export function CommonText(content: LineContentProps) {
  return <span key={generateRandomKey("commonText")}>{content.value}</span>;
}

export function VerbatimText(content: LineContentProps) {
  return (
    <span key={generateRandomKey("verbatim")} className="text-red-500">
      {content.value}
    </span>
  );
}

export function ItalicText(content: LineContentProps) {
  return (
    <span key={generateRandomKey("italic")} className="text-orange-500 italic">
      {content.value}
    </span>
  );
}

export function UnderlineText(content: LineContentProps) {
  return (
    <span
      key={generateRandomKey("underline")}
      className="text-sky-500 underline"
    >
      {content.value}
    </span>
  );
}

export function InnercodeText(content: LineContentProps) {
  return (
    <span key={generateRandomKey("code")} className="text-red-500">
      {content.value}
    </span>
  );
}

export function BoldText(content: LineContentProps) {
  return (
    <span key={generateRandomKey("bold")} className="text-blue-300 font-bold">
      {content.value}
    </span>
  );
}

export function StrikeThroughText(content: LineContentProps) {
  return (
    <span
      key={generateRandomKey("strikeThrough")}
      className="text-blue-300 line-through"
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
  } else if (content.type === "newline" || content.type == "emptyLine") {
    return EmptyLine();
  }
}
