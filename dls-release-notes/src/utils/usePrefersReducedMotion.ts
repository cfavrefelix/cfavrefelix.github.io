import { useMemo } from "react";

function usePrefersReducedMotion() {
    return useMemo(() => {
        const QUERY = '(prefers-reduced-motion: no-preference)';
        const mediaQueryList = window.matchMedia(QUERY);
        const prefersReducedMotion = !mediaQueryList.matches;
        return prefersReducedMotion;
    }, []);
}

export default usePrefersReducedMotion;