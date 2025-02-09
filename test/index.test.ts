import { parse } from '../src';

describe('parse-Funktion', () => {
  it('should parse a simple query with a MATCH and a RETURN clause', () => {
    const input = "MATCH (n) RETURN n";
    const expectedAST = {
      type: 'Query',
      clauses: [
        { type: 'MatchClause', pattern: '(n)' },
        { type: 'ReturnClause', items: ['n'] }
      ]
    };

    const result = parse(input);
    expect(result).toEqual(expectedAST);
  });

  it('should parse multiple clauses correctly', () => {
    const input = "MATCH (n) WHERE n.age > 30 RETURN n";
    const expectedAST = {
      type: 'Query',
      clauses: [
        { type: 'MatchClause', pattern: '(n)' },
        { type: 'WhereClause', condition: 'n.age > 30' },
        { type: 'ReturnClause', items: ['n'] }
      ]
    };

    const result = parse(input);
    expect(result).toEqual(expectedAST);
  });

  it('should parse queries without RETURN clause', () => {
    const input = "MATCH (n)";
    const expectedAST = {
      type: 'Query',
      clauses: [
        { type: 'MatchClause', pattern: '(n)' }
      ]
    };

    const result = parse(input);
    expect(result).toEqual(expectedAST);
  });

  it('should throw an error for an empty clause', () => {
    expect(() => parse("")).toThrow("Empty query");
  });

  it('should throw an error for multiple RETURN clauses', () => {
    expect(() => parse("MATCH (n) RETURN n RETURN n")).toThrow("Multiple RETURN clauses");
  });
  it('should throw an error for RETURN clause without items', () => {
    expect(() => parse("MATCH (n) RETURN")).toThrow("RETURN clause without items");
  });

  it('should throw an error if the RETURN clause is not the last clause', () => {
    expect(() => parse("MATCH (n) RETURN n WHERE n.age > 30")).toThrow("RETURN clause not last");
  });
});
