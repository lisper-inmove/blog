import { LineComponent, LineContentProps } from "./LineContentComponents";

export default function LinkComponent(params: LineContentProps) {
    return <div className="px-56 pt-4">{LineComponent(params)}</div>;
}
