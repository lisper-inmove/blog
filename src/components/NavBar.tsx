"use client";
import { FaGithub, FaHome } from "react-icons/fa";
import { siteTitle, lfont } from "@/utils/constants";
import Link from "next/link";
import { lightModeColor } from "@/app/stores/ThemeColors";
import { useState, useEffect } from "react";

interface NavBarProps {
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
}

export default function NavBar({
  onSearchChange,
  showSearch = false,
}: NavBarProps) {
  const [inputValue, setInputValue] = useState("");

  // 防抖 effect：延迟 500ms 执行 onSearchChange
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchChange?.(inputValue);
    }, 500);

    return () => clearTimeout(timeout); // 清除上一个 timeout，防抖关键
  }, [inputValue, onSearchChange]);
  return (
    <div
      className="border border-b border-b-gray-100 top-0 h-20 fixed w-full z-50"
      style={{
        backgroundColor: "#dadada",
        color: lightModeColor.commonTextColor,
      }}
    >
      {/* Some Links section */}
      <div className="flex flex-row h-full w-full text-center items-center">
        <div className="flex flex-row pl-10">
          <Link href="https://github.com/lisper-inmove" title="My GitHub">
            <FaGithub className="h-6 w-6 mr-3" />
          </Link>
          <Link href="https://www.inmove.top" title="To Home">
            <FaHome className="h-6 w-6" />
          </Link>
        </div>
        <div
          className={`flex-grow text-4xl brightness-90 rotate-0 ${lfont.className}`}
        >
          {siteTitle}
        </div>
        {showSearch && (
          <div className="w-1/6 pr-10">
            <input
              type="text"
              placeholder="Search Categroy"
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2"
            />
          </div>
        )}
      </div>

      {/* Title Section */}
    </div>
  );
}
