export const specialStart = "<<!!";
export const specialEnd = "!!>>";

export const BoldFlag = "B";

export const boldStart = specialStart + BoldFlag + specialEnd;
export const boldEnd = specialStart + BoldFlag + specialEnd;

export type Position = {
    line: number;
    column: number;
    offset: number;
};

export enum BlockName {
    verse = "verse",
    src = "src",
    quote = "quote",
    image = "image",
}

export enum BlockType {
    blockBegin = "block.begin",
    blockEnd = "block.end",
    text = "text",
    emptyLine = "emptyLine",
}

export class Post {
    private _title: string;
    public get title(): string {
        return this._title;
    }
    public set title(v: string) {
        this._title = v;
    }

    private _subTitle: string;
    public get subTitle(): string {
        return this._subTitle;
    }
    public set subTitle(v: string) {
        this._subTitle = v;
    }

    private _createAt: string;
    public get createAt(): string {
        return this._createAt;
    }
    public set createAt(v: string) {
        this._createAt = v;
    }

    private _children: Child[];
    public get children(): Child[] {
        return this._children;
    }

    constructor() {
        this._children = [];
    }
}

export enum ChildType {
    keyword = "keyword",
    emptyLine = "emptyLine",
    section = "section",
    headline = "headline",
    block = "block",
    paragraph = "paragraph",
    stars = "stars",
    text = "text",
    table = "table",
    list = "list",
}

export class Child {
    private _type: string;
    public get type(): string {
        return this._type;
    }

    constructor(type: string) {
        this._type = type;
    }
}

export class Headline extends Child {
    constructor(type: string) {
        super(type);
        this._tags = [];
    }

    private _level: number;
    public get level(): number {
        return this._level;
    }
    public set level(v: number) {
        this._level = v;
    }

    private _value: string;
    public get value(): string {
        return this._value;
    }
    public set value(v: string) {
        this._value = v;
    }

    private _prefix: string;
    public get prefix(): string {
        return this._prefix;
    }
    public set prefix(v: string) {
        this._prefix = v;
    }

    private _tags: string[];
    public get tags(): string[] {
        return this._tags;
    }

    private _indent: string;
    public get indent(): string {
        return this._indent;
    }
    public set indent(v: string) {
        this._indent = v;
    }
}

export class Section extends Child {
    private _headline: Headline;
    public get headline(): Headline {
        return this._headline;
    }
    public set headline(v: Headline) {
        this._headline = v;
    }

    private _blocks: Child[];
    public get blocks(): Child[] {
        return this._blocks;
    }
    constructor(type: string) {
        super(type);
        this._blocks = [];
        this._sections = [];
        // 8 levels is enough
        this._itemBulletSn = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    }

    private _sections: Section[];
    public get sections(): Section[] {
        return this._sections;
    }

    private _itemBulletSn: number[];
    public get itemBulletSn(): number[] {
        return this._itemBulletSn;
    }
}

export class EmptyLine extends Child {}

export class Keyword extends Child {}

export class Block extends Child {
    constructor(type: string) {
        super(type);
        this._elements = [];
    }
    private _elements: BlockElement[];
    public get elements(): BlockElement[] {
        return this._elements;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }
}

export enum BlockElementType {
    src = "src",
    verse = "verse",
    table = "table",
    listItemBullet = "list.item.bullet",
}

export class BlockElement {
    constructor(type: string) {
        this._type = type;
    }
    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(v: string) {
        this._type = v;
    }

    private _start: Position;
    public get start(): Position {
        return this._start;
    }
    public set start(v: Position) {
        this._start = v;
    }

    private _end: Position;
    public get end(): Position {
        return this._end;
    }
    public set end(v: Position) {
        this._end = v;
    }
}

export class CodeElement extends BlockElement {
    constructor(type: string) {
        super(type);
        this._isFormula = false;
        this._isAxis = false;
        this._attr_params = "";
    }

    private _value: string;
    public get value(): string {
        return this._value;
    }
    public set value(v: string) {
        this._value = v;
    }
    private _language: string;
    public get language(): string {
        return this._language;
    }
    public set language(v: string) {
        this._language = v;
    }

    private _fileName: string;
    public get fileName(): string {
        return this._fileName;
    }
    public set fileName(v: string) {
        this._fileName = v;
    }

    private _isFormula: boolean;
    public get isFormula(): boolean {
        return this._isFormula;
    }
    public set isFormula(v: boolean) {
        this._isFormula = v;
    }

    private _isAxis: boolean;
    public get isAxis(): boolean {
        return this._isAxis;
    }
    public set isAxis(v: boolean) {
        this._isAxis = v;
    }

    private _attr_params: string;
    public get attr_params(): string {
        return this._attr_params;
    }
    public set attr_params(v: string) {
        this._attr_params = v;
    }
}

export class SingleElement extends BlockElement {
    constructor(type: string) {
        super(type);
    }

    private _style: string;
    public get style(): string {
        return this._style;
    }
    public set style(v: string) {
        this._style = v;
    }

    private _value: string;
    public get value(): string {
        return this._value;
    }
    public set value(v: string) {
        this._value = v;
    }

    private _prefix: string;
    public get prefix(): string {
        return this._prefix;
    }
    public set prefix(v: string) {
        this._prefix = v;
    }

    private _link: string;
    public get link(): string {
        return this._link;
    }
    public set link(v: string) {
        this._link = v;
    }

    private _textSize: string;
    public get textSize(): string {
        return this._textSize;
    }
    public set textSize(v: string) {
        this._textSize = v;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

    private _columnNumber: number;
    public get columnNumber(): number {
        return this._columnNumber;
    }
    public set columnNumber(v: number) {
        this._columnNumber = v;
    }
}

export class Row {
    constructor() {
        this._cells = [];
    }
    private _cells: SingleElement[];
    public get cells(): SingleElement[] {
        return this._cells;
    }
}

export class Table extends Child {
    constructor(type: string) {
        super(type);
        this._rows = [];
    }

    private _rows: Row[];
    public get rows(): Row[] {
        return this._rows;
    }
    public set rows(v: Row[]) {
        this._rows = v;
    }
}
