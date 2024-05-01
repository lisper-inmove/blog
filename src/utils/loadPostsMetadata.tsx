import path from "path";
import fs from "fs";
import { PostMetadata } from "@/app/models/post";

export function loadPostsMetadata(time: number, page: number) {
  const metadataPath = path.join(process.cwd(), "posts/metadata.json");
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  const size = 10;
  const skip = (page - 1) * size;
  const postsMetadata: PostMetadata[] = metadata
    .map((item: any) => ({
      id: item.id,
      path: item.path,
      title: item.title,
      keywords: item.keywords
        .split(" ")
        .filter((keyword: string) => keyword.trim() !== ""),
      categories: item.categories
        .split(" ")
        .filter((keyword: string) => keyword.trim() !== ""),
      difficulty: item.difficulty,
      subtitle: item.subtitle,
      display: item.display,
      queryTime: time.toString(),
      transship: item.transship,
      cardimage: item.cardimage,
      date: item.date,
    }))
    .filter((post: PostMetadata) => post.display === "t");
  return postsMetadata.slice(skip, skip + size);
}
