import * as orga from "orga";

import { PostHeadline, PostProperty } from "@/app/models/post";
import TitleComponent from "@/components/org-modes/TitleComponent";
import HeadlineComponent from "@/components/org-modes/HeadlineComponent";
import ParagraphComponent from "@/components/org-modes/ParagraphComponent";
import {
  LineContentProps,
  generateRandomKey,
} from "@/components/org-modes/LineContentComponents";
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
import BodyComponent from "@/components/org-modes/BodyComponent";
import LinkComponent from "@/components/org-modes/LinkComponent";
import ImageComponent from "@/components/org-modes/ImageComponent";
import IframeComponent from "@/components/org-modes/IframeComponent";
import ListComponent from "@/components/org-modes/ListComponent";

export default class OrgParser {
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

  public async parse(content: string) {
    try {
      this.ast = orga.parse(content);
      this.readProperty();
      this.start();
      this.components.unshift(
        <TableContentComponent
          key={generateRandomKey("tableContentComponent")}
          params={{ headlines: this.headlines }}
        ></TableContentComponent>,
      );
      return (
        <div>
          <BodyComponent
            params={{ components: this.components }}
          ></BodyComponent>
        </div>
      );
    } catch (error) {
      console.error("Error reading or parsing OrgMode file:", error);
    }
    return <div>Error</div>;
  }

  private start() {
    for (let children of this.ast.children) {
      // First Level
      if (children.type == "section") {
        this.parseSection(children, "");
      }
    }
  }

  private isImage(obj: any): boolean {
    if (obj.type != "link") {
      return false;
    }
    if (
      obj.attributes &&
      obj.attributes.attr_html &&
      obj.attributes.attr_html.image === "t"
    ) {
      return true;
    }
    return false;
  }

  private isPrevResults(obj: any): boolean {
    if (obj.type === "keyword" && obj.key && obj.key === "RESULTS") {
      return true;
    }
    return false;
  }

  private setPrevType(obj: any): string {
    if (this.isPrevResults(obj)) {
      return "results";
    }
    return "";
  }

  private parseSection(obj: any, prevType: string) {
    for (let child of obj.children) {
      if (child.type === "headline") {
        this.parseHeadline(child);
      } else if (child.type === "paragraph") {
        this.parseParagraph(child, prevType === "results");
      } else if (child.type === "section") {
        this.parseSection(child, prevType);
      } else if (child.type === "list") {
        let contents: LineContentProps[] = [];
        this.parseList(child, contents);
        this.components.push(
          <ListComponent
            key={generateRandomKey("listComponent")}
            params={{
              items: contents,
            }}
          />,
        );
      } else if (child.type == "emptyLine") {
        // this.components.push(EmptyLine());
      } else if (child.type == "link") {
        if (this.isImage(child)) {
          this.parseImage(child);
        } else {
          this.parseLink(child);
        }
      } else if (child.type === "block") {
        if (child.name == "verse") {
          // begin_verse
          this.parseVerse(child);
        } else if (child.name == "example") {
          // begin_example
          this.parseExample(child);
        } else if (child.name == "center") {
          // begin_center
          this.parseCenter(child);
        } else if (child.name == "src") {
          // begin_src
          this.parseCode(child);
        } else if (child.name == "quote") {
          // begin_quote
          this.parseQuote(child);
        } else if (child.name == "iframe") {
          this.parseIframe(child);
        }
      } else if (child.type === "table") {
        this.parseTable(child);
      }
      prevType = this.setPrevType(child);
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
    let name = "";
    if (obj.attributes && obj.attributes.name) {
      name = obj.attributes.name;
    }
    this.components.push(
      <CodeParser
        key={generateRandomKey("code-section")}
        line={obj.value}
        language={language}
        name={name}
      ></CodeParser>,
    );
  }

  private parseLink(obj: any) {
    let lineContentProps = this.createLineContentProps(obj, null);
    this.components.push(
      <LinkComponent
        {...lineContentProps}
        key={generateRandomKey("linkComponent")}
      ></LinkComponent>,
    );
  }

  private parseImage(obj: any) {
    let lineContentProps = this.createLineContentProps(obj, null);
    this.components.push(
      <ImageComponent
        params={{
          url: lineContentProps.link,
          alt: lineContentProps.value,
          attributes: obj.attributes,
        }}
        key={generateRandomKey("imageComponent")}
      ></ImageComponent>,
    );
  }

  private createLineContentProps(p: any, prefix: string | null) {
    let result: LineContentProps = {
      type: "",
      style: "",
      value: "",
      prefix: prefix || "",
      link: "",
      textSize: "",
    };
    if (p.type === "newline") {
      result.type = "newline";
      result.style = "newline";
      result.value = "newline";
    } else if (p.type === "text" && p.style == null) {
      result.type = "text";
      result.style = "text";
      result.value = p.value;
    } else if (p.type === "link") {
      result.type = "link";
      result.style = "link";
      this.fillLineContentPropsInsideChildren(p, result);
    } else if (p.type == "block" && p.name == "iframe") {
      result.type = "iframe";
      result.style = "iframe";
      this.fillLineContentPropsInsideChildren(p, result);
    } else {
      result.type = p.type;
      result.style = p.style || "";
      result.value = p.value || "";
    }
    return result;
  }

  private fillLineContentPropsInsideChildren(p: any, result: LineContentProps) {
    for (let c of p.children) {
      if (c.type === "link.path") {
        result.link = c.value;
      } else if (c.type === "text") {
        result.value = c.value;
      }
    }
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

  private parseIframe(obj: any) {
    let content = this.createLineContentProps(obj, null);
    content.type = "iframe";
    this.components.push(
      <IframeComponent
        params={{
          link: content.link,
          attributes: obj.attributes,
        }}
        key={generateRandomKey("parseIframe")}
      ></IframeComponent>,
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
            pp.type = "quote";

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

  private parseList(obj: any, contents: LineContentProps[] = []) {
    let index = 1;
    Object.entries(obj.children).flatMap((o: any) => {
      let item = o[1];
      if (item.type === "list.item") {
        let indent = 0;
        let flag = false;
        Object.entries(item.children).map(([_, subItem]: any) => {
          if (subItem.type === "list.item.bullet") {
            indent = subItem.indent;
          } else if (subItem.type === "newline") {
            contents.push(
              this.createLineContentProps({ type: "newline" }, null),
            );
          } else if (subItem.type === "text") {
            let prefix = `${" ".repeat(indent)}${index}. `;
            if (flag) {
              prefix = `${" ".repeat(indent)}`;
            }
            contents.push(this.createLineContentProps(subItem, prefix));
            flag = true;
          }
        });
        index++;
      } else if (item.type === "list") {
        this.parseList(item, contents);
      }
    });
  }

  private parseParagraph(obj: any, isResults: boolean) {
    this.components.push(
      <ParagraphComponent
        key={generateRandomKey("paragraphComponent")}
        params={{
          contents: Object.entries(obj.children).map((p: any) => {
            return this.createLineContentProps(p[1], null);
          }),
          isResults: isResults,
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
