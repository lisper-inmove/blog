import { decodeBase64 } from "@/utils/encodes";
import * as fs from "fs/promises";

export async function GET(request: Request) {
  let pathnames = request.url.split("/");
  let length = pathnames.length;
  let pathname = pathnames[length - 1];
  let filepath = decodeBase64(pathname);
  const content = await fs.readFile(filepath, "utf8");
  return Response.json({ content: content });
}
