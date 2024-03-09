import OrgParser from "@/utils/OrgParser";
import { getPostContent } from "@/app/api/post/[post]/getPostContent";

interface PageProps {
  params: {
    post: string;
  };
}

export default async function Post({ params: { post } }: PageProps) {
  const data = await getPostContent(post);
  let orgParser: OrgParser = new OrgParser();
  const component = await orgParser.parse(data.content);
  return <div>{component}</div>;
}
