import { PostMetadata } from "@/entities/Post";
import { LoadMetadata } from "@/utils/LoadMetadata";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const pageParam: string | null = url.searchParams.get("page");
    const categoryParam = url.searchParams.get("category");
    const page = pageParam ? Number(pageParam) : 1;
    const metadata: PostMetadata[] = LoadMetadata({
        page: page,
        category: categoryParam,
    });
    return Response.json(metadata);
}
