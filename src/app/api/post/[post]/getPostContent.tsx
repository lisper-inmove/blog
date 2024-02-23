import axios from "axios";

export async function getPostContent(postId: string): Promise<any> {
  // const url = `https://blog.inmove.top:30011/api/post/${postId}`;
  const url = `http://192.168.3.124:3000/api/post/${postId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {}
}
