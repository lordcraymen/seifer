import {
  GraphPattern,
  PatternPart,
  PatternElement,
  NodePattern,
  RelationshipPattern,
} from "../../../types";

/**
 * Splits the graph pattern inside the body of a single caluse into individual pattern parts.
 * Pattern parts are separated by whitespace and optional commas, but but commas inside propertymaps are ignored.
 * @param clauseContent The content of the graph pattern.
 * @returns An array of pattern parts.
 * @example
 * _splitPatternParts("(a:Person), (b:Person {name: 'Alice', age: 42}) (a)-[:KNOWS]->(b)(c:Person)")
 * // Returns ["(a:Person)", "(b:Person {name: 'Alice', age: 42})", "(a)-[:KNOWS]->(b)", "(c:Person)"]
 */
const _separateGraphPatterns = (patternString: string): string[] =>
    patternString.split(/(?<=\))\s*,?\s*(?=\()/).filter(Boolean);
  
  

// Parses a single pattern part into an array of PatternElements (Nodes and Relationships).
const _parsePatternElements = (partString: string): PatternElement[] => {
  return [];
};

// factory funtions for node patterns
const _parseNodePattern = (element: PatternElement): NodePattern => {
  return {
    type: "NodePattern",
  };
};

// factory function for relationship patterns
const _parseRelationshipPattern = (
  element: PatternElement
): RelationshipPattern => {
  return {
    type: "RelationshipPattern",
    direction: "left-to-right",
  };
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
  _parseNodePattern,
  _parseRelationshipPattern,
};
