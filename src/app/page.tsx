"use client";
import Home from "./home/page";
import { PostMetadata } from "./models/post";
import { loadPostsMetadataHttp } from "./api/post-category/loadPostsMetadataHttp";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function Root() {
  const [postsMetadatas, setPostsMetadatas] = useState<PostMetadata[]>([]);

  useEffect(() => {
    loadPostsMetadataHttp()
      .then((data) => {
        setPostsMetadatas(data);
      })
      .catch((error) => console.log("Load posts metadatas error", error));
  }, []);
  return (
    <Box className="">
      <Home params={{ postsMetadatas: postsMetadatas }}></Home>
    </Box>
  );
}
