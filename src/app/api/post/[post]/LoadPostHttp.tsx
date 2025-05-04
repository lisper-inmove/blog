import { PROD_HOST } from "@/config";
import { Dict } from "@/entities/Dict";
import axios from "axios";

export async function loadPostHttp(postId: string): Promise<Dict> {
    const HOST = process.env.NEXT_PUBLIC_HOST || PROD_HOST;
    const url = `${HOST}/api/post/${postId}`;
    try {
        const response = await axios.get<Dict>(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
