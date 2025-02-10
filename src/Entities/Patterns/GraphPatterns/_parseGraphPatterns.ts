import {
  GraphPattern,
  PatternPart,
} from "../../../types";

/**
 * Splits the graph pattern inside the body of a single clause into individual pattern parts.
 * Pattern parts are separated by whitespace and optional commas, but but commas inside propertymaps are ignored.
 * @param clauseContent The content of the graph pattern.
 * @returns An array of pattern parts.
 * @example
 * _splitPatternParts("(a:Person), (b:Person {name: 'Alice', age: 42}) (a)-[:KNOWS]->(b)(c:Person)")
 * // Returns ["(a:Person)", "(b:Person {name: 'Alice', age: 42})", "(a)-[:KNOWS]->(b)", "(c:Person)"]
 */
const _separateGraphPatterns = (patternString: string): string[] =>
  patternString.split(/(?<=\))\s*,?\s*(?=\()/).filter(Boolean);

type RawPatternElement =
  | {
      type: "NodePattern";
      rawParameters: string;
    }
  | {
      type: "RelationshipPattern";
      direction: "left-to-right" | "right-to-left" | "undirected";
      rawParameters: string;
    };

/**
 * Parses a single(!) pattern part into an array of PatternElements (Nodes and Relationships).
 * @param partString The string representation of the pattern part.
 * @returns An array of PatternElements.
 * @example
 * _parsePatternElements("(a:Person { age:42 })"
 * // Returns [{ type: "NodePattern", rawParameters: "a:Person { age:42 }" }]
 * @example
 * _parsePatternElements("(a)-[:KNOWS]->(b)"
 * // Returns [
 *  { type: "NodePattern", rawParameters: "a" },
 *  { type: "RelationshipPattern", direction: "left-to-right", rawParameters: ":KNOWS" }
 *  { type: "NodePattern", rawParameters: "b" }
 * ]
 * */
const _parsePatternElements = (patternString: string): RawPatternElement[] => {
  const rawPatternElements: RawPatternElement[] = [];
  // The regex now allows for optional whitespace between tokens:
  // 1. Node: ( ... )
  // 2. Left-to-right relationship: - [ ... ] ->
  // 3. Right-to-left relationship: <- [ ... ] -
  // 4. Undirected relationship: - [ ... ] -
  const regex =
    /\(\s*([^)]*?)\s*\)|-\s*\[\s*([^\]]*?)\s*\]\s*->|<-\s*\[\s*([^\]]*?)\s*\]\s*-|-\s*\[\s*([^\]]*?)\s*\]\s*-/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(patternString)) !== null) {
    if (match[1] !== undefined) {
      // Matched a node pattern
      rawPatternElements.push({ type: "NodePattern", rawParameters: match[1] });
    } else if (match[2] !== undefined) {
      // Matched a left-to-right relationship pattern
      rawPatternElements.push({
        type: "RelationshipPattern",
        direction: "left-to-right",
        rawParameters: match[2],
      });
    } else if (match[3] !== undefined) {
      // Matched a right-to-left relationship pattern
      rawPatternElements.push({
        type: "RelationshipPattern",
        direction: "right-to-left",
        rawParameters: match[3],
      });
    } else if (match[4] !== undefined) {
      // Matched an undirected relationship pattern
      rawPatternElements.push({
        type: "RelationshipPattern",
        direction: "undirected",
        rawParameters: match[4],
      });
    }
  }
  return rawPatternElements;
};

// Parses the entire graph pattern content into a GraphPattern object.
const _parseGraphPattern = (clauseContent: string): GraphPattern => ({
  type: "GraphPattern",
  patternParts: _separateGraphPatterns(clauseContent).map((part) => ({
    type: "PatternPart",
    elements: _parsePatternElements(part),
  })) as PatternPart[],
});

export {
  _parseGraphPattern,
  _separateGraphPatterns,
  _parsePatternElements,
};
