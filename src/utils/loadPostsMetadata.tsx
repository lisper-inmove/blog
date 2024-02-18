import path from "path";
import fs from "fs";
import { PostMetadata } from "@/app/models/post";

export function loadPostsMetadata() {
  const metadataPath = path.join(process.cwd(), "metadata.json");
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  const postsMetadata: PostMetadata[] = metadata.map((item: any) => ({
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
  }));
  return postsMetadata;
}
