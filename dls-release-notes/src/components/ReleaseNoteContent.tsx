import { FunctionComponent, useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ReleaseNoteResponseModel } from "../models";

import { ContentParts } from './ContentParts';
import { ModuleContext } from "../context/Modules.context";
import { useParams } from "react-router-dom";
import { FiltersContext } from "../context/Filters.context";

import { ReleaseContextProvider } from '../context/Release.context';

const flashFocusState = keyframes`
    0% {
        outline-color: var(--colorSemanticFocus500);
    }
    66% {
        outline-color: var(--colorSemanticFocus500);
    }
    100% {
        outline-color: var(--colorsSemanticFocusTransparent);
    }
`;

const ReleaseNoteArticle = styled.article`
    line-height: 1.5;
    color: var(--colorsUtilityYin090);
    outline: none;
    &:focus-visible{
        outline: solid 3px var(--colorsSemanticFocusTransparent);
        animation: ${flashFocusState} 2s linear;
    }
`;

export const ReleaseNoteContent: FunctionComponent<{ release: ReleaseNoteResponseModel }> = ({ release }) => {

    const [first, setFirst] = useState<boolean>(true);
    const params = useParams();
    const { clearModules } = useContext(ModuleContext);
    const filtersContext = useContext(FiltersContext);

    useEffect(() => {
        filtersContext?.clearAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [release]);

    useEffect(() => {
        if (first) {
            setFirst(false)
        } else {
            clearModules();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, setFirst]);


    return <ReleaseNoteArticle id="release-note" tabIndex={-1}>
        <ReleaseContextProvider release={release}>
            <ContentParts parts={release.content_parts} />
        </ReleaseContextProvider>
    </ReleaseNoteArticle>;
}