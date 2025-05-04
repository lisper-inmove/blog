import { SingleElement } from "@/entities/PostChild";
import { LineComponent } from "./LineContentComponents";

export default function QuoteComponent(lines: SingleElement[]) {
    return (
        <div className="flex px-56 pt-4">
            <div
                className="border-l border-orange-300 ml-2 pl-4"
                aria-hidden="true"
            >
                {lines.map((content: SingleElement) => {
                    return LineComponent(content);
                })}
            </div>
        </div>
    );
}
