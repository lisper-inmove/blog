import Image from "next/image";

interface ImageComponentProps {
    url: string;
}

export default function ImageComponent({ url }: ImageComponentProps) {
    // let height = 300;
    // let width = 300;
    // let justifyContent = "";
    const caption = "";
    // if (params.attributes.attr_html) {
    //     width = params.attributes.attr_html.width ?? 300;
    //     height = params.attributes.attr_html.height ?? 300;
    //     justifyContent = params.attributes.attr_html.justifyContent;
    //     caption = params.attributes.caption;
    // }
    return (
        <div key={url} className="flex pt-4">
            <div className="flex flex-col relative justify-start">
                <Image
                    src={url}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "auto", height: "auto" }}
                />
                <span className="text-2xl font-bold">{caption}</span>
            </div>
        </div>
    );
}
