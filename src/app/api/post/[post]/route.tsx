import { decodeBase64 } from "@/utils/Encodes";
import * as fs from "fs/promises";

export async function GET(request: Request) {
    const pathnames = request.url.split("/");
    const length = pathnames.length;
    const pathname = pathnames[length - 1];
    const filepath = decodeBase64(pathname);
    const content = await fs.readFile(filepath, "utf8");
    return Response.json({ content: content });
}
