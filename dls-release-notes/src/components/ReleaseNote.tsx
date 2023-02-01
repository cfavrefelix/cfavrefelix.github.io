import React, { FunctionComponent, useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { ReleaseNoteResponseModel } from "../models";

import { AppContext } from '../context/AppContext';

import { Sidebar } from './Sidebar';
import { ReleaseNoteTitle } from './ReleaseNoteTitle';
import { ReleaseNoteContent } from './ReleaseNoteContent';
import { MissingRelease } from './MissingRelease';
import { MissingReleaseTitle } from './MissingReleaseTitle';
import { ArticleFooter } from './ArticleFooter';
import { FiltersSidebar } from './FiltersSidebar';

import { FiltersContextProvider } from '../context/Filters.context';
import { SidebarContextProvider } from '../context/Sidebar.context';
import { ModuleContextProvider } from '../context/Modules.context';

import styled from "styled-components";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { SetTitle } from "./SetTitle";
import { useLabels } from "../context/Labels.context";

const ContentWrap = styled.div`
    padding: 0 1rem;
    margin: auto;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
        padding: 0 1.5rem;
    }
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}) {
        padding: 0 2rem;
    }
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop.min}) {
        padding: 0 2.5rem;
    }
`;

const Grid = styled.div`
    display: grid;
    flex: 1;
    width: 100%;
    margin: auto;
    padding: var(--header-height, 3rem) 0 0;
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto;
    grid-template-areas:
        "sidebar"
        "title"
        "content";
    @media print {
        grid-template-areas:
            "title"
            "sidebar"
            "content";
    }
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}) {
        grid-template-columns: 320px 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas:
            "sidebar title"
            "sidebar content";
    }
`;

const GridItemTitle = styled.div`
    grid-area: title;
    max-width: ${props => props.theme.containerWidth};
    width: 100%;
    justify-self: center;
`;

const GridItemSidebar = styled.div`
    position: relative;
    grid-area: sidebar;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
        margin-bottom: 0;
    }
`;
const GridItemMain = styled.main`
    width: 100%;
    grid-area: content;
    max-width: ${props => props.theme.containerWidth};
    justify-self: center;
    margin-bottom: 4rem;
`;

export const ReleaseNote: FunctionComponent = () => {
    const [release, setRelease] = useState<ReleaseNoteResponseModel | null>(null);
    const [noteUrl, setNoteUrl] = useState<string>('');
    const { state, actions } = useContext(AppContext);
    const history = useHistory();
    const t = useLabels();

    let { version, language } = useParams<{ language: string, version: string }>();

    // Change the url to load
    useEffect(() => {
        const url = state.archive?.releases.find((release) => release.id === version)?.url;
        setNoteUrl(url ?? '');
    }, [state.archive, version, setNoteUrl, history]);

    // Load the url
    useEffect(() => {
        if (!noteUrl) return;
        actions.loadData(noteUrl);
    }, [noteUrl, actions, version, language]);

    // Set the release value
    useEffect(() => {
        if (state.data?.id !== release?.id || state.language !== release?.language) {
            setRelease(state.data);
        }
    }, [state, release, setRelease]);


    const isMissingRelease = useMemo(() => {
        return !state.loading && !!state.archive && state.archive.releases.findIndex(({ id }) => id === version) === -1
    }, [state, version]);

    const title = useMemo(() => {
        if (isMissingRelease) {
            return t('titles.not-found');
        }
        if (release?.title && release?.date) {
            return `${release.title} (${release.date})`
        }
        if (release?.title && !release?.date) {
            return release?.title
        }
        if (!release?.title && release?.date) {
            return release?.date
        }
    }, [release, isMissingRelease, t]);


    return <article>
        <FiltersContextProvider release={release ?? undefined}>
            <ModuleContextProvider>
                <SidebarContextProvider>

                    <LanguageSwitcher />

                    {title && <SetTitle title={`${title} ${t('page-title.divider')} ${t('page-title.suffix')}`} />}

                    <Grid>

                        {isMissingRelease && <>
                            <GridItemTitle>
                                <ContentWrap>
                                    <MissingReleaseTitle />
                                </ContentWrap>
                            </GridItemTitle>

                            <GridItemSidebar>
                                <Sidebar />
                            </GridItemSidebar>

                            <GridItemMain>
                                <ContentWrap>
                                    <MissingRelease />
                                </ContentWrap>
                            </GridItemMain>
                        </>}

                        {!isMissingRelease && release &&
                            <>
                                <GridItemTitle>
                                    <ContentWrap>
                                        <ReleaseNoteTitle
                                            title={title || ''}
                                            productName={state.archive?.product}
                                        />
                                    </ContentWrap>
                                </GridItemTitle>

                                <GridItemSidebar>
                                    <Sidebar />
                                </GridItemSidebar>

                                <GridItemMain>
                                    <ContentWrap>
                                        <ReleaseNoteContent
                                            release={release}
                                        />
                                    </ContentWrap>
                                </GridItemMain>

                                <ArticleFooter />
                            </>
                        }
                    </Grid>

                    <FiltersSidebar />
                </SidebarContextProvider>
            </ModuleContextProvider>
        </FiltersContextProvider>
    </article>;
}

export default ReleaseNote;