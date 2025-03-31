import { lightModeColor } from "@/app/stores/ThemeColors";

export default function Foot() {
  return (
    <div
      className="border border-b border-b-gray-100 bottom-0 h-6 fixed w-full z-50"
      style={{
        backgroundColor: "#dadada",
        color: lightModeColor.commonTextColor,
      }}
    >
      <a>粤ICP备2023000078号-4</a>
    </div>
  );
}
