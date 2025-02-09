import { Clause } from "../../types";
import { _parseClauses, ProtoClause } from "./_parseClauses";

const getClauses = (query:string): Clause[] => {
    const protoClauses: ProtoClause[] = _parseClauses(query);
    return protoClauses.map((pc) => {
        return {
            type: `${pc.command}Clause`,
            command: pc.command,
            content: pc.content,
        };
    });
}

export { getClauses };