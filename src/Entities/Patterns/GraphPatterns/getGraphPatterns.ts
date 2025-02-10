import { GraphPattern } from "../../../types";

const getGraphPatterns = (clauseContent: string): GraphPattern[] => {
  const patternParts: GraphPattern = {
    type: "GraphPattern",
    patternParts: [],
  };
  return [patternParts];
};

export { getGraphPatterns };
