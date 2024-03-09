import axios from "axios";
import { PROD_HOST } from "../../config";

export async function getPostContent(postId: string): Promise<any> {
  const HOST = process.env.NEXT_PUBLIC_HOST || PROD_HOST;
  const url = `${HOST}/api/post/${postId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {}
}
