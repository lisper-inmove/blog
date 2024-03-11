import Image from "next/image";
import { generateRandomKey } from "./LineContentComponents";

interface MultiImageComponentProps {
  attributes: any;
  urls: string[];
}

export default function MultiImageComponent({
  attributes,
  urls,
}: MultiImageComponentProps) {
  let height = attributes.attr_html?.height ?? 300;
  let width = attributes.attr_html?.width ?? 300;
  let align = attributes.atrr_html?.align ?? "center";
  return (
    <>
      <div className="flex justify-start gap-5 px-56 pt-4">
        {urls.map((url) => {
          return (
            <div
              className="relative"
              style={{
                height: height,
                width: width,
              }}
              key={generateRandomKey("multiImageComponent")}
            >
              <Image
                fill
                src={url}
                alt=""
                key={generateRandomKey("multiImageComponent")}
              ></Image>
            </div>
          );
        })}
      </div>
    </>
  );
}
