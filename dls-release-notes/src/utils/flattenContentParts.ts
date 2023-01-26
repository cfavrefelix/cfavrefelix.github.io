import { ReleaseNotePart } from "../models";

function flattenContentParts(parts: ReleaseNotePart[]): ReleaseNotePart[] {
    const output: ReleaseNotePart[] = [];
    parts.forEach((part) => {
        if (part.content_parts && part.content_parts.length > 0) {
            const descendants = flattenContentParts(part.content_parts);
            const flatPart = {
                ...part
            };
            delete flatPart.content_parts;
            output.push(flatPart);
            output.push(...descendants);
        } else {
            output.push(part);
        }
    });
    return output;
}

export default flattenContentParts;