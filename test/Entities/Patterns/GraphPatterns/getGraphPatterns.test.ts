import { getGraphPatterns } from '../../../../src/Entities/Patterns/GraphPatterns';

describe('getGraphPatterns', () => {
    it('should return the correct AST', () => {
        const patterns = getGraphPatterns("(a:Person)(b:Car), (c:Workplace)");
        const expectedPatterns = [
            {
                type: "GraphPattern",
                patternParts: [
                    {
                        type: "PatternPart",
                        elements: [
                            {
                                type: "NodePattern",
                                variable: "a",
                                labels: ["Person"],
                                properties: {}
                            }
                        ]
                    },
                    {
                        type: "PatternPart",
                        elements: [
                            {
                                type: "NodePattern",
                                variable: "b",
                                labels: ["Car"],
                                properties: {}
                            }
                        ]
                    },
                    {
                        type: "PatternPart",
                        elements: [
                            {
                                type: "NodePattern",
                                variable: "c",
                                labels: ["Workplace"],
                                properties: {}
                            }
                        ]
                    }
                ]
            }
        ];
        expect(patterns).toEqual(expectedPatterns);
    });
});