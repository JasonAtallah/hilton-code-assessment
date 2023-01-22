import { title, titleOrEmptyStr, uppercaseOrEmptyStr } from "./text-transform";

const STRING = "hEllo world";

describe("uppercaseOrEmptyStr", () => {
  test("It returns string in all uppercase", () => {
    expect(uppercaseOrEmptyStr(STRING)).toEqual("HELLO WORLD");
  });

  const cases = ["", 1, 1.1, null, undefined, true, false, {}, []];
  test.each(cases)("It returns an empty string for %s", (value) => {
    // All of these values shouuld be caught at build time or by a linter since the fn expects a string
    // I'm ignoring ts here because I never underestimate my ability to write bugs
    // @ts-ignore
    expect(uppercaseOrEmptyStr(value)).toBe("");
  });
});

describe("title", () => {
  test("It returns string in title case", () => {
    expect(title(STRING)).toEqual("Hello World");
  });
});

describe("titleOrEmptyString", () => {
  test("It returns string in title case", () => {
    expect(titleOrEmptyStr(STRING)).toEqual("Hello World");
  });

  const cases = ["", 1, 1.1, null, undefined, true, false, {}, []];
  test.each(cases)("It returns an empty string for %s", (value) => {
    // @ts-ignore
    expect(titleOrEmptyStr(value)).toBe("");
  });
});
