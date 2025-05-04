import { PROD_HOST } from "@/config";
import { PostMetadata } from "@/entities/Post";
import axios from "axios";

interface Prop {
    page?: number;
    category?: string;
}

export async function LoadMetadataHttp({
    page,
    category,
}: Prop): Promise<PostMetadata[]> {
    const HOST = process.env.NEXT_PUBLIC_HOST || PROD_HOST;
    const url = `${HOST}/api/metadata?1=1&page=${page}&category=${category}`;
    try {
        const response = await axios.get<PostMetadata[]>(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
