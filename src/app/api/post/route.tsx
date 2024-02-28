import { PostMetadata } from "@/app/models/post";
import { loadPostsMetadata } from "@/utils/loadPostsMetadata";
import * as fs from "fs/promises";
export async function POST(request: Request) {
  let params = await request.json();
  let name = params.name;
  if (!name) {
    return Response.json({});
  }
  let postsMetadatas: PostMetadata[] = loadPostsMetadata(Date.now());
  for (let metadata of postsMetadatas) {
    if (metadata.path.endsWith(name)) {
      let content = await fs.readFile(metadata.path, "utf8");
      return Response.json({ content: content });
    }
  }
  return Response.json({});
}
