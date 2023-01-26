import { FunctionComponent, useState, useMemo, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useLabels } from '../context/Labels.context';
import Icon from 'carbon-react/lib/components/icon';
import styled from "styled-components";
import theme from "../theme";

const NavMenuButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: none;
    border-radius: 0;
    background: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    height: 40px;
    padding: 0 20px;
    width: 100%;
    [data-component="icon"] {
        transform: rotate(0deg);
        transition: transform .2s;
    }
    &[aria-expanded='false'] [data-component="icon"] {
        transform: rotate(-90deg);
    }
    &:focus {
        box-shadow: var(--colorsSemanticFocus500) 0px 0px 0px 3px;
        outline: none;
    }
`;

const NavMenuExpandable = styled.div<{ open: boolean }>`
    overflow: hidden;
    transition: height .2s;
`;

const NavMenuExpandableInner = styled.div`
`;

export const NavMenu: FunctionComponent = ({ children }) => {
    const [open, setOpen] = useState(true);
    const t = useLabels();

    const showAccordion = useMediaQuery({ query: `(max-width:${theme.breakpoints.tablet.max})` });
    const navId = useMemo(() => `nav-menu-${Math.random().toString().substring(2, 10)}`, []);
    const contentRef = useRef<HTMLDivElement>(null);

    const expandableHeight = useMemo(() => {
        if (!open) return 0;
        return contentRef.current?.scrollHeight;
    }, [contentRef, open]);

    if (showAccordion) {
        return <>
            <NavMenuButton
                id={navId}
                aria-controls={navId + '-expandable'}
                aria-expanded={open}
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <Icon type="dropdown" />
                <span>{t('buttons.nav-menu')}</span>
            </NavMenuButton>

            <NavMenuExpandable
                id={navId + '-expandable'}
                aria-labelledby={navId}
                role="region"
                open={open}
                style={{
                    height: expandableHeight
                }}
            >
                <NavMenuExpandableInner ref={contentRef}>
                    {children}
                </NavMenuExpandableInner>
            </NavMenuExpandable>
        </>
    }

    return <>{children}</>
}