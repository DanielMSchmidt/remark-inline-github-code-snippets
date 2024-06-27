import { describe, it, expect } from "vitest";
import dedent from "dedent";
import { process } from "./util/process";

const source = dedent`
  # The Main Heading

  [inline](https://github.com/hashicorp/terraform/blob/main/internal/promising/promise.go#L30-L41)
  [ignore](https://github.com/hashicorp/terraform/blob/main/internal/promising/promise.go#L30-L41)
  ## Ignored because it's not a github url
  [inline](https://example.com)
  ## Permalinks
  [inline](https://github.com/hashicorp/terraform/blob/27f26bd1b5c015b20c878f74a74aab1cb76795f8/internal/promising/promise.go#L30-L41)
`;

describe("remark-inline-github-code-snippets", () => {
  // ******************************************
  it("with no options", async () => {
    const result = await process(source, {});
    expect(result.toString()).toMatchInlineSnapshot(`
      "
      <h1>The Main Heading</h1>
      <p>
        <pre><code class="language-javascript">console.log('Hello, World!');
      </code></pre><a href="https://github.com/hashicorp/terraform/blob/main/internal/promising/promise.go#L30-L41">ignore</a>
      </p>
      <h2>Ignored because it's not a github url</h2>
      <p><a href="https://example.com">inline</a></p>
      <h2>Permalinks</h2>
      <p>
        <pre><code class="language-javascript">console.log('Hello, World!');
      </code></pre>
      </p>
      "
    `);
  });
});
