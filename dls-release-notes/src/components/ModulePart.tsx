import { FunctionComponent, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ModuleContext } from "../context/Modules.context";
import { ModulePartModel } from "../models";
import { TextContent } from "./TextContent";
import { ContentParts } from "./ContentParts";
import { flashFocusState } from '../styles/animations';
import Tile from "carbon-react/lib/components/tile";
import Content from "carbon-react/lib/components/content";
import Typography from "carbon-react/lib/components/typography";
export interface ModuleModel {
    title: string;
    id: string;
    ref: React.MutableRefObject<HTMLElement>;
}

const ModuleSection = styled.section`
    display: block;
    margin: 1.5rem -1rem;
    outline: none;
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile.max}) {\
        > [data-component="tile"] {
            border-left: none;
            border-right: none;
        }
    }
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
        margin: 2.5rem 0;
    }
    &:focus-visible{
        outline: solid 3px var(--colorsSemanticFocusTransparent);
        animation: ${flashFocusState} 2s linear;
    }
`;

const ModuleHeading = styled.h2`
    margin: 0 -.5rem 1rem;
    padding: 0 .5rem .5rem;
    position: sticky;
    top: var(--header-height, 3rem);
    z-index: 99;
    background: var(--colorsUtilityYang100);
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}) {
        margin: 0 -.5rem 1.5rem;
    }
`;

export const ModulePart: FunctionComponent<{ part: ModulePartModel }> = ({ part }) => {

    const { addModule } = useContext(ModuleContext);
    const moduleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        addModule({
            title: part.title ?? '',
            id: part.id,
            ref: moduleRef
        })
    }, [addModule, moduleRef, part]);

    return <ModuleSection id={part.id} ref={moduleRef} tabIndex={-1} aria-label={part.title}>
        <Tile>
            <Content>
                {part.title && <ModuleHeading><Typography fontSize="24px" lineHeight="30px" as="h2" mb={0} fontWeight="700">{part.title}</Typography></ModuleHeading>}
                {
                    part.content_parts && part.content_parts.length > 0 ?
                        <ContentParts parts={part.content_parts} /> :
                        <TextContent content={part.content ?? ''} />
                }
            </Content>
        </Tile>
    </ModuleSection>;
}