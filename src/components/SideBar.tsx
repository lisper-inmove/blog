import { CategoryMap } from "@/app/models/post";
import { Box, Card } from "@mui/material";
import { lightModeColor } from "@/app/stores/ThemeColors";
import { lfont } from "@/utils/constants";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface SideBarComponentProps {
  postCategories: CategoryMap;
  categoryName: string;
  handleClick: (category: CategoryMap) => void;
}

export default function SideBarComponent({
  postCategories,
  categoryName,
  handleClick,
}: SideBarComponentProps) {
  const [cname, setCname] = useState(categoryName);
  const hClick = (category: CategoryMap) => {
    setCname(Object.keys(category)[0]);
    handleClick(category);
  };
  return (
    <>
      {/* Left Section: Post Category List */}
      <Box className="flex flex-col items-center h-[100vh] w-1/6 overflow-y-auto border-r border-r-gray-300">
        <Box className="h-12 w-3/4">
          {Object.entries(postCategories).map(([category, posts]) => (
            <Card
              key={category}
              // onClick={() => handleClick({ [category]: posts })}
              onClick={() => hClick({ [category]: posts })}
              className={cn(
                "mt-8 h-12 flex items-center justify-center slideInLeft2S text-2xl hover:cursor-pointer transform transition-transform active:scale-105 hover-translate neu-shadow category-card",
                {
                  "border-b-2": category === cname,
                  "border-orange-300": category === cname,
                },
              )}
              style={{
                backgroundColor: lightModeColor.postCategoryCardBgColor,
              }}
            >
              <h3
                aria-hidden="true"
                className={`${lfont.className} category-text-hidden`}
              >
                {category}
              </h3>
              <h3 className={`${lfont.className} category-text`}>{category}</h3>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
