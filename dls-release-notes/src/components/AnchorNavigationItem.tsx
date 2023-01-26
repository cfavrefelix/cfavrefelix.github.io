import { FunctionComponent, SyntheticEvent, useCallback } from "react";
import styled from "styled-components";
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';

const AnchorNavA = styled.a<{ activeItem: boolean }>`
    box-sizing: border-box;
    border-left: .25em solid rgba(0, 0, 0, 0.1);
    text-decoration: none;
    display: block;
    color: inherit;
    font-weight: 700;
    padding: .5rem 1rem;
    outline: none;
    background-clip: padding-box;
    font-size: .875rem;
    line-height: 1.5rem;
    &:hover{
        color: inherit;
    }
    &:focus{
        color: inherit;
        box-shadow: var(--colorsSemanticFocus500) 0px 0px 0px 3px;
    }
    ${({ activeItem }) => activeItem ? `
        border-left-color: var(--colorsActionMajor500);
    ` : `
        &:hover{
            background-color: rgba(0,0,0,0.1);
        }
        &:focus{
            background-color: rgba(0,0,0,0.1);
            box-shadow: var(--colorsSemanticFocus500) 0px 0px 0px 3px;
        }
    `}
`;

interface ComponentProps {
    active: boolean;
    title: string;
    id: string;
    targetRef: React.MutableRefObject<HTMLElement | null>
}

export const AnchorNavigationItem: FunctionComponent<ComponentProps> = ({ title, id, active, targetRef }) => {

    const prefersReducedMotion = usePrefersReducedMotion();

    const scrollToTarget = useCallback((event: SyntheticEvent): void => {
        event.preventDefault();

        if (!targetRef.current) {
            return;
        }

        window.scroll({
            top: targetRef.current.offsetTop - 60,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });

        targetRef.current?.focus({ preventScroll: true });
    }, [prefersReducedMotion, targetRef]);

    return <AnchorNavA
        className="custom"
        href={'#' + id}
        onClick={e => scrollToTarget(e)}
        activeItem={active}
    >
        {title}
    </AnchorNavA>;
}