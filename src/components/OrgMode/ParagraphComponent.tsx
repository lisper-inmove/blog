import { LineComponent, LineContentProps } from "./LineContentComponents";

interface ParagraphComponentProps {
    params: {
        contents: LineContentProps[];
        isResults: boolean;
    };
}

export default function ParagraphComponent({
    params,
}: ParagraphComponentProps) {
    return (
        <div className="px-56 pt-4 text-xl">
            {params.contents.map((content: LineContentProps) => {
                return LineComponent(content);
            })}
        </div>
    );
}
