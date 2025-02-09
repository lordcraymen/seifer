import { CypherQuery } from './types';
import { validateCypherQuery } from './validatiors/validateQuery';
import { getClauses } from './parsers/parseClauses';

const parse = (query: string): CypherQuery => {
  if (query === "") return { "type": "Query", "clauses": [] };
  return validateCypherQuery({
    type: "Query",
    clauses: getClauses(query),
  });
};

export { parse}