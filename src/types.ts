/**
 * Top-level AST for a Cypher query.
 */
interface CypherQuery {
    // A Cypher query is composed of one or more clauses.
    clauses: QueryClause[];
  }
  
  /**
   * The union of all supported query clause types.
   */
  type QueryClause =
    | MatchClause
    | CreateClause
    | ReturnClause
    | WhereClause
    // … additional clauses like WITH, MERGE, DELETE, SET, REMOVE, etc.
    ;
  
  /**
   * MATCH clause AST.
   *
   * In Cypher, the MATCH clause specifies the graph pattern to search for.
   */
  interface MatchClause {
    clauseType: "MATCH";
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
  interface CreateClause {
    clauseType: "CREATE";
    // The graph pattern that defines nodes and relationships to create.
    graphPattern: GraphPattern;
  }
  
  /**
   * RETURN clause AST.
   *
   * Specifies the projection of expressions (with optional aliases) to be returned.
   */
  interface ReturnClause {
    clauseType: "RETURN";
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
  interface WhereClause {
    clauseType: "WHERE";
    // The boolean expression used for filtering.
    predicate: Expression;
  }
  
  /**
   * Represents a graph pattern—a central construct in clauses like MATCH and CREATE.
   */
  interface GraphPattern {
    // The graph pattern is composed of one or more pattern parts.
    patternParts: PatternPart[];
  }
  
  /**
   * A pattern part is a contiguous segment of the graph pattern.
   * It is composed of alternating node and relationship patterns.
   */
  interface PatternPart {
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
  interface NodePattern {
    elementType: "NodePattern";
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
  interface RelationshipPattern {
    elementType: "RelationshipPattern";
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
  interface Projection {
    // The expression to be projected.
    expression: Expression;
    // Optional alias (AS clause).
    alias?: string;
  }
  
  /**
   * ORDER BY clause used within RETURN to order results.
   */
  interface OrderByClause {
    // List of individual ordering items.
    orderItems: OrderItem[];
  }
  
  /**
   * A single ordering item.
   */
  interface OrderItem {
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
    expressionType: "Literal" | "Identifier" | "FunctionCall" | "OperatorExpression" | string;
    // Additional properties would depend on the expression kind.
    // For example, a literal might have a `value` property.
  }

  export { type CypherQuery, type QueryClause, type MatchClause, type CreateClause, type ReturnClause, type WhereClause, type GraphPattern, type PatternPart, type PatternElement, type NodePattern, type RelationshipPattern, type PropertyMap, type Projection, type OrderByClause, type OrderItem, type Expression };
  