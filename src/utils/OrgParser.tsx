import * as orga from "orga";
import * as fs from "fs/promises";

import { PostHeadline, PostProperty } from "@/app/models/post";
import TitleComponent from "@/components/org-modes/TitleComponent";
import HeadlineComponent from "@/components/org-modes/HeadlineComponent";
import ParagraphComponent from "@/components/org-modes/ParagraphComponent";
import {
  LineContentProps,
  generateRandomKey,
} from "@/components/org-modes/LineContentComponents";
import ListComponent, {
  ListItemComponentProps,
} from "@/components/org-modes/ListComponent";
import QuoteComponent from "@/components/org-modes/QuoteComponent";
import CenterComponent from "@/components/org-modes/CenterComponent";
import ExampleComponent from "@/components/org-modes/ExampleComponent";
import VerseComponent from "@/components/org-modes/VerseComponent";
import CodeParser from "@/components/org-modes/CodeComponent";
import TableComponent, {
  TableCell,
  TableRow,
} from "@/components/org-modes/TableComponent";
import TableContentComponent from "@/components/TableContentComponent";
import { Box } from "@mui/material";
import BodyComponent from "@/components/org-modes/BodyComponent";

export default class OrgParser {
  private filePath: string;
  private ast: any;
  private headlines: PostHeadline[] = [];
  private property: PostProperty = {
    title: "",
    subtitle: "",
    createDate: new Date(),
    updateDate: new Date(),
    category: "",
    keywords: "",
  };
  private components: any[] = [];

  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public async parse() {
    try {
      // 读取 OrgMode 文件内容
      // const content = await fs.readFile(this.filePath, "utf-8");
      // 使用 orga 解析内容
      // this.ast = orga.parse(content);
      // this.readProperty();
      // this.start();
      // this.components.unshift(
      //   <TableContentComponent
      //     key={generateRandomKey("tableContentComponent")}
      //     params={{ headlines: this.headlines }}
      //   ></TableContentComponent>,
      // );

      // return (
      //   <div>
      //     <BodyComponent
      //       params={{ components: this.components }}
      //     ></BodyComponent>
      //   </div>
      // );
      return <div>Hello</div>;
    } catch (error) {
      console.error("Error reading or parsing OrgMode file:", error);
    }
    return <Box>Error</Box>;
  }

  private start() {
    for (let children of this.ast.children) {
      // First Level
      if (children.type == "section") {
        this.parseSection(children);
      }
    }
  }

  private parseSection(obj: any) {
    let section: any[] = [];
    for (let child of obj.children) {
      // console.log(">>>>>>>>", child);
      if (child.type === "headline") {
        this.parseHeadline(child);
      } else if (child.type === "paragraph") {
        // this.parseParagraph(child);
      } else if (child.type === "section") {
        // this.parseSection(child);
      } else if (child.type === "list") {
        // this.parseList(child);
      } else if (child.type == "emptyLine") {
        // this.components.push(EmptyLine());
      } else if (child.type === "block") {
        if (child.name == "verse") {
          // begin_verse
          // this.parseVerse(child);
        } else if (child.name == "example") {
          // begin_example
          // this.parseExample(child);
        } else if (child.name == "center") {
          // begin_center
          // this.parseCenter(child);
        } else if (child.name == "src") {
          // begin_src
          // this.parseCode(child);
        } else if (child.name == "quote") {
          // begin_quote
          // this.parseQuote(child);
        }
      } else if (child.type === "table") {
        // this.parseTable(child);
      }
    }
  }

  private parseTable(obj: any) {
    let rows: TableRow[] = [];
    for (let child of obj.children) {
      let row: TableCell[] = [];
      if (child.children != null) {
        for (let c of child.children) {
          if (c.type === "table.columnSeparator") {
            continue;
          }
          row.push({
            value: Object.entries(c.children).flatMap((p: any) => {
              let results: LineContentProps[] = [];
              results.push(this.createLineContentProps(p[1], null));
              return results;
            }),
          });
        }
      }
      if (row.length > 0) {
        rows.push({ cells: row });
      }
    }
    this.components.push(
      <TableComponent
        key={generateRandomKey("table")}
        params={{
          rows: rows,
        }}
      ></TableComponent>,
    );
  }

  private parseCode(obj: any) {
    let language = obj.params[0];
    this.components.push(
      <CodeParser
        key={generateRandomKey("code-section")}
        line={obj.value}
        language={language}
      ></CodeParser>,
    );
  }

  private createLineContentProps(p: any, prefix: string | null) {
    let result: LineContentProps = { type: "", style: "", value: "" };
    if (p.type === "newline") {
      result.type = "newline";
      result.style = "newline";
      result.value = "newline";
    } else if (p.type === "text" && p.style == null) {
      result.type = "text";
      result.style = "text";
      if (prefix == null) {
        result.value = p.value;
      } else {
        result.value = `${prefix}${p.value}`;
      }
    } else {
      result.type = p.type;
      result.style = p.style || "";
      result.value = p.value || "";
    }
    return result;
  }

  private parseVerse(obj: any) {
    let prePp: any | null = null;
    this.components.push(
      <VerseComponent
        key={generateRandomKey("verse")}
        params={{
          contents: Object.entries(obj.children).flatMap((p: any) => {
            let pp = p[1];
            let results: LineContentProps[] = [];
            if (
              prePp != null &&
              prePp.position.end.line < pp.position.start.line
            ) {
              results.push(
                this.createLineContentProps({ type: "newline" }, null),
              );
            }
            results.push(this.createLineContentProps(p[1], null));
            prePp = pp;
            return results;
          }),
        }}
      ></VerseComponent>,
    );
  }

