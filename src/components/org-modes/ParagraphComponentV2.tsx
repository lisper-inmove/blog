import {
  LineContentProps,
  LineComponent,
  generateRandomKey,
} from "./LineContentComponents";

interface ParagraphComponentProps {
  params: {
    contents: LineContentProps[];
  };
}

export default function ParagraphComponentV2({
  params,
}: ParagraphComponentProps) {
  return (
    <div key={generateRandomKey("ParagraphComponentV2")}>
      {params.contents.map((content: LineContentProps) => {
        return LineComponent(content);
      })}
    </div>
  );
}
