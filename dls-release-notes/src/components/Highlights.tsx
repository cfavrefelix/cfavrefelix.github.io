import { FunctionComponent, useContext, useMemo, useCallback } from "react";
import {
    List,
    ListItem
} from "carbon-react/lib/components/typography";
import Link from 'carbon-react/lib/components/link';
import { ReleaseContext } from "../context/Release.context";
import { ReleaseNotePart } from "../models";
import IDify from "../utils/IDify";
import usePrefersReducedMotion from "../utils/usePrefersReducedMotion";
import { FiltersContext } from "../context/Filters.context";
import useShowPart from '../utils/useShowPart';

export const Highlights: FunctionComponent = () => {
    const release = useContext(ReleaseContext);
    const filtersContext = useContext(FiltersContext);
    const prefersReducedMotion = usePrefersReducedMotion();
    const showPart = useShowPart(filtersContext.selected.filters);

    const parts = useMemo(() => {
        if (!release) {
            return []
        }
        const output: ReleaseNotePart[] = [];
        const addParts = (theseParts: ReleaseNotePart[]) => {
            theseParts.forEach((thisPart) => {
                if (thisPart.highlight && thisPart.title && showPart(thisPart.taxonomies)) {
                    const id = thisPart.id ?? IDify(thisPart.title);
                    output.push({ id, title: thisPart.title, taxonomies: thisPart.taxonomies })
                }
                if (thisPart.content_parts && thisPart.content_parts.length > 0) {
                    addParts(thisPart.content_parts);
                }
            });
        }
        addParts(release.content_parts);

        if (!filtersContext.selected.shouldCheckFilters) {
            return output;
        }

        return output.filter(({ taxonomies }) => showPart(taxonomies));

    }, [release, showPart, filtersContext.selected.shouldCheckFilters]);

    const scrollIntoView = useCallback((element: HTMLElement): void => {
        window.scroll({
            top: element.getBoundingClientRect().top + window.pageYOffset - 90,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
        element.focus({ preventScroll: true });
    }, [prefersReducedMotion]);

    const handleClick = useCallback(
        (id: string) => {
            return (event: MouseEvent) => {
                event.preventDefault();
                const ele = document.getElementById(id);
                if (ele) {
                    scrollIntoView(ele);
                }
            }
        },
        [scrollIntoView],
    );

    if (!release || parts.length < 1) {
        return null;
    }

    return <List mb="21">
        {parts.map(({ id, title }) => <ListItem mb={0} key={id}>
            {/* @ts-expect-error */}
            <Link onClick={handleClick(id)} href={`#${id}`}>{title}</Link>
        </ListItem>)}
    </List >
}