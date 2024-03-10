import { lightModeColor } from "@/app/stores/ThemeColors";
import Image from "next/image";
import { generateRandomKey } from "./LineContentComponents";
import { withDefault } from "orga/dist/options";

interface ImageComponentProps {
  params: {
    url: string;
    alt: string;
    attributes: any;
  };
}

export default function ImageComponent({ params }: ImageComponentProps) {
  let height = 300;
  let width = 300;
  let justifyContent = "";
  let caption = "";
  if (params.attributes.attr_html) {
    width = params.attributes.attr_html.width ?? 300;
    height = params.attributes.attr_html.height ?? 300;
    justifyContent = params.attributes.attr_html.justifyContent;
    caption = params.attributes.caption;
  }
  return (
    <div
      className="flex px-56 pt-4 text-center"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
        justifyContent: justifyContent,
      }}
      key={generateRandomKey("imageComponent")}
    >
      <div
        className="flex flex-col"
        style={{
          width: width,
          height: height,
          position: "relative",
        }}
      >
        <Image
          fill
          src={params.url}
          alt={params.alt}
          key={generateRandomKey("imageComponent")}
        ></Image>
        <span className="text-2xl font-bold">{caption}</span>
      </div>
    </div>
  );
}
