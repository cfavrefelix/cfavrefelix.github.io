import { FunctionComponent, SyntheticEvent, useCallback, useContext, useEffect, useState } from "react";
import { Select, Option } from "carbon-react/lib/components/select";
import { AppContext } from "../context/AppContext";
import { AlternativeLanguageModel } from "../models";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { useLabels } from '../context/Labels.context';

const LanguageSelectorWrap = styled.div`
    margin-bottom: 1.5rem;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}){
        margin-bottom: 2rem;
    }
    @media print {
        display: none;
    }
`;

export const LanguageSelector: FunctionComponent = () => {

    const { version, language } = useParams<{ language: string, version: string }>();
    const history = useHistory();

    const appContext = useContext(AppContext);

    const [selected, setSelected] = useState('');
    const [languageOptions, setLanguageOptions] = useState<AlternativeLanguageModel[]>([]);

    useEffect(() => {
        if (appContext.state.language) {
            setSelected(appContext.state.language);
        }
        if (appContext.state.archive?.alternative_langauges) {
            setLanguageOptions(appContext.state.archive?.alternative_langauges);
        }
    }, [appContext, setLanguageOptions, setSelected]);

    useEffect(() => {
        setSelected(language);
    }, [language, setSelected]);

    const t = useLabels();

    const handleChange = useCallback(
        (event: SyntheticEvent) => {
            const newLanguage = (event.target as HTMLSelectElement).value;
            if (language !== newLanguage) {
                history.push(`/release/${newLanguage}/${version}`);
            }
        },
        [history, version, language],
    );

    if (languageOptions.length < 2) {
        return null;
    }
    return <LanguageSelectorWrap>
        <Select
            name="lang-select"
            id="language"
            label={t('titles.language')}
            placeholder={t('dropdown.select-language')}
            size="medium"
            onChange={(e: SyntheticEvent) => handleChange(e)}
            value={selected}
            disablePortal
        >
            {languageOptions?.map((item, index) => {
                return <Option
                    text={item.title}
                    value={item.id}
                    key={index}
                />;
            })}
        </Select>
    </LanguageSelectorWrap>
}