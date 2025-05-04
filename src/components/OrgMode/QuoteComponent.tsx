import { LineComponent, LineContentProps } from "./LineContentComponents";

interface QuoteComponentProps {
    params: {
        contents: LineContentProps[];
    };
}

export default function QuoteComponent({ params }: QuoteComponentProps) {
    return (
        <div className="flex px-56 pt-4">
            <div
                className="border-l border-orange-300 ml-2 pl-4"
                aria-hidden="true"
            >
                {params.contents.map((content: LineContentProps) => {
                    return LineComponent(content);
                })}
            </div>
        </div>
    );
}
