import { getCypherQuery } from "./Entities/CypherQuery/getCypherQuery";
import { CypherQuery } from "./types";

const parse = (query: string): CypherQuery => getCypherQuery(query);
export { parse}