import { CypherQuery, Clause } from "../../types";
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
  if (!ast.clauses || ast.clauses.length === 0) {
    throw new Error("Query must have at least one clause");
  }

  // Count how many clauses are RETURN clauses.
  if(ast.clauses.filter((clause) => clause.type === "ReturnClause").length > 1) {
    throw new Error("Multiple RETURN clauses found");
  }

  // If there's exactly one RETURN clause, it must be the last clause.
  if(ast.clauses.findIndex((clause) => clause.type === "ReturnClause") !== ast.clauses.length - 1) {
    throw new Error("RETURN clause must be the last clause");
  };

  return ast;
};

export { _validateCypherQuery };
