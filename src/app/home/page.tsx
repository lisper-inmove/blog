"use client";
import { lfont } from "@/utils/constants";
import { CategoryMap, PostMetadata } from "../models/post";
import { Card } from "@mui/material";
import { useThemeStore } from "../stores/ThemeStore";
import { useEffect, useMemo, useState } from "react";

interface Props {
  params: {
    postsMetadatas: PostMetadata[];
  };
}

export default function Home({ params }: Props) {
  const { isDarkMode, themeColor, toggleTheme } = useThemeStore();
  let setCategory = false;
  const [selectCategory, setSelectCategory] = useState<CategoryMap | null>(
    null,
  );

  const { postsMetadatas } = params;

  const postCategories = useMemo(() => {
    if (!postsMetadatas) {
      return {};
    }
    return postsMetadatas.reduce<CategoryMap>((acc, element) => {
      element.categories.forEach((category) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(element);
        // if (selectCategory === null) {
        //   setSelectCategory({ [category]: acc[category] });
        // }
      });
      return acc;
    }, {});
  }, [postsMetadatas]);

  useEffect(() => {
    Object.entries(postCategories).map(([category, posts]) => {
      setSelectCategory({
        [category]: posts,
      });
    });
  }, [postCategories]);

  return (
    <div
      className="flex justify-around"
      style={{
        backgroundColor: themeColor.commonBgColor,
        color: themeColor.commonTextColor,
      }}
    >
      {/* Left Section: Post Category List */}
      <div className="flex flex-col items-center h-[90vh] w-1/6 overflow-y-auto border-r border-r-gray-300">
        <div className="h-12 w-3/4">
          {Object.entries(postCategories).map(([category, posts]) => (
            <Card
              key={category}
              onClick={() => setSelectCategory({ [category]: posts })}
              className="mt-8 h-12 flex items-center justify-center fadeIn2S text-2xl hover:cursor-pointer transform transition-transform active:scale-105"
              style={{
                backgroundColor: themeColor.postCategoryCardBgColor,
                boxShadow: `3px 3px 5px 1px ${themeColor.postCategoryCardShadowColor1}, -3px -3px 5px 1px ${themeColor.postCategoryCardShadowColor2}`,
                borderRadius: "8px",
              }}
            >
              <h3 className={`${lfont.className}`}>{category}</h3>
            </Card>
          ))}
        </div>
      </div>
      {/* Right Section: List Posts */}
      <div className="h-[90vh] w-5/6 overflow-y-auto">
        {selectCategory != null &&
          Object.values(selectCategory)
            .flat()
            .map((post, index) => {
              return <div key={post.id}>{post.title}</div>;
            })}
      </div>
    </div>
  );
}
