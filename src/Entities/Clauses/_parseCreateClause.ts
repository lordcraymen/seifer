import { CreateClause, GraphPattern } from "../../types";
import { ProtoClause } from "./_parseClauses";

const _findNodePatterns = (content: string): string[] => {
    const pattern = /\(([^)]+)\)/g;
    const matches = content.match(pattern);
    if (!matches) {
        throw new Error("Invalid CREATE clause");
    }
    return matches;
}

const _findRelationshipPatterns = (content: string): string[] => {
    


/*Example CreateClause for "CREATE (p:Person {age: 42})"
const createClause: CreateClause = {
  type: "CreateClause",
  content: "(p:Person { age: 42 })",
  graphPattern: {
    type: "GraphPattern",
    patternParts: [
      {
        elements: [
          {
            type: "NodePattern",
            variable: "p",
            labels: ["Person"],
            properties: {
              age: {
                type: "Literal",
                // Here we assume that Expression for literals includes a "value" property.
                value: 42,
              },
            },
          },
        ],
      },
    ],
  },
};
*/

/**
 * parses a CreateClause.
 *
 * @param clause The protoclause to process.
 * @returns The processed CREATE clause.
 */
const _parseCreateClause = (clause: ProtoClause):CreateClause => {
    const patternParts: GraphPattern = {
        type: "GraphPattern",
        patternParts: _findNodePatterns(clause.content).map((nodePattern) => ({
                        type: "NodePattern",
                        variable: nodePattern.split(":")[0].trim(),
                        labels: nodePattern.includes(":") ? nodePattern.split(":")[1].split("{")[0].trim().split(" ") : [],
                        properties: nodePattern.includes("{") ? JSON.parse(nodePattern.split("{")[1].split("}")[0]) : {},
        })),
        };

    };
    return {
        type: "CreateClause",
        content: clause.content,
        graphPattern: patternParts,
    };
}