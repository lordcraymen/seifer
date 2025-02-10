import { CreateClause, GraphPattern } from "../../types";
import { ProtoClause } from "./_parseClauses";
import { getGraphPatterns } from "../Patterns/GraphPatterns/getGraphPatterns";

/**
 * parses a CreateClause.
 *
 * @param clause The protoclause to process.
 * @returns The processed CREATE clause.
 */
const _parseCreateClause = (clause: ProtoClause): CreateClause => {
    const patternParts: GraphPattern = {
        type: "GraphPattern",
        patternParts: [],
        };
    return {
        type: "CreateClause",
        content: clause.content,
        graphPattern: patternParts,
    };
}

export { _parseCreateClause };