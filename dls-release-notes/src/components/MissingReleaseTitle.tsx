import { FunctionComponent } from "react";
import { useLabels } from "../context/Labels.context";
import styled from 'styled-components';

const H1 = styled.h1`
    font-weight: 900;
    font-size: 1.375rem;
    line-height: 1.75rem;
    margin: 1rem 0 1.5rem;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
        margin: 0 0 2rem;
    }
    
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}) {
        font-size: 2rem;
        line-height: 1.25;
        margin: 2.5rem 0 2.5rem;
    }
`;

export const MissingReleaseTitle: FunctionComponent = () => {
    const t = useLabels();
    return <H1>{t('titles.not-found')}</H1>
}