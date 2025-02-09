import { _validateCypherQuery } from "../../../src/Entities/CypherQuery/_validateCypherQuery";
import { CypherQuery } from "../../../src/types";

describe("_validateQuery", () => {
  it("should validate a query with a single RETURN clause", () => {
    const query:CypherQuery = {
      type: "Query",
      clauses: [
        { type: "MatchClause", content: "" },
        { type: "ReturnClause", content: "" },
      ],
    };
    expect(() => _validateCypherQuery(query)).toEqual(query);
  });

  it("should validate a query with no RETURN clause", () => {
    const query: CypherQuery = {
      type: "Query",
      clauses: [{ type: "MatchClause", content: "" }],
    }
    expect(() => _validateCypherQuery(query)).toEqual(query);
  });

  it("should throw an error for a query with multiple RETURN clauses", () => {
    const query: CypherQuery = {
      type: "Query",
      clauses: [ 
        { type: "MatchClause", content: "" },
        { type: "ReturnClause", content: "" },
        { type: "ReturnClause",  content: "" },
      ],
    };
    expect(() => _validateCypherQuery(query)).toThrow(
      "Multiple RETURN clauses found"
    );
  });

  it("should throw an error for a query with a RETURN clause that is not the last clause", () => {
    const query: CypherQuery = {
      type: "Query",
      clauses: [
        { type: "MatchClause", content: "" },
        { type: "ReturnClause", content: "" },
        { type: "MatchClause", content: "" },
      ],
    };
    expect(() => _validateCypherQuery(query)).toThrow(
      "RETURN clause must be the last clause"
    );
  });
});
