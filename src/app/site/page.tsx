"use client";
import { lfont } from "@/utils/constants";
import { CategoryMap } from "../models/post";
import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { lightModeColor } from "../stores/ThemeColors";
import { loadPostsMetadataHttp } from "../api/post-category/loadPostsMetadataHttp";
import { CardItem } from "@/components/ui/3d-card";
import { CardBody } from "@/components/ui/3d-card";
import { CardContainer } from "@/components/ui/3d-card";
import "./style.css";

export default function Home() {
  const [selectCategory, setSelectCategory] = useState<CategoryMap | null>(
    null,
  );
  const [postCategories, setPostCategories] = useState<CategoryMap>({});

  useEffect(() => {
    let data: CategoryMap = {};
    const fetchMetadatas = async () => {
      let metadatas = await loadPostsMetadataHttp(Date.now());
      for (let metadata of metadatas) {
        if (metadata.display != "t") {
          continue;
        }
        for (let category of metadata.categories) {
          if (!data[category]) {
            data[category] = [];
          }
          data[category].push(metadata);
        }
      }
      setPostCategories(data);
      const entries = Object.entries(data);
      if (entries.length > 0) {
        const [category, posts] = entries[0];
        setSelectCategory({
          [category]: posts,
        });
      }
    };
    fetchMetadatas();
  }, []);

  return (
    <Box
      className="flex justify-around"
      style={{
        backgroundColor: lightModeColor.commonBgColor,
        color: lightModeColor.commonTextColor,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Left Section: Post Category List */}
      <Box className="flex flex-col items-center h-[90vh] w-1/6 overflow-y-auto border-r border-r-gray-300">
        <Box className="h-12 w-3/4">
          {Object.entries(postCategories).map(([category, posts]) => (
            <Card
              key={category}
              onClick={() => setSelectCategory({ [category]: posts })}
              className="mt-8 h-12 flex items-center justify-center slideInLeft2S text-2xl hover:cursor-pointer transform transition-transform active:scale-105 hover-translate neu-shadow category-card"
              style={{
                backgroundColor: lightModeColor.postCategoryCardBgColor,
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
      {/* Right Section: List Posts */}
      <div className="h-[100vh] w-5/6 overflow-y-auto flex flex-wrap justify-start content-start">
        {selectCategory != null &&
          Object.values(selectCategory)
            .flat()
            .map((post, index) => {
              return (
                <CardContainer
                  key={post.id}
                  containerClassName="items-start justify-start content-start py-0"
                  className="items-start justify-start content-start fadeIn2S"
                >
                  <CardBody className="m-8 w-96 h-64 flex-shrink flex-grow flex flex-col items-start neu-shadow relative rounded-xl p-4">
                    <CardItem
                      translateZ={10}
                      translateX={10}
                      translateY={-5}
                      className={`${lfont.className} text-gray-900`}
                    >
                      <Link href={`/site/posts/${post.id}`} target="_blank">
                        <h1 className="text-4xl">{post.title}</h1>
                      </Link>
                      <br />
                      <h3 className="text-lg text-ellipsis w-80 line-clamp-6">
                        {post.subtitle}
                      </h3>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              );
            })}
      </div>
    </Box>
  );
}
