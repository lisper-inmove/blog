import axios from "axios";
import { HOST } from "../../config";

export async function getPostContent(postId: string): Promise<any> {
  const url = `${HOST}/api/post/${postId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {}
}
