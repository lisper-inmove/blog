import { lightModeColor } from "@/app/stores/ThemeColors";
import { lfont } from "@/utils/constants";

interface TitleComponentProps {
  params: {
    title: string;
    subtitle: string;
    date: string;
    keywords: string;
  };
}

export default function TitleComponent({ params }: TitleComponentProps) {
  return (
    <div
      className="pt-8 flex flex-col px-52 pb-8"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
      }}
    >
      <div className="flex justify-center">
        <h1 id="article-id" className="text-4xl">
          {params.title}
        </h1>
      </div>
      <div
        className={`flex flex-col justify-start items-start ${lfont.className}`}
      >
        <h3 className="text-xl">Last Update At: {params.date}</h3>
        {params.subtitle ? (
          <h3 className="font-bold text-red-700 text-xl">
            Subtitle: {params.subtitle}
          </h3>
        ) : null}
      </div>
    </div>
  );
}
