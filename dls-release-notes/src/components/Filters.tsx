import { FunctionComponent, useContext, useMemo } from "react";
import { useMediaQuery } from 'react-responsive'
import theme from '../theme';
import styled, { css } from "styled-components";
import { Accordion } from "carbon-react/lib/components/accordion";
import { useLabels } from "../context/Labels.context";
import { FiltersContext } from "../context/Filters.context";

const AccordionContent = styled.div`
    padding: 1rem 1rem .1rem;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
        width: 50%;
        padding: .5rem .5rem .5rem 1rem;
    }
`;

export const Filters: FunctionComponent = ({ children }) => {

    const { filters } = useContext(FiltersContext);
    const t = useLabels();

    const useAccordion = useMediaQuery({
        query: `(max-width:${theme.breakpoints.tablet.max})`
    });

    const filtersApplied = useMemo<number>(() => {

        if (!filters) {
            return 0;
        }
        let output = 0;
        Object.keys(filters).forEach((filter) => {
            const thisFilter = filters[filter];
            output += Object.keys(thisFilter.options).filter((option) => thisFilter.options[option].selected).length;
        });

        return output;

    }, [filters]);

    if (!useAccordion) {
        return <>
            {children}
        </>
    }

    const titleText = `${t('titles.filters')} ${filtersApplied > 0 ? `(${filtersApplied} ${t('filters.applied')})` : ''}`;

    return <Accordion
        size="small"
        iconAlign="left"
        title={titleText}
        mb="2"
        disableContentPadding
        // @ts-expect-error
        styleOverride={{
            root: () => css`background-color: var(--colorsUtilityMajorTransparent);`
        }}
    >
        <AccordionContent>
            {children}
        </AccordionContent>
    </Accordion>
}