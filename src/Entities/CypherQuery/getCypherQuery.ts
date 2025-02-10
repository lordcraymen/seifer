import { CypherQuery } from "../../types";
import { _validateCypherQuery } from "./_validateCypherQuery";
import { getClauses } from "../Clauses";

const getCypherQuery = (query: string): CypherQuery => {
  return _validateCypherQuery({
    type: "Query",
    clauses: getClauses(query),
  });
};

export { getCypherQuery };
