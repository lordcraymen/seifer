import { Clause } from "../../types";
import { _parseClauses, ProtoClause } from "./_parseClauses";

const toNormalCase = (str: string): string => {
    //make the words formatted line proper nouns with capital letter at the beginning
    return str.toLowerCase().split(' ').map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

const getClauses = (query:string): Clause[] => {
    const protoClauses: ProtoClause[] = _parseClauses(query);
    return protoClauses.map((pc) => {
        return {
            type: `${toNormalCase(pc.command)}Clause`,
            content: pc.content,
        };
    });
}

export { getClauses };