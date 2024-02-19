import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { lightModeColor } from "./stores/ThemeColors";

export const metadata: Metadata = {
  title: "inmove's blog",
  description: "inmove's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="flex flex-col"
        style={{
          backgroundColor: lightModeColor.commonBgColor,
        }}
      >
        <div className="flex fixed">
          <NavBar></NavBar>
        </div>
        <div className="mt-[10vh]">{children}</div>
      </body>
    </html>
  );
}
