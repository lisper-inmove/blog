import axios from "axios";
import { PROD_HOST } from "../config";

export async function getPostContentByName(postName: string): Promise<any> {
  const HOST = process.env.NEXT_PUBLIC_HOST || PROD_HOST;
  const url = `${HOST}/api/post`;
  try {
    const response = await axios.post(url, { name: postName });
    return response.data;
  } catch (error) {}
}
