import { FunctionComponent, useCallback, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Link from 'carbon-react/lib/components/link';
import { AppContext } from "../context/AppContext";

import { useLabels } from "../context/Labels.context";
import styled from "styled-components";

const LinkWrap = styled.div`
    display: flex;
    justify-content: space-between;
    max-width:36rem;
`;

export const MissingRelease: FunctionComponent = () => {
    const { state } = useContext(AppContext);
    let { language } = useParams<{ language: string, version: string }>();
    const t = useLabels();

    const history = useHistory();

    const goBack = useCallback(() => {
        history.goBack()
    }, [history]);

    const goToLatest = useCallback(() => {
        const release = state?.archive?.releases[0].id;
        history.push(`/release/${language}/${release}`);
    }, [history, state, language])

    return <div className="text-content">
        <p>{t('messages.not-found')}</p>
        <LinkWrap>
            <Link onClick={goBack} icon="arrow_left" iconAlign="left">{t('links.go-back')}</Link>
            <Link onClick={goToLatest}>{t('links.view-latest')}</Link>
        </LinkWrap>
    </div>;
}