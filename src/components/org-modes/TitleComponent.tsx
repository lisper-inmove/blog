import { lightModeColor } from "@/app/stores/ThemeColors";

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
        <h1 className="text-4xl">{params.title}</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col justify-start items-start">
          <h2>Created At: {params.date}</h2>
          <h2 className="text-red-600">Keywords: {params.keywords}</h2>
        </div>
        <div className="max-w-2xl">
          <h1>Subtitle: </h1>
          <h3 className="text-sm pl-4">{params.subtitle}</h3>
        </div>
      </div>
    </div>
  );
}
