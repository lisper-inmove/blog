import axios from "axios";

export async function loadPostsMetadataHttp(): Promise<any> {
  const url = "http://192.168.3.124:3000/api/post-category";
  // const url = "https://blog.inmove.top:30011/api/post-category";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {}
}
