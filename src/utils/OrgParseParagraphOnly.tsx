import * as orga from "orga";

import { PostProperty } from "@/app/models/post";
import ParagraphComponentV2 from "@/components/org-modes/ParagraphComponentV2";
import {
  LineContentProps,
  generateRandomKey,
} from "@/components/org-modes/LineContentComponents";

export default class OrgParserParagraphOnly {
  private ast: any;
  private components: any[] = [];

  public async parse(content: string) {
    try {
      this.ast = orga.parse(content);
      this.start();
      return this.components;
    } catch (error) {
      console.error("Error reading or parsing OrgMode file:", error);
    }
    return <div>Error</div>;
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
    for (let child of obj.children) {
      if (child.type === "paragraph") {
        this.parseParagraph(child);
      }
    }
  }

  private createLineContentProps(p: any, prefix: string | null) {
    let result: LineContentProps = {
      type: "",
      style: "",
      value: "",
      prefix: prefix || "",
      link: "",
      textSize: "text-sm",
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

  private parseParagraph(obj: any) {
    this.components.push(
      <ParagraphComponentV2
        key={generateRandomKey("paragraphComponent")}
        params={{
          contents: Object.entries(obj.children).map((p: any) => {
            return this.createLineContentProps(p[1], null);
          }),
        }}
      ></ParagraphComponentV2>,
    );
  }
}
