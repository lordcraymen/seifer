import { _parsePatternElements } from "../../../../src/Entities/Patterns/GraphPatterns/_parseGraphPatterns";

describe("_parsePatternElements", () => {
  it("returns an empty array for an empty string", () => {
    const result = _parsePatternElements("");
    expect(result).toEqual([]);
  });

  it("parses a single node pattern", () => {
    const result = _parsePatternElements("(a:Person { age:42 })");
    expect(result).toEqual([
      { type: "NodePattern", rawParameters: "a:Person { age:42 }" },
    ]);
  });

  it("parses a simple left-to-right relationship pattern", () => {
    const result = _parsePatternElements("(a)-[:KNOWS]->(b)");
    expect(result).toEqual([
      { type: "NodePattern", rawParameters: "a" },
      {
        type: "RelationshipPattern",
        direction: "left-to-right",
        rawParameters: ":KNOWS",
      },
      { type: "NodePattern", rawParameters: "b" },
    ]);
  });

  it("parses a simple right-to-left relationship pattern", () => {
    const result = _parsePatternElements("(a)<-[:KNOWS]-(b)");
    expect(result).toEqual([
      { type: "NodePattern", rawParameters: "a" },
      {
        type: "RelationshipPattern",
        direction: "right-to-left",
        rawParameters: ":KNOWS",
      },
      { type: "NodePattern", rawParameters: "b" },
    ]);
  });

  it("parses an undirected relationship pattern", () => {
    const result = _parsePatternElements("(a)-[:KNOWS]-(b)");
    expect(result).toEqual([
      { type: "NodePattern", rawParameters: "a" },
      {
        type: "RelationshipPattern",
        direction: "undirected",
        rawParameters: ":KNOWS",
      },
      { type: "NodePattern", rawParameters: "b" },
    ]);
  });

  it("parses multiple node labels and property maps", () => {
    const result = _parsePatternElements(
      "(a:Person:Developer)-[:KNOWS { since: 2020 }]->(b { name:'Bob' })"
    );
    expect(result).toEqual([
      { type: "NodePattern", rawParameters: "a:Person:Developer" },
      {
        type: "RelationshipPattern",
        direction: "left-to-right",
        rawParameters: ":KNOWS { since: 2020 }",
      },
      { type: "NodePattern", rawParameters: "b { name:'Bob' }" },
    ]);
  });

  it("handles spacing variations in pattern", () => {
    const result = _parsePatternElements(
      "( a ) - [ :LIKES { reason: 'fun' } ] -> (  b:User )"
    );
    expect(result).toEqual([
      { type: "NodePattern", rawParameters: "a" },
      {
        type: "RelationshipPattern",
        direction: "left-to-right",
        rawParameters: ":LIKES { reason: 'fun' }",
      },
      { type: "NodePattern", rawParameters: "b:User" },
    ]);
  });

  it("parses multiple relationship segments in sequence", () => {
    const result = _parsePatternElements("(a)-[:R1]->(b)<-[:R2]-(c)");
    expect(result).toEqual([
      { type: "NodePattern", rawParameters: "a" },
      {
        type: "RelationshipPattern",
        direction: "left-to-right",
        rawParameters: ":R1",
      },
      { type: "NodePattern", rawParameters: "b" },
      {
        type: "RelationshipPattern",
        direction: "right-to-left",
        rawParameters: ":R2",
      },
      { type: "NodePattern", rawParameters: "c" },
    ]);
  });
});
