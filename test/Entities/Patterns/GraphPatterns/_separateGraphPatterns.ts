import { _separateGraphPatterns } from '../../../../src/Entities/Patterns/GraphPatterns/_parseGraphPatterns';

describe('_separateGraphPatterns', () => {
  it('should separate graph patterns by whitespace and commas', () => {
    const patternString = '(a:Person), (b:Person {name: "Alice", age: 42}) (a)-[:KNOWS]->(b)';
    const expected = ['(a:Person)', '(b:Person {name: "Alice", age: 42})', '(a)-[:KNOWS]->(b)'];
    expect(_separateGraphPatterns(patternString)).toStrictEqual(expected);
  });

  it('should return an empty array for an empty string', () => {
    expect(_separateGraphPatterns('')).toStrictEqual([]);
  });
});