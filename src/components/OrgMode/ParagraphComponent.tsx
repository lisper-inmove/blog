import { SingleElement } from "@/entities/PostChild";
import { LineComponent } from "./LineContentComponents";

export default function ParagraphComponent(lines: SingleElement[]) {
    return (
        <div className="px-56 pt-4 text-xl">
            {lines.map((content: SingleElement) => {
                return LineComponent(content);
            })}
        </div>
    );
}
