import {
    Block,
    BlockElementType,
    BlockName,
    ChildType,
    CodeElement,
    Section,
    SingleElement,
    Table,
} from "@/entities/PostChild";
import OrgModeParser from "@/utils/OrgModeParser";
import { Box } from "@mui/material";
import React from "react";
import CodeComponent from "./OrgMode/CodeComponent";
import HeadlineComponent from "./OrgMode/HeadlineComponent";
import { EmptyLine, LineComponent } from "./OrgMode/LineContentComponents";
import TableComponent from "./OrgMode/TableComponent";

interface Props {
    parser: OrgModeParser;
}

export default function Content({ parser }: Props): React.ReactNode {
    let components: React.ReactNode[] = [];
    function generateHeadlineComponents(section: Section) {
        components.push(
            <HeadlineComponent
                key={`${section.headline.prefix}`}
                headline={section.headline}
            ></HeadlineComponent>
        );
        for (const block of section.blocks) {
            if (block.type === ChildType.block) {
                const _block: Block = block as Block;
                if (_block.name === BlockElementType.src) {
                    generateCodeComponents(_block.elements as CodeElement[]);
                } else if (_block.name === BlockName.verse) {
                    generateSingleComponents(
                        _block.elements as SingleElement[]
                    );
                }
            } else if (block.type === ChildType.table) {
                const _table: Table = block as Table;
                generateTableComponents(_table);
            }
        }
        for (const subSection of section.sections) {
            generateHeadlineComponents(subSection);
        }
    }

    function generateTableComponents(table: Table) {
        components.push(TableComponent(table));
    }

    function generateCodeComponents(elements: CodeElement[]) {
        for (let ele of elements) {
            const language = ele.language;
            components.push(
                <CodeComponent
                    key={`codeElement-${ele.start.line}-${ele.end.line}`}
                    line={ele.value}
                    language={language}
                    name={ele.fileName}
                ></CodeComponent>
            );
        }
    }

    function generateSingleComponents(elements: SingleElement[]) {
        let prevEle: SingleElement | null = null;
        let _components: React.ReactNode[] = [];
        let start: number = -1;
        let end: number = -1;
        if (elements.length > 0) {
            start = elements[0].start.line;
            end = elements[elements.length - 1].end.line;
        }
        for (let ele of elements) {
            if (prevEle != null && prevEle.start.line < ele.start.line) {
                _components.push(EmptyLine());
            }
            _components.push(LineComponent(ele));
            prevEle = ele;
        }
        components.push(
            <Box key={`singleElement-${start}-${end}`}>{_components}</Box>
        );
    }

    for (const child of parser.post.children) {
        if (child.type == ChildType.section) {
            const section: Section = child as Section;
            generateHeadlineComponents(section);
        }
    }
    return <div>{components}</div>;
}
