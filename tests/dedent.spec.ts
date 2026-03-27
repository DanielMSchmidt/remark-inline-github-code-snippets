import { describe, it, expect } from "vitest";
import { dedentLines } from "../src/index";

describe("dedentLines", () => {
  it("removes common leading spaces", () => {
    const lines = ["    foo", "    bar", "      baz"];
    expect(dedentLines(lines)).toBe("foo\nbar\n  baz");
  });

  it("removes common leading tabs", () => {
    const lines = ["\t\tfoo", "\t\tbar", "\t\t\tbaz"];
    expect(dedentLines(lines)).toBe("foo\nbar\n\tbaz");
  });

  it("preserves relative indentation", () => {
    const lines = ["    type Foo struct {", "    \tval any", "    \terr error", "    }"];
    expect(dedentLines(lines)).toBe("type Foo struct {\n\tval any\n\terr error\n}");
  });

  it("does nothing when there is no common indentation", () => {
    const lines = ["foo", "  bar", "    baz"];
    expect(dedentLines(lines)).toBe("foo\n  bar\n    baz");
  });

  it("ignores empty lines when calculating common indentation", () => {
    const lines = ["    foo", "", "    bar"];
    expect(dedentLines(lines)).toBe("foo\n\nbar");
  });

  it("handles lines that are only whitespace", () => {
    const lines = ["    foo", "  ", "    bar"];
    expect(dedentLines(lines)).toBe("foo\n\nbar");
  });

  it("handles all empty lines", () => {
    const lines = ["", "", ""];
    expect(dedentLines(lines)).toBe("\n\n");
  });

  it("handles a single indented line", () => {
    const lines = ["    hello"];
    expect(dedentLines(lines)).toBe("hello");
  });

  it("handles mixed indentation levels correctly", () => {
    const lines = ["  a", "    b", "      c"];
    expect(dedentLines(lines)).toBe("a\n  b\n    c");
  });
});
