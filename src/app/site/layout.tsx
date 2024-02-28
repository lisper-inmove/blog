import type { Metadata } from "next";
import "./style.css";
import NavBar from "@/components/NavBar";
import { lightModeColor } from "../stores/ThemeColors";
import { lfont } from "@/utils/constants";

export const metadata: Metadata = {
  title: "inmove's blog",
  description: "inmove's blog",
};

export default function SiteRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex flex-col h-screen"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
      }}
    >
      <header className="text-white text-center">
        <NavBar></NavBar>
      </header>
      <main className={`overflow-y-auto h-screen ${lfont.className}`}>
        {children}
      </main>
    </div>
  );
}
