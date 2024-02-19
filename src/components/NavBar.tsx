import { FaBook, FaGithub, FaHome } from "react-icons/fa";
import { siteTitle, lfont } from "@/utils/constants";
import Link from "next/link";
import { lightModeColor } from "@/app/stores/ThemeColors";
import { AppBar, Box, Toolbar } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar
      position="static"
      className="flex flex-row flex-grow w-screen items-center justify-between"
      style={{
        backgroundColor: lightModeColor.navbarBgColor,
        color: lightModeColor.commonTextColor,
      }}
    >
      {/* Some Links section */}
      <Toolbar>
        <Link href="/" className="mr-4" title="Home Page">
          <FaHome className="h-6 w-6" />
        </Link>
        <Link href="/" className="mr-4" title="My Works">
          <FaBook className="h-6 w-6" />
        </Link>
        <Link href="https://github.com/lisper-inmove" title="My GitHub">
          <FaGithub className="h-6 w-6" />
        </Link>
      </Toolbar>

      {/* Title Section */}
      <Box className={`flex-1 text-center text-4xl ${lfont.className}`}>
        {siteTitle}
      </Box>
    </AppBar>
  );
}
