import { PostMetadata } from "@/app/models/post";
import { loadPostsMetadata } from "@/utils/loadPostsMetadata";

export async function GET() {
  let postsMetadatas: PostMetadata[] = loadPostsMetadata();
  return Response.json(postsMetadatas);
}
