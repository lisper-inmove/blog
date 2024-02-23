import { getPostContentByName } from "@/app/api/post/getPostContentByName";
import OrgParserParagraphOnly from "@/utils/OrgParseParagraphOnly";

export default async function SelfIntro() {
  const data = await getPostContentByName("self-intro.org");
  let orgParser: OrgParserParagraphOnly = new OrgParserParagraphOnly();
  const component = await orgParser.parse(data.content);
  return <div>{component}</div>;
}
