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
    Section,
    SingleElement,
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
            } else if (child.type === ChildType.section) {
                const subSection = this.parseSection(child);
                section.sections.push(subSection);
            } else if (child.type === ChildType.keyword) {
                if (child.key === "NAME") {
                    fileName = child.value;
                }
            }
        }
        return section;
    }

    private parseHeadline(item: Dict): Headline {
        const headline: Headline = new Headline(ChildType.headline);
        for (const child of item.children) {
            if (child.type === ChildType.stars) {
                headline.level = child.level;
            } else if (child.type == ChildType.text) {
                headline.value = child.value;
            }
        }
        this._tableContentHeadlines.push(headline);
        return headline;
    }

    private parseBlock(section: Section, item: Dict, fileName: string) {
        const block: Block = new Block(ChildType.block);
        block.name = item.name;
        if (item.name === BlockName.verse) {
            this.parseBlockChild(block, item);
        } else if (item.name === BlockName.src) {
            let codeElement: CodeElement = new CodeElement(
                BlockElementType.src
            );
            codeElement.value = item.value;
            codeElement.language = item.params[0];
            codeElement.fileName = fileName;
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

    private parseBlockChild(block: Block, item: Dict) {
        for (const child of item.children) {
            let singleElement: SingleElement = new SingleElement(child.type);
            singleElement.type = child.type || "text";
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
