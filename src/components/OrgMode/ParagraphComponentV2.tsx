import { SingleElement } from "@/entities/PostChild";
import { LineComponent, generateRandomKey } from "./LineContentComponents";

export default function ParagraphComponentV2(lines: SingleElement[]) {
    return (
        <div key={generateRandomKey("ParagraphComponentV2")}>
            {lines.map((content: SingleElement) => {
                return LineComponent(content);
            })}
        </div>
    );
}
