import { getPropertyMap } from "../../src/Entities/PropertyMap";

describe("getPropertyMap", () => {
  it("should parse a property map string with sloppy quotes ", () => {
    const pm = `{
        a: 1,
        b: 'two',
        c: true,
        d: { e: 'f' },
        g: \`h\`
      }`;
    const expected = {
      a: 1,
      b: "two",
      c: true,
      d: { e: "f" },
      g: "h",
    };
    expect(getPropertyMap(pm)).toStrictEqual(expected);
  });

  it("should normalize an object string with nested objects and arrays", () => {
    const pm = `{
        a: 1,
        b: 'two',
        c: true,
        d: { e: 'f' },
        g: \`h\`,
        i: [1,true,false,"test",'test']
      }`;
    const expected = {
      a: 1,
      b: "two",
      c: true,
      d: { e: "f" },
      g: "h",
      i: [1, true, false, "test", "test"],
    };
    expect(getPropertyMap(pm)).toStrictEqual(expected);
  });
  it("Should work with keys and values in foreign languages", () => {
    const pm = `{
        a: 1,
        b: 'two',
        c: true,
        d: { e: 'f' },
        g: \`h\`,
        i: [1,true,false,'日本語','русский'],
        日本語: '日本語',
        русский: 'русский',
        \`中文\`: '中文'
      }`;
    const expected = {
        "a": 1,
        "b": "two",
        "c": true,
        "d": { "e": "f" },
        "g": "h",
        "i": [1,true,false,"日本語","русский"],
        "日本語": "日本語",
        "русский": "русский",
        "中文": "中文"
      };
    expect(getPropertyMap(pm)).toStrictEqual(expected);
  });
  it("Should work for deeply nested objects with keys and values", () => {
    const pm = `{
        a: 1,
        b: 'two',
        c: true,
        d: { e: 'f', g: { h: 'i', j: 'k' } },
        l: { m: { n: 'o' } }
      }`;
    const expected = {
        "a": 1,
        "b": "two",
        "c": true,
        "d": { "e": "f", "g": { "h": "i", "j": "k" } },
        "l": { "m": { "n": "o" } }
      };
    expect(getPropertyMap(pm)).toStrictEqual(expected);
  });
  it("should work with deeply nested arrays with mixed and partially misqoted values", () => {
    const pm = `{
        a: 1,
        b: 'two',
        c: true,
        d: { e: 'f', g: { h: 'i', j: 'k' } },
        l: { m: { n: 'o' } },
        p: [1, 'two', true, false, 'five', \`six\`, 'seven', 'eight', "nine", 'ten', { value: 'eleven' }, 'twelve']
      }`;
    const expected = {
        "a": 1,
        "b": "two",
        "c": true,
        "d": { "e": "f", "g": { "h": "i", "j": "k" } },
        "l": { "m": { "n": "o" } },
        "p": [1, "two", true, false, "five", "six", "seven", "eight", "nine", "ten", {"value": "eleven"}, "twelve"]
      };
    expect(getPropertyMap(pm)).toStrictEqual(expected);
  });
  it("should replace unqotes values that are not valid JSON with 'reference' objects", () => {
    const pm = `{
        a: 1,
        b: 'two',
        c: true,
        d: a.name,
        e: b
      }`;
    const expected = {
        "a":1,
        "b":"two",
        "c":true,
        "d":{"reference":{"object":"a","property":"name"}},
        "e":{"reference":"b"}
        };
    expect(getPropertyMap(pm)).toStrictEqual(expected);
  });
});
