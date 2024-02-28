import axios from "axios";
import { HOST } from "../config";

export async function getPostContentByName(postName: string): Promise<any> {
  const url = `${HOST}/api/post`;
  try {
    const response = await axios.post(url, { name: postName });
    return response.data;
  } catch (error) {}
}
