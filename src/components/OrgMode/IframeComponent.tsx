import { cn } from "@/utils/cn";

interface IframeComponentProps {
    params: {
        link: string;
        attributes: any;
    };
}

export default function IframeComponent({ params }: IframeComponentProps) {
    let height = undefined;
    let width = undefined;
    let align = "center";
    if (params.attributes && params.attributes.attr_html) {
        if (params.attributes.attr_html.height) {
            height = params.attributes.attr_html.height;
        }
        if (params.attributes.attr_html.width) {
            width = params.attributes.attr_html.width;
        }
        if (params.attributes.attr_html.align) {
            align = params.attributes.attr_html.align;
        }
    }
    const defaultHost = "https://inmove.top/learning_react";
    const host = process.env.LEARNING_REACT_HOST || defaultHost;
    const link = params.link.replace(defaultHost, host);
    return (
        <div
            className={cn("flex px-56 mt-2 pt-4", {
                "mr-auto": align === "left",
                "ml-auto": align === "right",
                "mx-auto": align === "center",
            })}
            style={{
                width: width,
                height: height,
            }}
        >
            <iframe src={link} className="w-full text-gray-400"></iframe>
        </div>
    );
}
