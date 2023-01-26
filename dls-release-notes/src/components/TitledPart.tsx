import { FunctionComponent, useMemo, useCallback, useContext } from "react";
import Pill from 'carbon-react/lib/components/pill';
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import IDify from "../utils/IDify";
import Typography from "carbon-react/lib/components/typography";
import Hr from "carbon-react/lib/components/hr";
import { FiltersContext } from "../context/Filters.context";
import { TaxonomiesModel, TaxonomiesOptionModel } from "../models";

interface ComponentProps {
    id?: string;
    highlight?: boolean;
    title?: string;
    group?: boolean;
    taxonomies?: 'all' | {
        [taxonomy: string]: string[]
    }
}

const TitlePartDiv = styled.div`
    margin-bottom: 24px;
    hr {
        display: none;
    }
    & + & hr{
        display: block;
    }
`

const PillsWrap = styled.div`
    gap: .5rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: -1rem 0 1rem;
`;

export const TitledPart: FunctionComponent<ComponentProps> = ({ id, highlight, title, taxonomies, children, group = false }) => {

    const appContext = useContext(AppContext);

    const filtersContext = useContext(FiltersContext);

    const showTaxonomyAsPill = useCallback((taxonomy: TaxonomiesModel, option: TaxonomiesOptionModel | undefined) => {
        // If anything is null, or pills are disabled for this tax, or there is no title available
        // Then dont show
        if (!taxonomy || !option || taxonomy?.pills === false || !option.title) {
            return false;
        }

        // If no selected, or just _type selected, then show
        if (!filtersContext.selected.shouldCheckFilters) {
            return true;
        }

        // tax and opt both exist
        // there would be a pill showing
        // BUT there is something selected
        if (!filtersContext.selected.filters[taxonomy.id]) {
            // Don't show because not selected
            return false;
        }

        return filtersContext.selected.filters[taxonomy.id].includes(option.id);
    }, [filtersContext.selected]);

    const taxPills = useMemo(() => {
        if (!taxonomies || taxonomies === 'all') {
            return null;
        }
        const output: any[] = [];
        Object.keys(taxonomies)
            .forEach((taxonomy, i) => {
                if (!taxonomies[taxonomy] || taxonomies[taxonomy].length < 1) {
                    return;
                }
                const fullTax = appContext.state.taxonomies?.taxonomies.find((thisTax) => thisTax.id === taxonomy);
                if (!fullTax) {
                    return;
                }
                return taxonomies[taxonomy]
                    .map((option) => fullTax?.options.find((thisOption) => thisOption.id === option))
                    .filter((option) => showTaxonomyAsPill(fullTax, option))
                    .forEach((option, j) => {
                        if (!option) {
                            return
                        }
                        const { title, color } = option;
                        output.push(<Pill
                            key={`${i}-${j}`}
                            pillRole="status"
                            borderColor={color}
                        >
                            {title}
                        </Pill>);
                    })
            });
        return output;
    }, [appContext.state.taxonomies, taxonomies, showTaxonomyAsPill]);

    const showTaxonomies = useMemo(
        () => taxonomies && Object.keys(taxonomies).length > 0 && taxonomies !== 'all' && taxPills && taxPills.length > 0,
        [taxonomies, taxPills]
    );

    const headingId = useMemo(() => {
        if (id) {
            return id;
        }
        if (highlight && title) {
            return IDify(title);
        }
        return undefined;
    }, [id, title, highlight]);

    const headingProps = group ? {
        fontSize: "14px",
        fontWeight: "600",
        lineHeight: "1.5",
        textTransform: "uppercase",
        as: "h3",
        mb: 3,
        color: "rgba(0, 0, 0, 0.55)"
    } : {
        fontSize: "20px",
        fontWeight: "700",
        lineHeight: "1.25",
        mb: 3,
        as: "h4",
    }

    return <TitlePartDiv id={headingId}>
        {group && <Hr />}
        {title && <Typography {...headingProps}>{title}</Typography>}
        {showTaxonomies && <PillsWrap>{taxPills}</PillsWrap>}
        {children}
    </TitlePartDiv>
}