  private parseExample(obj: any) {
    let prePp: any | null = null;
    this.components.push(
      <ExampleComponent
        key={generateRandomKey("example")}
        params={{
          contents: Object.entries(obj.children).flatMap((p: any) => {
            let pp = p[1];
            let results: LineContentProps[] = [];
            if (
              prePp != null &&
              prePp.position.end.line < pp.position.start.line
            ) {
              results.push(
                this.createLineContentProps({ type: "newline" }, null),
              );
            }
            results.push(this.createLineContentProps(p[1], null));
            prePp = pp;
            return results;
          }),
        }}
      ></ExampleComponent>,
    );
  }

  private parseCenter(obj: any) {
    let prePp: any | null = null;
    this.components.push(
      <CenterComponent
        key={generateRandomKey("center")}
        params={{
          contents: Object.entries(obj.children).flatMap((p: any) => {
            let pp = p[1];
            let results: LineContentProps[] = [];
            if (
              prePp != null &&
              prePp.position.end.line < pp.position.start.line
            ) {
              results.push(
                this.createLineContentProps({ type: "newline" }, null),
              );
            }
            results.push(this.createLineContentProps(p[1], null));
            prePp = pp;
            return results;
          }),
        }}
      ></CenterComponent>,
    );
  }

  private parseQuote(obj: any) {
    let prePp: any | null = null;
    this.components.push(
      <QuoteComponent
        key={generateRandomKey("quote")}
        params={{
          contents: Object.entries(obj.children).flatMap((p: any) => {
            let pp = p[1];
            let results: LineContentProps[] = [];
            if (
              prePp != null &&
              prePp.position.end.line < pp.position.start.line
            ) {
              results.push(
                this.createLineContentProps({ type: "newline" }, null),
              );
              results.push(this.createLineContentProps(p[1], ">> "));
            } else {
              results.push(this.createLineContentProps(p[1], null));
            }
            prePp = pp;
            return results;
          }),
        }}
      ></QuoteComponent>,
    );
  }

  private parseList(obj: any) {
    let index = 1;
    this.components.push(
      <ListComponent
        key={generateRandomKey("listComponent")}
        params={{
          items: Object.entries(obj.children).flatMap((o: any) => {
            let oo = o[1];
            let items: ListItemComponentProps[] = [];
            if (oo.type === "newline") {
              // let contents: LineContentProps[] = [];
              // contents.push({
              //   type: "newline",
              //   style: "newline",
              //   value: "newline",
              // });
              // items.push({ contents: contents });
            } else {
              let contents: LineContentProps[] = [];
              let addIndex = false;
              Object.entries(oo.children).map((p: any) => {
                let pp = p[1];
                if (addIndex) {
                  contents.push(this.createLineContentProps(p[1], null));
                } else {
                  contents.push(
                    this.createLineContentProps(p[1], `${index}. `),
                  );
                  if (pp.type == "text" && pp.style == null) {
                    addIndex = true;
                  }
                }
              });
              items.push({ contents: contents });
              if (addIndex) {
                index++;
              }
            }
            return items;
          }),
        }}
      ></ListComponent>,
    );
  }

  private parseParagraph(obj: any) {
    this.components.push(
      <ParagraphComponent
        key={generateRandomKey("paragraphComponent")}
        params={{
          contents: Object.entries(obj.children).map((p: any) => {
            return this.createLineContentProps(p[1], null);
          }),
        }}
      ></ParagraphComponent>,
    );
  }

  private parseHeadline(obj: any) {
    let headline = {
      name: "",
      level: obj.level,
      tags: obj.tags || [],
      prefix: "",
    };
    for (let child of obj.children) {
      if (child.type == "text") {
        headline.name = child.value;
      }
    }
    this.setHeadlinePrefix(headline);
    this.headlines.push(headline);
    this.components.push(
      <HeadlineComponent
        key={`${headline.name}-${headline.level}`}
        params={{
          headline: headline,
        }}
      ></HeadlineComponent>,
    );
  }

  private readProperty() {
    this.property.title = this.ast.properties.title;
    this.property.subtitle = this.ast.properties.subtitle;
    this.property.category = this.ast.properties.category;
    this.property.createDate = this.ast.properties.date;
    this.property.keywords = this.ast.properties.keywords;

    this.components.push(
      <TitleComponent
        key={this.property.title}
        params={{
          title: this.property.title,
          subtitle: this.property.subtitle,
          keywords: this.property.keywords,
          date: this.property.createDate.toString(),
        }}
      ></TitleComponent>,
    );
  }

  private setHeadlinePrefix(headline: PostHeadline) {
    let lastBrother: PostHeadline | null = null;
    let parent: PostHeadline | null = null;

    // find parent
    for (let i: number = this.headlines.length - 1; i >= 0; i--) {
      let h = this.headlines[i];
      if (h.level < headline.level) {
        parent = h;
        break;
      }
    }

    // find last brother
    for (let i: number = this.headlines.length - 1; i >= 0; i--) {
      let h = this.headlines[i];
      if (parent != null && h === parent) {
        break;
      }
      if (h.level == headline.level) {
        lastBrother = h;
      }
      if (lastBrother != null) {
        break;
      }
    }

    if (lastBrother == null && parent == null) {
      headline.prefix = "1";
    } else {
      if (lastBrother == null) {
        headline.prefix = [parent?.prefix, "1"].join(".");
      } else {
        let prefix = lastBrother.prefix.split(".");
        let lastPrefix = prefix[prefix.length - 1];
        let newPrefix = (parseInt(lastPrefix) + 1).toString();
        if (prefix.length > 1) {
          let butLastPrefix = prefix.slice(0, -1);
          headline.prefix = [butLastPrefix, newPrefix].join(".");
        } else {
          headline.prefix = newPrefix;
        }
      }
    }
  }
}
