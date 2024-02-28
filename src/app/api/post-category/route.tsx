import { PostMetadata } from "@/app/models/post";
import { loadPostsMetadata } from "@/utils/loadPostsMetadata";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dateParam = url.searchParams.get("date");
  let timestamp = dateParam ? Number(dateParam) : Date.now();
  let postsMetadatas: PostMetadata[] = loadPostsMetadata(timestamp);
  return Response.json(postsMetadatas);
}
