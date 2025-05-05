import { SingleElement } from "@/entities/PostChild";

export function generateRandomKey(prefix: string) {
    return `${prefix}-${Math.random()}-${Math.random()}`;
}

export function CommonText(content: SingleElement) {
    return (
        <span key={`CommonText-${content.start.line}-${content.start.column}`}>
            <span
                style={{ whiteSpace: "pre-wrap" }}
                key={generateRandomKey("span-pre-wrap")}
            >
                {content.prefix}
            </span>
            <span
                key={generateRandomKey("commonText")}
                className={`${content.textSize}`}
                style={{ whiteSpace: "pre-wrap" }}
            >
                {content.value}
            </span>
        </span>
    );
}

export function QuoteText(content: SingleElement) {
    if (content.value != "") {
        return (
            <span
                key={`QuoteText-${content.start.line}-${content.start.column}`}
            >
                <span
                    key={generateRandomKey("commonText")}
                    className={`${content.textSize}`}
                >
                    <h3 className="line-clamp-6 text-ellipsis w-1/2">
                        {content.value}
                    </h3>
                </span>
            </span>
        );
    }
}

export function LinkText(content: SingleElement) {
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

export function VerbatimText(content: SingleElement) {
    return (
        <span
            key={`VerbatimText-${content.start.line}-${content.start.column}`}
        >
            <span key={generateRandomKey("span-pre-wrap")}>
                {content.prefix}
            </span>
            <span
                key={generateRandomKey("verbatim")}
                className={`${content.textSize} text-blue-500 dark:text-yellow-400`}
            >
                {content.value}
            </span>
        </span>
    );
}

export function ItalicText(content: SingleElement) {
    return (
        <span key={`ItalicText-${content.start.line}-${content.start.column}`}>
            <span key={generateRandomKey("span-pre-wrap")}>
                {content.prefix}
            </span>
            <span
                key={generateRandomKey("italic")}
                // className="text-orange-500 italic text-lg"
                className={`italic ${content.textSize} text-blue-500 dark:text-amber-200`}
            >
                {content.value}
            </span>
        </span>
    );
}

export function UnderlineText(content: SingleElement) {
    return (
        <>
            <span key={generateRandomKey("span-pre-wrap")}>
                {content.prefix}
            </span>
            <span
                key={generateRandomKey("underline")}
                className={`underline ${content.textSize} text-sky-500`}
            >
                {content.value}
            </span>
        </>
    );
}

export function InnercodeText(content: SingleElement) {
    return (
        <>
            <span key={generateRandomKey("span-pre-wrap")}>
                {content.prefix}
            </span>
            <span
                key={generateRandomKey("code")}
                className={`${content.textSize} text-red-500`}
            >
                {content.value}
            </span>
        </>
    );
}

export function BoldText(content: SingleElement) {
    return (
        <span key={`BoldText-${content.start.line}-${content.start.column}`}>
            <span key={generateRandomKey("span-pre-wrap")}>
                {content.prefix}
            </span>
            <span
                key={generateRandomKey("bold")}
                className={`font-bold ${content.textSize} text-red-600`}
            >
                {content.value}
            </span>
        </span>
    );
}

export function StrikeThroughText(content: SingleElement) {
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

export function LineComponent(content: SingleElement) {
    // if (content.textSize == "") {
    //   content.textSize = "text-lg";
    // }
    // if (content.type === "text" && content.style === "text") {
    //     return CommonText(content);
    // } else if (content.type === "text" && content.style === "verbatim") {
    //     return VerbatimText(content);
    // } else if (content.type === "quote") {
    //     return QuoteText(content);
    // } else if (content.type === "text" && content.style === "italic") {
    //     return ItalicText(content);
    // } else if (content.type === "text" && content.style === "underline") {
    //     return UnderlineText(content);
    // } else if (content.type === "text" && content.style === "code") {
    //     return InnercodeText(content);
    // } else if (content.type === "text" && content.style === "bold") {
    //     return BoldText(content);
    // } else if (content.type === "text" && content.style === "strikeThrough") {
    //     return StrikeThroughText(content);
    // } else if (content.type === "link") {
    //     return LinkText(content);
    // } else if (content.type === "newline" || content.type == "emptyLine") {
    //     return EmptyLine();
    // } else
    if (content.type === "list.item.bullet") {
        return CommonText(content);
    } else if (content.type === "innerCode") {
        return InnercodeText(content);
    } else if (content.type === "text") {
        if (content.style === "bold") {
            return BoldText(content);
        } else if (content.style === "italic") {
            return ItalicText(content);
        } else if (content.style === "verbatim") {
            return VerbatimText(content);
        } else {
            return CommonText(content);
        }
    }
}
