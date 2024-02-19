import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { lightModeColor } from "./stores/ThemeColors";
import { Box } from "@mui/material";

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
        className="flex flex-col h-screen"
        style={{
          backgroundColor: lightModeColor.commonBgColor,
        }}
      >
        <header className="text-white text-center">
          <NavBar></NavBar>
        </header>
        <main className="overflow-y-auto h-screen">{children}</main>
      </body>
    </html>
  );
}
