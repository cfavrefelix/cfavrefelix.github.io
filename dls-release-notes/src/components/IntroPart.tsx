import { FunctionComponent, useContext, useEffect, useRef } from "react";
import { ModuleContext } from "../context/Modules.context";
import { IntroPartModel } from '../models';
import { TextContent } from "./TextContent";
import { Highlights } from "./Highlights";
import { flashFocusState } from '../styles/animations';
import styled from 'styled-components';

const ModuleSection = styled.section`
    display: block;
    margin: 0 0 1.5rem;
    outline: none;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
        margin: 0 0 2.5rem;
    }
    &:focus-visible{
        outline: solid 3px var(--colorsSemanticFocusTransparent);
        animation: ${flashFocusState} 2s linear;
    }
`;

export const IntroPart: FunctionComponent<{ part: IntroPartModel }> = ({ part }) => {
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
        <TextContent content={part.content ?? ''} />
        <Highlights />
    </ModuleSection>
}