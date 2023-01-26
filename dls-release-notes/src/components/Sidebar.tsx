import { FunctionComponent, useContext } from "react";
import styled from "styled-components";

import { AnchorNavigation } from "./AnchorNavigation";
import { LanguageSelector } from "./LanguageSelector";
import { VersionSelector } from "./VersionSelector";
import { NavMenu } from "./NavMenu";
import { ModuleContext } from "../context/Modules.context";
import JustLinks from '../components/NewLinks/JustLinks';
import { useLabels } from "../context/Labels.context";


const SidebarEle = styled.section`
    font-size: var(--body-text-size, .875rem);;
    background: var(--colorsUtilityMajor025);
    border-bottom: 1px solid var(--colorsUtilityMajor100);
    margin: 0;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}) {
        width: 20rem;
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        top: var(--header-height, 3rem);
        bottom: 0;
    }
`;

const SidebarPadding = styled.div`
    padding: .5rem 1rem 1rem;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
        padding: 1.5rem 1rem;
    }
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) and (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
        width: 36rem;
        max-width: 100%;
        margin: auto;
        display:flex;
        flex-wrap: wrap;
        > * {
            flex: 1 0 100%;
        }
        > div, > nav {
            flex: 1 0 50%;
            padding: 0 .5rem;
        }
    }
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}) {
        padding: 2.5rem 2rem 2rem;
    }
`;

const HR = styled.hr`
    border: none;
    z-index: 2;
    flex: 0 0 auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0 0 1.5rem;
    width: 100%;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}) {
        margin: 0 0 2rem -2rem;
        width: calc(100% + 4rem);
        display: block;
    }
`;

const JustLinksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const JustLinksSection = styled.div`
    margin-left: 35px;
`
const JustLinksParagraph = styled.div`
    margin-bottom: 8px;
    font-weight: bold;
`

export const Sidebar: FunctionComponent = () => {
    const { displayAnchorNav } = useContext(ModuleContext);
    const t = useLabels();

    return <SidebarEle aria-label="Filter and version controls">
        <NavMenu>
            <SidebarPadding>
                <LanguageSelector />

                <VersionSelector />

                {displayAnchorNav && <>
                    <HR />
                    <AnchorNavigation />
                </>}
            </SidebarPadding>
            <JustLinksContainer>
                        <JustLinksSection> 
                                <JustLinksParagraph>{t('titles.sidebar-links')}</JustLinksParagraph>
                            <JustLinks/>     
                        </JustLinksSection>
                    <div>     
                </div>
            </JustLinksContainer>
        </NavMenu>
     
    </SidebarEle>;
}