import Home from "./home/page";
import { Box } from "@mui/material";
import { loadPostsMetadata } from "@/utils/loadPostsMetadata";

export default async function Root() {
  let postsMetadatas = loadPostsMetadata();
  return (
    <Box className="">
      <Home params={{ postsMetadatas: postsMetadatas }}></Home>
    </Box>
  );
}
