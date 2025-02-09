import { CypherQuery } from "../../types";
import { _validateCypherQuery } from "./_validateQuery";
import { getClauses } from "../Clauses";

const getCypherQuery = (query: string): CypherQuery => {
  if (query.trim() === "") return { type: "Query", clauses: [] };
  return _validateCypherQuery({
    type: "Query",
    clauses: getClauses(query),
  });
};

export { getCypherQuery };
