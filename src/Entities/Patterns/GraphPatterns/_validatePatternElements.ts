import { PatternElement } from "../../../types";

const _validatePatternElements = (elements: PatternElement[]): PatternElement[] => {
    //check if at least one PatternElement is present
    if (elements.length === 0) {
        throw new Error("Invalid pattern: at least one element expected.");
    }
    //check if the first element is a NodePattern
    if (elements[0].type !== "NodePattern") {
        throw new Error("Invalid pattern: first element must be a NodePattern.");
    }
    //check if the number of elements is odd
    if (elements.length % 2 === 0) {
        throw new Error("Invalid pattern: odd number of elements expected.");
    }

    return elements;
}

export { _validatePatternElements };