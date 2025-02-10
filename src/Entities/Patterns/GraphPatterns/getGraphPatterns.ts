import { GraphPattern } from "../../../types";
import { _parsePatternParts } from "./_parseGraphPatterns";

const getGraphPatterns = (clauseContent: string): GraphPattern[] => 
{
    const patternParts: GraphPattern = {
        type: "GraphPattern",
        patternParts: _parsePatternParts(clauseContent)
        };
    return [patternParts];
}

export { getGraphPatterns };