"use client";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaBook, FaGithub, FaHome } from "react-icons/fa";
import { useThemeStore } from "@/app/stores/ThemeStore";
import { siteTitle, lfont } from "@/utils/constants";
import Link from "next/link";

export default function NavBar() {
  const { isDarkMode, themeColor, toggleTheme } = useThemeStore();
  return (
    <nav
      className="flex h-[10vh] w-[100vw] items-center justify-between border-b border-gray-300"
      style={{
        backgroundColor: themeColor.commonBgColor,
        color: themeColor.commonTextColor,
      }}
    >
      {/* Some Links section */}
      <div className="ml-4 flex">
        <Link href="/" className="mr-4" title="Home Page">
          <FaHome className="h-6 w-6" />
        </Link>
        <Link href="/" className="mr-4" title="My Works">
          <FaBook className="h-6 w-6" />
        </Link>
        <Link href="https://github.com/lisper-inmove" title="My GitHub">
          <FaGithub className="h-6 w-6" />
        </Link>
      </div>

      {/* Title Section */}
      <div className={`flex-1 text-center text-4xl ${lfont.className}`}>
        {siteTitle}
      </div>

      {/* Theme toggle section */}
      <div
        className="rounded-full w-12 h-12 flex justify-center items-center mr-8"
        onClick={toggleTheme}
      >
        {isDarkMode ? (
          <MdDarkMode className="h-8 w-8" />
        ) : (
          <MdLightMode className="h-8 w-8" />
        )}
      </div>
    </nav>
  );
}
