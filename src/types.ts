const COMMANDS = {
  MATCH: "MATCH",
  CREATE: "CREATE",
  DELETE: "DELETE",
  SET: "SET",
  REMOVE: "REMOVE",
  WITH: "WITH",
  MERGE: "MERGE",
  WHERE: "WHERE",
  RETURN: "RETURN",
  // add more COMMANDS as needed...
} as const;

interface ASTNode {
  type: string;
}

/**
 * Top-level AST for a Cypher query.
 */
interface CypherQuery extends ASTNode {
  type: "Query";
  clauses: Clause[];
}

interface Clause extends ASTNode {
  type: string;
  command: (typeof COMMANDS)[keyof typeof COMMANDS];
  // The text content of the clause.
  content: string;
}

/**
 * MATCH clause AST.
 *
 * In Cypher, the MATCH clause specifies the graph pattern to search for.
 */
interface MatchClause extends Clause {
  type: "MatchClause";
  command: typeof COMMANDS.MATCH;
  // The graph pattern that is matched.
  graphPattern: GraphPattern;
  // An optional WHERE predicate that further filters the matched pattern.
  wherePredicate?: Expression;
}

/**
 * CREATE clause AST.
 *
 * The CREATE clause specifies new graph elements to be created.
 */
interface CreateClause extends Clause {
  type: "CreateClause";
  command: typeof COMMANDS.CREATE;
  // The graph pattern that defines nodes and relationships to create.
  graphPattern: GraphPattern;
}

/**
 * RETURN clause AST.
 *
 * Specifies the projection of expressions (with optional aliases) to be returned.
 */
interface ReturnClause extends Clause {
  type: "ReturnClause";
  command: typeof COMMANDS.RETURN;
  // A list of projections. In Cypher, you can return expressions, properties, or computed values.
  projections: Projection[];
  // Optional modifier for distinct values.
  distinct?: boolean;
  // Optionally, an ORDER BY clause, as well as SKIP and LIMIT expressions.
  orderBy?: OrderByClause;
  skip?: Expression;
  limit?: Expression;
}

/**
 * WHERE clause AST.
 *
 * A standalone WHERE clause used for filtering.
 */
interface WhereClause extends Clause {
  type: "WhereClause";
  command: "WHERE";
  // The boolean expression used for filtering.
  predicate: Expression;
}

/**
 * Represents a graph pattern—a central construct in clauses like MATCH and CREATE.
 */
interface GraphPattern extends ASTNode {
  type: "GraphPattern";
  // The graph pattern is composed of one or more pattern parts.
  patternParts: PatternPart[];
}

/**
 * A pattern part is a contiguous segment of the graph pattern.
 * It is composed of alternating node and relationship patterns.
 */
interface PatternPart extends ASTNode {
  // The sequence of pattern elements (nodes and relationships).
  elements: PatternElement[];
}

/**
 * The union type for elements within a pattern.
 */
type PatternElement = NodePattern | RelationshipPattern;

/**
 * A node pattern describes a node, including an optional variable,
 * one or more labels, and an optional property map.
 */
interface NodePattern extends ASTNode {
  type: "NodePattern";
  // Optional variable name to reference the node.
  variable?: string;
  // List of labels (e.g. "Person", "City").
  labels?: string[];
  // Optional property map (using a normalized object).
  properties?: PropertyMap;
}

/**
 * A relationship pattern describes an edge between nodes.
 */
interface RelationshipPattern extends ASTNode {
  type: "RelationshipPattern";
  // Optional variable for the relationship.
  variable?: string;
  // One or more relationship types (e.g. "KNOWS").
  types?: string[];
  // Optional property map.
  properties?: PropertyMap;
  // The direction of the relationship.
  // “left-to-right” represents (a)-[r]->(b),
  // “right-to-left” represents (a)<-[r]-(b),
  // “undirected” represents (a)-[r]-(b).
  direction: "left-to-right" | "right-to-left" | "undirected";
}

/**
 * A property map is used to associate properties with nodes or relationships.
 */
interface PropertyMap {
  [propertyName: string]: Expression;
}

/**
 * A projection in a RETURN clause.
 */
interface Projection extends ASTNode {
  type: "Projection";
  // The expression to be projected.
  expression: Expression;
  // Optional alias (AS clause).
  alias?: string;
}

/**
 * ORDER BY clause used within RETURN to order results.
 */
interface OrderByClause extends ASTNode {
  type: "OrderByClause";
  command: "ORDER BY";
  // List of individual ordering items.
  orderItems: OrderItem[];
}

/**
 * A single ordering item.
 */
interface OrderItem extends ASTNode {
  type: "OrderItem";
  expression: Expression;
  // Either ascending (ASC) or descending (DESC).
  direction: "ASC" | "DESC";
}

/**
 * Base interface for expressions.
 *
 * This can be refined to include literal expressions, identifiers,
 * function calls, operator expressions, etc.
 */
interface Expression {
  // A discriminant for the type of expression.
  type:
    | "Literal"
    | "Identifier"
    | "FunctionCall"
    | "OperatorExpression"
    | string;
  // Additional properties would depend on the expression kind.
  // For example, a literal might have a `value` property.
}

export {
  COMMANDS,
  type CypherQuery,
  type Clause,
  type MatchClause,
  type CreateClause,
  type ReturnClause,
  type WhereClause,
  type GraphPattern,
  type PatternPart,
  type PatternElement,
  type NodePattern,
  type RelationshipPattern,
  type PropertyMap,
  type Projection,
  type OrderByClause,
  type OrderItem,
  type Expression,
};
