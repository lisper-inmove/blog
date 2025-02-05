"use client";
import { PostMetadata } from "./models/post";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { lightModeColor } from "./stores/ThemeColors";
import { loadPostsMetadataHttp } from "./api/post-category/loadPostsMetadataHttp";
import { MotionDiv } from "@/components/MotionDiv";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";

type Param = string | undefined;

interface Props {
  searchParams: {
    [key: string]: Param;
  };
}

export default function Site({ searchParams }: Props) {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [end, setEnd] = useState<boolean>(false);
  const { ref, inView } = useInView();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchMetadatas = async () => {
      let metadatas = await loadPostsMetadataHttp(Date.now(), 1);
      if (metadatas.length === 0) {
      }
      setPosts(metadatas);
    };
    fetchMetadatas();
  }, []);

  useEffect(() => {
    if (inView && !end) {
      loadPostsMetadataHttp(Date.now(), page + 1).then((newPosts) => {
        if (newPosts.length === 0) {
          setEnd(true);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          setPage(page + 1);
        }
      });
    }
  }, [inView, end, page]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <header className="text-white text-center">
        <NavBar></NavBar>
      </header>
      {/* Right Section: List Posts */}
      <div className="flex flex-col h-full w-4/5 overflow-y-auto gap-10 mx-auto mt-20 mb-10">
        <div className="flex flex-col items-center mb-10">
          {posts != null &&
            posts.map((post, index) => {
              return (
                <MotionDiv
                  key={post.id}
                  className="flex items-center justify-around w-4/5 mx-auto h-full neu-shadow rounded mt-10"
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.1,
                    ease: "easeInOut",
                    duration: 0.5,
                  }}
                  viewport={{ amount: 0 }}
                  style={{
                    backgroundColor: lightModeColor.commonBgColor,
                    color: lightModeColor.commonTextColor,
                  }}
                >
                  <div className="flex flex-col p-8 w-full h-64 justify-between">
                    {/* 标题 */}
                    <div className="text-2xl text-black font-bold">
                      <Link href={`/site/posts/${post.id}`} target="_blank">
                        {post.title}
                      </Link>
                    </div>
                    {/* 子标题 */}
                    <div className="text-lg text-black/50 font-semibold indent-4">
                      {post.subtitle}
                    </div>
                    <div className="flex flex-row justify-between">
                      {/* 关键字 */}
                      <div className="flex flex-row mb-3">
                        <div className="text-black/70 text-lg mt-5 ml-3 px-3 py-1 bg-gray-300 rounded-lg font-semibold">
                          #{post.categories}
                        </div>
                        {post.keywords.map((keyword, index) => {
                          return (
                            <div
                              className="text-black/70 text-lg mt-5 ml-3 px-3 py-1 bg-gray-300 rounded-lg font-semibold"
                              key={`${post.id}-keyword-${index}`}
                            >
                              #{keyword}
                            </div>
                          );
                        })}
                      </div>
                      {/* 创建时间 */}
                      <div className="self-end mb-3">{post.date}</div>
                    </div>
                  </div>
                </MotionDiv>
              );
            })}
        </div>
        {end ? null : (
          <div className="text-center mx-auto mt-8 mb-8" ref={ref}>
            <LoaderCircle className="animate-spin w-8 h-8 text-orange-300" />
          </div>
        )}
      </div>
    </>
  );
}
