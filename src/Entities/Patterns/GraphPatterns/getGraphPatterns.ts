import { GraphPattern } from "../../../types";
import { _parseGraphPattern } from "./_parseGraphPatterns";
import { _validatePatternElements } from "./_validatePatternElements";

/**
 * Retrieves the Graph Patterns from the given clause content.
 *
 * This function parses the string that represents the body of a clause and
 * returns an array of GraphPattern objects. Each GraphPattern object contains
 * one or more PatternParts, which in turn consist of PatternElements (NodePattern
 * or RelationshipPattern). The parsing process involves validating the pattern
 * structure and ensuring that the sequence of elements is correct.
 *
 * @param clauseContent - The string content of the clause to be parsed.
 * @returns An array of GraphPattern objects.
 * @throws {Error} If the clauseContent is invalid.
 *
 * @example
 * const patterns = getGraphPatterns("(a:Person)-[:KNOWS]->(b:Person), (c:Person)(a:Person)-[:KNOWS]->(c:Person)");
 *
 * // Resulting AST:
 * // [
 * //   {
 * //     type: "GraphPattern",
 * //     patternParts: [
 * //       {
 * //         type: "PatternPart",
 * //         elements: [
 * //           {
 * //             type: "NodePattern",
 * //             variable: "a",
 * //             labels: ["Person"],
 * //             properties: {}
 * //           },
 * //           {
 * //             type: "RelationshipPattern",
 * //             variable: "",
 * //             types: ["KNOWS"],
 * //             properties: {},
 * //             direction: "left-to-right"
 * //           },
 * //           {
 * //             type: "NodePattern",
 * //             variable: "b",
 * //             labels: ["Person"],
 * //             properties: {}
 * //           }
 * //         ]
 * //       },
 * //       {
 * //         type: "PatternPart",
 * //         elements: [
 * //           {
 * //             type: "NodePattern",
 * //             variable: "c",
 * //             labels: ["Person"],
 * //             properties: {}
 * //           },
 * //           {
 * //             type: "NodePattern",
 * //             variable: "a",
 * //             labels: ["Person"],
 * //             properties: {}
 * //           },
 * //           {
 * //             type: "RelationshipPattern",
 * //             variable: "",
 * //             types: ["KNOWS"],
 * //             properties: {},
 * //             direction: "left-to-right"
 * //           },
 * //           {
 * //             type: "NodePattern",
 * //             variable: "c",
 * //             labels: ["Person"],
 * //             properties: {}
 * //           }
 * //         ]
 * //       }
 * //     ]
 * //   }
 * // ]
 */
const getGraphPatterns = (clauseContent: string): GraphPattern[] => {
  // Parse the clause content into an array of GraphPatterns.
  const graphPatterns = _parseGraphPattern(clauseContent);

  // Validate the pattern elements within each GraphPattern.
  graphPatterns.forEach((graphPattern) => {
    graphPattern.patternParts.forEach((patternPart) => {
      _validatePatternElements(patternPart.elements);
    });
  });

  return graphPatterns;
};

export { getGraphPatterns };