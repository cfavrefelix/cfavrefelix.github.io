import { FunctionComponent } from "react";
import styled from "styled-components";
import { useLabels } from "../context/Labels.context";
import Typography from 'carbon-react/lib/components/typography';
import { ActionButtons } from './ActionButtons';

const ReleaseNoteTitleBar = styled.div`
    margin: 2rem 0 1.5rem;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}) {
        margin: 2.5rem 0 1.5rem;
    }
`;

export const ReleaseNoteTitle: FunctionComponent<{ title: string, productName?: string }> = ({ title, productName }) => {
    const t = useLabels();
    return <ReleaseNoteTitleBar>
        {productName && <Typography fontSize="20px" lineHeight="25px" mb={0} as="h1" fontWeight="700">{t('subtitle.prefix')} {productName}</Typography>}
        <Typography variant="h1" as="h2" fontSize="32px" lineHeight="40px" fontWeight="700" mb={3}>
            {title}
        </Typography>
        <ActionButtons />
    </ReleaseNoteTitleBar>;
}