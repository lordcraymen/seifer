import { _separateGraphPatterns } from '../../../../src/Entities/Patterns/GraphPatterns/_parseGraphPatterns';

describe('_separateGraphPatterns', () => {
  it('should separate graph patterns separated by optional whitespace or commas', () => {
    const patternString = '(a:Person), (b:Person {name: "Alice", age: 42}) (a)-[:KNOWS]->(b)(c:Person)';
    const expected = ['(a:Person)', '(b:Person {name: "Alice", age: 42})', '(a)-[:KNOWS]->(b)', '(c:Person)'];
    expect(_separateGraphPatterns(patternString)).toStrictEqual(expected);
  });

  it('should not separate graph patterns separated by commas inside (nested) property maps', () => {
    const patternString = '(a:Person {name: "Alice, Bob", age: 42, address: {city: "Amsterdam, NL"}})(c:Person)';
    const expected = ['(a:Person {name: "Alice, Bob", age: 42, address: {city: "Amsterdam, NL"}})', '(c:Person)'];
    expect(_separateGraphPatterns(patternString)).toStrictEqual(expected);
  });

  it('should return an empty array for an empty string', () => {
    expect(_separateGraphPatterns('')).toStrictEqual([]);
  });
});