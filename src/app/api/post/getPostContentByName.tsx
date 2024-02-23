import axios from "axios";

export async function getPostContentByName(postName: string): Promise<any> {
  // const url = `https://blog.inmove.top:30011/api/post`;
  const url = `http://192.168.3.124:3000/api/post`;
  try {
    const response = await axios.post(url, { name: postName });
    return response.data;
  } catch (error) {}
}
