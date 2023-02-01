import { FunctionComponent, SyntheticEvent, useCallback, useContext, useEffect, useState } from "react"
import { Select, Option } from "carbon-react/lib/components/select";
import { OptionProps } from "carbon-react/lib/components/select/option";
import { AppContext } from "../context/AppContext";
import { ReleaseModel } from "../models";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useLabels } from "../context/Labels.context";

const VersionSelectorWrap = styled.div`
    font-size: var(--body-text-size, .875rem);
    margin-bottom: 1.5rem;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}){
        margin-bottom: 2rem;
    }
    @media print {
        display: none;
    }
`;

export const VersionSelector: FunctionComponent = () => {

    const appContext = useContext(AppContext);

    const [versions, setVersions] = useState<ReleaseModel[]>([]);

    const t = useLabels();

    let { version, language } = useParams<{ language: string, version: string }>();
    const history = useHistory();

    useEffect(() => {
        if (appContext.state.archive?.releases) {
            console.log(appContext)
            setVersions(appContext.state.archive?.releases);
        }
    }, [appContext]);

    const options = versions?.map(({ id, title }) => {
        return (<Option
            key={`option-${id}`}
            text={title}
            value={id}
        />) as any as React.ComponentType<OptionProps>
    });

    const onChange = useCallback((event: SyntheticEvent): void => {
        const selectedVersion = (event.target as HTMLSelectElement).value;
        if (selectedVersion !== version) {
            history.push(`/release/${language}/${selectedVersion}`);
        }
    }, [history, language, version]);

    return <VersionSelectorWrap>
        {versions?.length > 1 &&
            <Select
                name="version-select"
                id="version"
                label={t('titles.version')}
                size="medium"
                placeholder={t('dropdown.select-version')}
                onChange={(event) => onChange(event)}
                value={version}
                disablePortal
            >
                {options}
            </Select>
        }
        {/* <LinkWrap>
            <Link to={`/archive/${language}`}>{t('links.see-all-versions')}</Link>
        </LinkWrap> */}
    </VersionSelectorWrap>
}