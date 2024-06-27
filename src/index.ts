import { type Plugin } from "unified";
import { type Root } from "mdast";
import { visit } from "unist-util-visit";

// eslint-disable-next-line
export type Options = {
  inlineMarker?: string;
};
const DEFAULT_SETTINGS: Options = {
  inlineMarker: "inline",
};

const RemarkInlineGithubCodeSnippet: Plugin<[Options?], Root> = (
  options: Options | undefined,
) => {
  const settings = Object.assign({}, DEFAULT_SETTINGS, options);

  return (tree) => {
    visit(tree, (node, index, parent) => {
      // Search for links
      if (node.type === "link") {
        if (
          node.children[0].type === "text" &&
          node.children[0].value === settings.inlineMarker &&
          node.url.startsWith("https://github.com")
        ) {
          // Replace the link with a code snippet
          parent!.children[index!] = {
            type: "code",
            lang: "javascript", // TODO: get from URL
            value: "console.log('Hello, World!');", // TODO: load from URL
          };
        }
      }
    });
  };
};

export default RemarkInlineGithubCodeSnippet;
