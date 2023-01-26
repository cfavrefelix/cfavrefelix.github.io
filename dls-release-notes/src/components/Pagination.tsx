// import Button from "carbon-react/lib/components/button";
import Link from "carbon-react/lib/components/link";
import { FunctionComponent, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useLabels } from "../context/Labels.context";
interface ComponentProps {
    next?: string;
    previous?: string;
}

const PaginationWrap = styled.div`
    display: flex;
    >[data-component="link"] + [data-component="link"] {
        margin-left: 1rem;
    }
`;

export const Pagination: FunctionComponent<ComponentProps> = ({ next, previous }) => {
    const { language } = useParams<{ language: string, version: string }>();
    const history = useHistory();
    const t = useLabels();

    const navigateTo = useCallback(
        (versionId: string) => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            history.push(`/release/${language}/${versionId}`);
        },
        [history, language]
    );

    return <PaginationWrap>
        {previous && <Link href={`#/release/${language}/${previous}`} onClick={() => navigateTo(previous)} icon="arrow_left" iconAlign="left">{t('buttons.previous')}</Link>}
        {next && <Link href={`#/release/${language}/${next}`} onClick={() => navigateTo(next)} icon="arrow_right" iconAlign="right">{t('buttons.next')}</Link>}
    </PaginationWrap>;
}