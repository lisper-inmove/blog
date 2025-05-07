import { Dict } from "@/entities/Dict";
import { PostProperty } from "@/entities/Post";
import {
    Block,
    BlockElementType,
    BlockName,
    Child,
    ChildType,
    CodeElement,
    Headline,
    Post,
    Row,
    Section,
    SingleElement,
    Table,
} from "@/entities/PostChild";
import * as orga from "orga";

export default class OrgModeParser {
    private _content: Dict;
    private _properties: PostProperty;
    private _tableContentHeadlines: Headline[];

    private _post: Post;
    public get post(): Post {
        return this._post;
    }

    constructor(content: Dict) {
        this._post = new Post();
        this._content = content;
        this._tableContentHeadlines = [];
    }

    public parse() {
        const ast = orga.parse(this._content.content);
        this.readProperty(ast.properties as PostProperty);
        for (const child of ast.children) {
            const postChild: Child = this.parsePostChild(child);
            if (postChild) {
                this.post.children.push(postChild);
            }
        }
    }

    private parsePostChild(item: Dict): Child {
        console.log(item);
        let pchild: Child;
        if (item.type === ChildType.section) {
            pchild = this.parseSection(item);
        }
        return pchild;
    }

    private parseSection(item: Dict): Section {
        const section: Section = new Section(ChildType.section);
        let fileName = "";
        for (const child of item.children) {
            if (child.type === ChildType.headline) {
                section.headline = this.parseHeadline(child);
            } else if (child.type === ChildType.block) {
                this.parseBlock(section, child, fileName);
            } else if (child.type === ChildType.emptyLine) {
            } else if (child.type === ChildType.paragraph) {
                this.parseParagraph(section, child);
            } else if (child.type === ChildType.table) {
                this.parseTable(section, child);
            } else if (child.type === ChildType.section) {
                const subSection = this.parseSection(child);
                section.sections.push(subSection);
            } else if (child.type === ChildType.keyword) {
                if (child.key === "NAME") {
                    fileName = child.value;
                }
            } else if (child.type === ChildType.list) {
                this.parseList(section, child);
            }
        }
        return section;
    }

    private parseList(section: Section, item: Dict) {
        for (const child of item.children) {
            if (child.children != undefined) {
                if (child.type === "list") {
                    this.parseList(section, child);
                } else {
                    const block: Block = new Block(ChildType.block);
                    block.name = BlockName.verse;
                    this.parseBlockChild(section, block, child);
                    section.blocks.push(block);
                }
            }
        }
    }

    private parseParagraph(section: Section, item: Dict) {
        const block: Block = new Block(ChildType.block);
        block.name = BlockName.verse;
        this.parseBlockChild(section, block, item);
        section.blocks.push(block);
    }

    private parseHeadline(item: Dict): Headline {
        const headline: Headline = new Headline(ChildType.headline);
        for (const child of item.children) {
            if (child.type === ChildType.stars) {
                headline.level = child.level;
                headline.indent = `indent-${(headline.level - 1) * 4}`;
            } else if (child.type == ChildType.text) {
                headline.value = child.value;
            }
        }
        this._tableContentHeadlines.push(headline);
        return headline;
    }

    private parseTable(section: Section, item: Dict) {
        const table: Table = new Table(ChildType.table);
        for (const child of item.children) {
            if (child.type === "table.row") {
                const row: Row = new Row();
                let columnNumber = 0;
                for (const cell of child.children) {
                    console.log(cell);
                    if (cell.type === "table.columnSeparator") {
                    } else if (cell.type === "table.cell") {
                        for (const _cell of cell.children) {
                            const __cell: SingleElement = new SingleElement(
                                _cell.type
                            );
                            __cell.value = _cell.value;
                            __cell.style = _cell.style || "";
                            __cell.columnNumber = columnNumber;
                            __cell.start = {
                                ...child.position.start,
                            };
                            __cell.end = {
                                ...child.position.end,
                            };
                            row.cells.push(__cell);
                        }
                    }
                    columnNumber += 1;
                }
                table.rows.push(row);
            }
        }
        section.blocks.push(table);
    }

