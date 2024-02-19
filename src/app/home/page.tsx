"use client";
import { lfont } from "@/utils/constants";
import { CategoryMap, PostMetadata } from "../models/post";
import { Card } from "@mui/material";
import { useThemeStore } from "../stores/ThemeStore";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

interface Props {
  params: {
    postsMetadatas: PostMetadata[];
  };
}

export default function Home({ params }: Props) {
  const { isDarkMode, themeColor, toggleTheme } = useThemeStore();
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
              className="mt-8 h-12 flex items-center justify-center slideInLeft2S text-2xl hover:cursor-pointer transform transition-transform active:scale-105"
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
      <div className="h-[90vh] w-5/6 overflow-y-auto flex flex-wrap justify-start content-start">
        {selectCategory != null &&
          Object.values(selectCategory)
            .flat()
            .map((post, index) => {
              return (
                <Card
                  key={post.id}
                  className="m-8 h-36 w-80 flex flex-col items-start p-4 fadeIn2S"
                  style={{
                    backgroundColor: themeColor.postCategoryCardBgColor,
                    boxShadow: `3px 3px 5px 1px ${themeColor.postCategoryCardShadowColor1}, -3px -3px 5px 1px ${themeColor.postCategoryCardShadowColor2}`,
                    borderRadius: "8px",
                  }}
                >
                  <div className={`${lfont.className}`}>
                    <Link href={`/posts/${post.id}`}>
                      <h1 className="text-2xl">{post.title}</h1>
                    </Link>
                  </div>
                  <br />
                  <div>
                    <h3 className="text-sm">{post.subtitle}</h3>
                  </div>
                  <div>{post.id}</div>
                </Card>
              );
            })}
      </div>
    </div>
  );
}
