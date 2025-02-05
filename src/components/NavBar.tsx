import { FaBook, FaGithub, FaHome } from "react-icons/fa";
import { siteTitle, lfont } from "@/utils/constants";
import Link from "next/link";
import { lightModeColor } from "@/app/stores/ThemeColors";
import { AppBar, Box, Toolbar } from "@mui/material";

export default function NavBar() {
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
          <Link href="https://www.inmove.top" title="My GitHub">
            <FaHome className="h-6 w-6" />
          </Link>
        </div>
        <div
          className={`flex-grow text-4xl brightness-90 rotate-0 ${lfont.className}`}
        >
          {siteTitle}
        </div>
      </div>

      {/* Title Section */}
    </div>
  );
}
