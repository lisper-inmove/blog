import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

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
      <body className="flex flex-col">
        <div className="flex fixed">
          <NavBar></NavBar>
        </div>
        <div className="mt-[10vh]">{children}</div>
      </body>
    </html>
  );
}
