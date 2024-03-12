import { CategoryMap } from "@/app/models/post";
import { Box, Card } from "@mui/material";
import { lightModeColor } from "@/app/stores/ThemeColors";
import { lfont } from "@/utils/constants";
import { useState } from "react";

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
      <Box className="flex flex-col items-center h-[90vh] w-1/6 overflow-y-auto border-r border-r-gray-300">
        <Box className="h-12 w-3/4">
          {Object.entries(postCategories).map(([category, posts]) => (
            <Card
              key={category}
              // onClick={() => handleClick({ [category]: posts })}
              onClick={() => hClick({ [category]: posts })}
              className="mt-8 h-12 flex items-center justify-center slideInLeft2S text-2xl hover:cursor-pointer transform transition-transform active:scale-105 hover-translate neu-shadow category-card"
              style={{
                backgroundColor:
                  category === cname
                    ? lightModeColor.selectedPostCategoryCardBgColor
                    : lightModeColor.postCategoryCardBgColor,
                boxShadow: `3px 3px 5px 1px ${lightModeColor.postCategoryCardShadowColor1}, -3px -3px 5px 1px ${lightModeColor.postCategoryCardShadowColor2}`,
                borderRadius: "8px",
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
