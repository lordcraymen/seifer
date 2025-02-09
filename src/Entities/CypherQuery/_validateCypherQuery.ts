import { CypherQuery } from "../../types";
/**
 * Validates the top-level AST of a Cypher query.
 *
 * Rules enforced:
 * - There can be at most one RETURN clause.
 * - If a RETURN clause is present, it must be the last clause.
 *
 * @param ast The parsed QueryAST.
 * @throws An error if any of the syntactic rules are violated.
 * @returns The input AST if it is valid.
 */
const _validateCypherQuery = (ast: CypherQuery): CypherQuery => {
  const clauses = ast.clauses;

  // Count how many clauses are RETURN clauses.
  const returnClauseCount = clauses.reduce((count, clause) => {
    // Check if the clause object has a key 'RETURN'
    return (
      count + (Object.prototype.hasOwnProperty.call(clause, "RETURN") ? 1 : 0)
    );
  }, 0);

  if (returnClauseCount > 1) {
    throw new Error("Multiple RETURN clauses found");
  }

  // If there's exactly one RETURN clause, it must be the last clause.
  if (returnClauseCount === 1) {
    const lastClause = clauses[clauses.length - 1];
    if (!("RETURN" in lastClause)) {
      throw new Error("RETURN clause must be the last clause");
    }
  }

  return ast;
};

export { _validateCypherQuery };
