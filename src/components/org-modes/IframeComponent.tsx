import { lightModeColor } from "@/app/stores/ThemeColors";

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
    height = params.attributes.attr_html.height;
    width = params.attributes.attr_html.width;
    align = params.attributes.attr_html.align;
  }
  return (
    <div
      className="flex px-56 pt-4"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
        width: width,
        height: height,
        justifyContent: align,
      }}
    >
      <iframe src={params.link}></iframe>
    </div>
  );
}
