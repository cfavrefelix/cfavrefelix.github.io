import { keyframes } from "styled-components";

export const flashFocusState = keyframes`
0% {
    outline-color: var(--colorSemanticFocus500);
}
66% {
    outline-color: var(--colorSemanticFocus500);
}
100% {
    outline-color: var(--colorsSemanticFocusTransparent);
}
`;