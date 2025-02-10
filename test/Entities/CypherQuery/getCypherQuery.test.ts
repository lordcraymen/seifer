import { getCypherQuery } from "../../../src/Entities/CypherQuery";

describe('getCypherQuery', () => {
  it('should return a query with a single RETURN clause', () => {
    const query = getCypherQuery("MATCH (n) RETURN n");
    expect(query).toEqual({
      type: 'Query',
      clauses: [
        { type: 'MatchClause', content: '(n)' },
        { type: 'ReturnClause', content: 'n' },
      ],
    });
  });

  it('should return a query with no RETURN clause', () => {
    const query = getCypherQuery('MATCH (n)');
    expect(query).toEqual({
      type: 'Query',
      clauses: [{ type: 'MatchClause', content: '(n)' }],
    });
  });

  it('should throw an error for a query with no clauses', () => {
    expect(() => getCypherQuery("")).toThrow('Query must have at least one clause');
  });

  it('should throw an error for a query with multiple RETURN clauses', () => {
    expect(() =>
      getCypherQuery("MATCH (n) RETURN n MATCH (m) RETURN m")
    ).toThrow('Multiple RETURN clauses found');
  });

  it('should throw an error for a query with a RETURN clause that is not the last clause', () => {
    expect(() =>
      getCypherQuery("MATCH (n) RETURN n MATCH (m)")
    ).toThrow('RETURN clause must be the last clause');
  });
});