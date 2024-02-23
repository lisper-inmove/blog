import Home from "./home/page";
import { Box } from "@mui/material";
import { loadPostsMetadataHttp } from "../api/post-category/loadPostsMetadataHttp";

export default async function Root() {
  let data = await loadPostsMetadataHttp();
  return (
    <Box className="">
      <Home params={{ postsMetadatas: data }}></Home>
    </Box>
  );
}
