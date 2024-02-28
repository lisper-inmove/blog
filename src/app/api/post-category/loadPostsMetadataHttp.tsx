import axios from "axios";
import { HOST } from "../config";

export async function loadPostsMetadataHttp(time: number): Promise<any> {
  const url = `${HOST}/api/post-category?date=${time}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {}
}
