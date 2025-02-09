import { COMMANDS, Clause } from "../../types";

type ProtoClause = { command: keyof typeof COMMANDS; content: string };

/**
 * Splits a complete Cypher query into top-level clauses.
 *
 * The function scans the input for recognized command keywords (currently MATCH, CREATE, RETURN)
 * and uses the full text from one command to the next as the clause’s value.
 *
 * For example:
 *   "CREATE (a:Person) (b:Person) CREATE (a)-[:KNOWS]->(b) RETURN a,b"
 *
 * Produces:
 *
 *    [
 *         { CREATE: "(a:Person) (b:Person)" },
 *         { CREATE: "(a)-[:KNOWS]->(b)" },
 *         { RETURN: "a,b" }
 *    ]
 *
 * @param query The raw Cypher query string.
 * @returns An array of protoclauses, each containing a command keyword and the clause text.
 */
const _splitClauses = (query: string): ProtoClause[] => {
    // Trim the input to remove any leading/trailing whitespace.
    const trimmedQuery = query.trim();
  
    // Find all occurrences of command keywords.
    const matches: { keyword: keyof typeof COMMANDS; index: number }[] = [];
    let match;
    const clauseRegex = new RegExp(`\\b(${Object.values(COMMANDS).join('|')})\\b`, 'gi');
    while ((match = clauseRegex.exec(trimmedQuery)) !== null) {
      // Normalize the found keyword to uppercase.
      const keyword = match[1].toUpperCase() as keyof typeof COMMANDS;
      matches.push({ keyword, index: match.index });
    }
  
    // Use the positions of the command keywords to split the query into clauses.
    const clauses: ProtoClause[] = [];
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i];
      // The clause extends from the end of the current keyword until the start of the next keyword (or end of the string).
      const start = current.index;
      const end = i + 1 < matches.length ? matches[i + 1].index : trimmedQuery.length;
      // Extract the clause content (i.e. text following the command keyword) and trim it.
      const clauseContent = trimmedQuery.substring(start + current.keyword.length, end).trim();
      clauses.push({ command: current.keyword, content: clauseContent });
    }
  
    return clauses;
  };

  const _parseClauses = (query: string): ProtoClause[] => {
    return _splitClauses(query);
  }

  export { _parseClauses, _splitClauses, type ProtoClause };