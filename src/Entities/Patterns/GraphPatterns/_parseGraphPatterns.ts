import {
  GraphPattern,
  PatternPart,
  PatternElement,
  NodePattern,
  RelationshipPattern,
} from "../../../types";

// Parses the entire graph pattern content into a GraphPattern object.
const _parseGraphPattern = (clauseContent: string): GraphPattern => ({
  type: "GraphPattern",
  patternParts: _parsePatternParts(clauseContent),
});

// Splits the input content into individual PatternParts.
const _parsePatternParts = (patternString: string): PatternPart[] => 
  // split by comma and optional whitespace
patternString.split(/,(?=(?:[^"']*["'][^"']*["'])*[^"']*$)/).map((partString) => ({
    type: "PatternPart",
    elements: _parsePatternElements(partString),
  }));

// Parses a single pattern part into an array of PatternElements (Nodes and Relationships).
const _parsePatternElements = (partString: string): PatternElement[] => {
  return [];
}

// factory funtions for node patterns
const _parseNodePattern = (element: PatternElement): NodePattern => {
  return {
    type: "NodePattern",
  };
}

// factory function for relationship patterns
const _parseRelationshipPattern = (element: PatternElement): RelationshipPattern =>{
  return {
    type: "RelationshipPattern",
    direction: "left-to-right",
  }
}

export { _parseGraphPattern, _parsePatternParts, _parsePatternElements, _parseNodePattern, _parseRelationshipPattern };
