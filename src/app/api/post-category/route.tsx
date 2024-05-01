import { PostMetadata } from "@/app/models/post";
import { loadPostsMetadata } from "@/utils/loadPostsMetadata";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dateParam = url.searchParams.get("date");
  const pageParam = url.searchParams.get("page");
  let timestamp = dateParam ? Number(dateParam) : Date.now();
  let page = pageParam ? Number(pageParam) : 1;
  let postsMetadatas: PostMetadata[] = loadPostsMetadata(timestamp, page);
  return Response.json(postsMetadatas);
}
