import { PostHeadline } from "@/app/models/post";
import { lightModeColor } from "@/app/stores/ThemeColors";

interface HeadlineComponentProps {
  params: {
    headline: PostHeadline;
  };
}
export default function HeadlineComponent({ params }: HeadlineComponentProps) {
  let levelToFontSize = [32, 28, 24, 22, 20, 18, 16, 14, 12, 10];
  return (
    <div
      className="mx-auto px-52 flex justify-start items-center"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.headlineTextColor,
        fontSize: levelToFontSize[params.headline.level - 1],
      }}
    >
      <div className="pr-10">
        {params.headline.prefix} {params.headline.name}
      </div>
      <div className="text-xl" style={{ color: lightModeColor.tagTextColor }}>
        {params.headline.tags.join("::")}
      </div>
    </div>
  );
}
