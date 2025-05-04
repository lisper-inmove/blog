import { PostMetadata, SourcePostMetadata } from "@/entities/Post";
import fs from "fs";
import path from "path";

interface Prop {
    page?: number;
    onlyDisplay?: boolean;
    category?: string | null;
}

export function LoadMetadata({
    page,
    onlyDisplay,
    category,
}: Prop): PostMetadata[] {
    if (!page) {
        page = 1;
    }
    const metadataPath = path.join(process.cwd(), "posts/metadata.json");
    const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    const size = 30;
    const skip = (page - 1) * size;
    let postsMetadata: PostMetadata[] = metadata
        .map((item: SourcePostMetadata) => ({
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
            transship: item.transship,
            cardimage: item.cardimage,
            date: item.date,
        }))
        .filter((post: PostMetadata) => !onlyDisplay || post.display === "t");

    if (category) {
        postsMetadata = postsMetadata.filter((post) =>
            post.categories.includes(category)
        );
    }
    return postsMetadata.slice(skip, skip + size);
}
