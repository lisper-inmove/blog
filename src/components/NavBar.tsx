import { FaBook, FaGithub, FaHome } from "react-icons/fa";
import { siteTitle, lfont } from "@/utils/constants";
import Link from "next/link";
import { lightModeColor } from "@/app/stores/ThemeColors";

export default function NavBar() {
  return (
    <nav
      className="flex h-[10vh] w-[100vw] items-center justify-between  absolute"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
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
    </nav>
  );
}
