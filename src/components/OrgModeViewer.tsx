import { Dict } from "@/entities/Dict";
import { Headline } from "@/entities/PostChild";
import OrgModeParser from "@/utils/OrgModeParser";
import Content from "./Content";
import Nav from "./Nav";
import TableContentComponent from "./TableOfContent";

interface Props {
    content: Dict;
}
export default function OrgModeViewer({ content }: Props) {
    const parser = new OrgModeParser(content);
    parser.parse();

    function generatePrefixes(headlines: Headline[]): string[] {
        const result: string[] = [];
        let maxLevel = 0;
        for (const headline of headlines) {
            maxLevel = Math.max(maxLevel, headline.level);
        }
        const levelArray: number[] = new Array(maxLevel).fill(0);
        for (const headline of headlines) {
            levelArray[headline.level - 1] += 1;
            for (let i = headline.level; i < maxLevel; i++) {
                levelArray[i] = 0;
            }
            const prefix = levelArray.filter((num) => num !== 0).join(".");
            headline.prefix = prefix;
            result.push(prefix);
        }
        return result;
    }

    generatePrefixes(parser.tableContentHeadlines);

    return (
        <div className="w-full h-full">
            <div className="flex flex-col h-screen">
                <div>
                    <Nav title={parser.properties.title} />
                </div>
                <div className="flex flex-grow w-full mt-20">
                    <TableContentComponent
                        params={{
                            headlines: parser.tableContentHeadlines,
                        }}
                    ></TableContentComponent>
                    <div className="flex flex-col w-10/12 mx-auto mt-5 font-mono">
                        <div className="text-3xl text-blue-600 dark:text-orange-600 flex justify-end">
                            {parser.properties.subtitle}
                        </div>
                        <div className="text-xl text-blue-400 dark:text-orange-400 flex justify-end">
                            Last Modified at: {parser.properties.date}
                        </div>
                        <div>
                            <Content parser={parser} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
