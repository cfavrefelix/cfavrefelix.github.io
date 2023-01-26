import { FunctionComponent, useContext, SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';
import { Pagination } from './Pagination';
import { useLabels } from "../context/Labels.context";
import Link from "carbon-react/lib/components/link";
import { useMediaQuery } from 'react-responsive'
import theme from "../theme";

const FooterWrap = styled.footer<{ show: boolean }>`
    padding: 1rem 0;
    bottom: 0;
    z-index: 99;
    background: var(--colorsUtilityDisabled400);
    opacity: 0;
    transition: opacity 0.25s linear;
    pointer-events: none;
    width: 100%;
    align-self: end;
    position: sticky;
    bottom: 0;
    ${(props) => props.show && 'opacity: 1; pointer-events: auto;'}
    grid-area: content;
`;

const FooterInner = styled.div`
    max-width: ${props => props.theme.containerWidth};
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    @media screen and (min-width: ${ ({theme}) => theme.breakpoints.tablet.min }) {
        padding: 0 1.5rem;
    }
    @media screen and (min-width: ${ ({theme}) => theme.breakpoints.tabletLandscape.min }) {
        padding: 0 2.5rem;
    }

`;

export const ArticleFooter: FunctionComponent = () => {
    const appContext = useContext(AppContext);
    const { options } = appContext;
    const release = appContext.state.data;
    const prefersReducedMotion = usePrefersReducedMotion();
    const t = useLabels();
    const [showFooter, setShowFooter] = useState(false);
    const showPagination = useMediaQuery({ query: `(min-width:${theme.breakpoints.tablet.min})` });

    useEffect(() => {
        let loop = true;
        const threshhold = (150 - (options.showHeader ? 48 : 0));
        function theLoop() {
            setShowFooter((window.pageYOffset > threshhold));

            if (loop) {
                requestAnimationFrame(() => theLoop());
            }
        };

        requestAnimationFrame(() => theLoop());

        return () => {
            loop = false;
        }
    }, [setShowFooter, options]);

    if (!release) {
        return null;
    }

    const handleKeyDown = (event: SyntheticEvent) => {
        const { key } = (event.nativeEvent as KeyboardEvent);
        if (key === ' ' || key === 'Enter') {
            event.preventDefault();
            scrollToTop();
        }
    }

    const scrollToTop = (_event?: SyntheticEvent) => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        document.getElementById("release-note")?.focus({ preventScroll: true });
    };

    return <FooterWrap show={showFooter} tabIndex={showFooter ? undefined : -1}>
        <FooterInner>
            <Link
                icon="arrow_up"
                onClick={scrollToTop}
                onKeyDown={handleKeyDown}
            >{t('links.back-to-top')}</Link>

            {showPagination &&
                <Pagination
                    next={release.next}
                    previous={release.previous}
                />}
        </FooterInner>
    </FooterWrap>;
}