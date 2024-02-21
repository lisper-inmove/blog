import { decodeBase64 } from "@/utils/encodes";
import { GrLinkTop } from "react-icons/gr";
import OrgParser from "@/utils/OrgParser";

interface PageProps {
  params: {
    post: string;
  };
}

export default async function Post({ params: { post } }: PageProps) {
  const relPath = decodeBase64(post);
  const parser = new OrgParser(relPath);
  const component = await parser.parse();
  return <div>{component}</div>;
}
