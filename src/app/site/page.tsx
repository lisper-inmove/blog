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
import { cn } from "@/utils/cn";
import SideBarComponent from "@/components/SideBar";
import Image from "next/image";

type Param = string | undefined;

interface Props {
  searchParams: {
    [key: string]: Param;
  };
}

export default function Site({ searchParams }: Props) {
  const [selectCategory, setSelectCategory] = useState<CategoryMap | null>(
    null,
  );
  const [postCategories, setPostCategories] = useState<CategoryMap>({});
  const [categoryName, setCategoryName] = useState<string>(
    searchParams.c || "Projects",
  );

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
    };
    fetchMetadatas();
  }, []);

  useEffect(() => {
    const entries = Object.entries(postCategories);
    if (entries.length > 0) {
      let [category, posts] = entries[0];
      if (categoryName) {
        for (const entry of entries) {
          if (entry[0] === categoryName) {
            [category, posts] = entry;
            break;
          }
        }
      }
      setSelectCategory({
        [category]: posts,
      });
    }
  }, [postCategories, categoryName]);

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
      <SideBarComponent
        postCategories={postCategories}
        categoryName={categoryName}
        handleClick={setSelectCategory}
      ></SideBarComponent>
      {/* Right Section: List Posts */}
      <div className="h-[100vh] w-5/6 overflow-y-auto flex flex-col gap-10 flex-nowrap justify-start content-start mt-10 ml-10 pl-10 pt-10">
        {selectCategory != null &&
          Object.values(selectCategory)
            .flat()
            .map((post, index) => {
              console.log(post.subtitle);
              const keywordsStr = post.keywords.join(" ");
              return (
                <div
                  key={post.id}
                  className="flex flex-row flex-grow items-center justify-start gap-5 neu-shadow w-3/4 max-h-64 rounded-lg"
                >
                  <div className="p-10">
                    <Image
                      src={`${post.cardimage}`}
                      height={200}
                      width={200}
                      alt={`${post.title}`}
                      className="rounded-md"
                    ></Image>
                  </div>
                  <div className="pl-5 pr-20 pb-20 pt-10">
                    {post.transship === "" ? (
                      <>
                        <Link href={`/site/posts/${post.id}`} target="_blank">
                          <h1 className="text-4xl">{post.title}</h1>
                        </Link>
                        <br />
                        <h3 className="text-lg w-80 text-ellipsis line-clamp-6 text-orange-800 whitespace-pre-wrap">
                          {keywordsStr}
                        </h3>
                      </>
                    ) : (
                      <>
                        <Link href={`${post.transship}`} target="_blank">
                          <h1 className="text-3xl whitespace-pre-wrap">
                            Transship: {post.title}
                          </h1>
                          <br />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                // <CardContainer
                //   key={post.id}
                //   containerClassName="items-start justify-start content-start py-0 w-full"
                //   className="items-start justify-start content-start fadeIn2S"
                // >
                //   <CardBody
                //     className={cn(
                //       "m-8 h-64 flex-shrink flex-grow flex flex-col items-start neu-shadow relative rounded-xl p-4 w-full",
                //       {
                //         "bg-gray-300": post.transship !== "",
                //       },
                //     )}
                //   >
                //     <CardItem className={`${lfont.className} text-gray-900`}>
                //       {post.transship === "" ? (
                //         <>
                //           <Link href={`/site/posts/${post.id}`} target="_blank">
                //             <h1 className="text-4xl">{post.title}</h1>
                //           </Link>
                //           <br />
                //           <h3 className="text-lg w-80 text-ellipsis line-clamp-6 text-orange-800 whitespace-pre-wrap">
                //             {keywordsStr}
                //           </h3>
                //         </>
                //       ) : (
                //         <>
                //           <Link href={`${post.transship}`} target="_blank">
                //             <h1 className="text-3xl whitespace-pre-wrap">
                //               Transship: {post.title}
                //             </h1>
                //             <br />
                //           </Link>
                //         </>
                //       )}
                //     </CardItem>
                //   </CardBody>
                // </CardContainer>
              );
            })}
      </div>
    </Box>
  );
}