    private parseBlock(section: Section, item: Dict, fileName: string) {
        const block: Block = new Block(ChildType.block);
        block.name = item.name;
        if (item.name === BlockName.verse) {
            this.parseBlockChild(section, block, item);
        } else if (item.name === BlockName.quote) {
            this.parseQuote(block, item);
        } else if (item.name === BlockName.image) {
            this.parseImage(block, item);
        } else if (item.name === BlockName.src) {
            const codeElement: CodeElement = new CodeElement(
                BlockElementType.src
            );
            codeElement.value = item.value;
            codeElement.language = item.params[0];
            codeElement.fileName = fileName;
            if (item.attributes.attr_formula != undefined) {
                codeElement.isFormula = true;
            }
            codeElement.start = {
                ...item.position.start,
            };
            codeElement.end = {
                ...item.position.end,
            };
            block.elements.push(codeElement);
        }
        section.blocks.push(block);
    }

    private parseQuote(block: Block, item: Dict) {
        for (const child of item.children) {
            const singleElement: SingleElement = new SingleElement("quote");
            if (singleElement.type === "newline") {
                continue;
            }
            singleElement.value = child.value || "";
            singleElement.name = child.name || "";
            singleElement.style = child.style || "";
            singleElement.prefix = "";
            singleElement.textSize = "";
            singleElement.start = {
                ...child.position.start,
            };
            singleElement.end = {
                ...child.position.end,
            };
            block.elements.push(singleElement);
        }
    }

    private parseImage(block: Block, item: Dict) {
        const singleElement: SingleElement = new SingleElement(BlockName.image);
        singleElement.value = item.value || "";
        singleElement.name = item.name || "";
        singleElement.style = item.style || "";
        singleElement.prefix = "";
        singleElement.textSize = "";
        singleElement.start = {
            ...item.position.start,
        };
        singleElement.end = {
            ...item.position.end,
        };
        block.elements.push(singleElement);
    }

    private parseBlockChild(section: Section, block: Block, item: Dict) {
        for (const child of item.children) {
            const singleElement: SingleElement = new SingleElement(
                child.type || "text"
            );
            if (singleElement.type === "newline") {
                singleElement.type = ChildType.emptyLine;
            }
            singleElement.value = child.value || "";
            singleElement.name = child.name || "";
            singleElement.style = child.style || "";
            this.calculateBulletSnAndIndent(section, child, singleElement);
            if (singleElement.type === "link") {
                this.extractLinkInfo(singleElement, child);
            }
            singleElement.prefix = "";
            singleElement.textSize = "";
            singleElement.start = {
                ...child.position.start,
            };
            singleElement.end = {
                ...child.position.end,
            };
            block.elements.push(singleElement);
        }
    }

    private extractLinkInfo(singleElement: SingleElement, item: Dict) {
        for (const child of item.children) {
            if (child.type === "link.path") {
                singleElement.link = child.value;
            } else if (child.type === "text") {
                singleElement.value = child.value;
            }
        }
    }

    private calculateBulletSnAndIndent(
        section: Section,
        item: Dict,
        singleElement: SingleElement
    ) {
        if (singleElement.type === BlockElementType.listItemBullet) {
            const index = Math.trunc((item.indent + 3) / 4);
            const indent = " ".repeat(item.indent);
            singleElement.value = `${indent}${section.itemBulletSn[index]}. `;
            section.itemBulletSn[index]++;
            for (let i = index + 1; i < 8; i++) {
                section.itemBulletSn[i] = 1;
            }
        }
    }

    private readProperty(properties: PostProperty) {
        this._properties = { ...properties };
    }

    public get properties(): PostProperty {
        return this._properties;
    }

    public get tableContentHeadlines(): Headline[] {
        return this._tableContentHeadlines;
    }

    public get content() {
        return this._content;
    }
}
