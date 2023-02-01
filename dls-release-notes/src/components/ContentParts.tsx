import { FunctionComponent, useContext, useMemo } from "react";
import { isAccordion, isModule, ReleaseNotePart, isIntro, isGroup } from '../models';

import { TextContent } from "./TextContent";
import { AccordionPart } from "./AccordionPart";
import { ModulePart } from './ModulePart';
import { TitledPart } from './TitledPart';
import { IntroPart } from './IntroPart';
import { FiltersContext } from "../context/Filters.context";
import { useLabels } from "../context/Labels.context";

import useShowPart from '../utils/useShowPart';

export const ContentParts: FunctionComponent<{ parts?: ReleaseNotePart[] }> = ({ parts }) => {

    const context = useContext(FiltersContext);
    const t = useLabels();
    const showPart = useShowPart(context.selected.filters);

    // Turned the component parts to the correct element. Also filters the fields based on selected fields.
    // Memoized for performance
    const mappedParts = useMemo(() => {
        if (!parts) {
            return null;
        }

        const filteredParts = parts.map((part, index) => {

            if (isIntro(part)) {
                return <IntroPart key={index} part={part} />;
            }

            if (isModule(part)) {
                return <ModulePart key={index} part={part} />;
            }

            if (isAccordion(part)) {
                return showPart(part.taxonomies) && <AccordionPart title={part.title} content={part.content} key={index} />;
            }

            if (isGroup(part)) {
                return showPart(part.taxonomies) && <TitledPart group id={part.id} highlight={part.highlight} title={part.title} taxonomies={part.taxonomies} key={index}>
                    <ContentParts parts={part.content_parts} />
                </TitledPart>;
            }

            if (!!part.content) {
                return showPart(part.taxonomies) && <TitledPart id={part.id} highlight={part.highlight} title={part.title} taxonomies={part.taxonomies} key={index}>
                    <TextContent content={part.content} />
                </TitledPart>;
            }

            if (part.content_parts && part.content_parts.length > 0) {
                return showPart(part.taxonomies) && <TitledPart id={part.id} highlight={part.highlight} title={part.title} taxonomies={part.taxonomies} key={index}>
                    <ContentParts parts={part.content_parts} />
                </TitledPart>;
            }

            return null;
        }).filter(item => item !== false);

        // Check how many have been filtered
        if (filteredParts.length === 0 && parts.length > 0) {
            return <p>{t('messages.all-parts-filtered')}</p>;
        }

        return filteredParts;

    }, [parts, showPart, t]);

    return <>
        {mappedParts}
    </>;
}