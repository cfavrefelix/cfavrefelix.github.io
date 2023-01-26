import { useCallback, useState } from "react";
import { useEffect } from "react";
import { createContext, FunctionComponent, useContext } from "react";
import memoizedRequest from "../utils/memoizedRequest";

import { AppContext } from './AppContext';

export const LabelsContext = createContext<LabelsModel>({});

interface LabelsModel {
    [key: string]: string;
}

export const LabelsContextProvider: FunctionComponent = ({ children }) => {
    const appContext = useContext(AppContext);
    const [translations, setTranslations] = useState<LabelsModel>({});
    useEffect(() => {
        if (!appContext?.state?.archive?.labels) {
            return;
        }
        const labelsUrl = appContext.state.archive.labels;
        async function loadTranslations() {
            try {
                const labels = await memoizedRequest<LabelsModel>(labelsUrl);
                setTranslations(labels);
            } catch (e) {
                console.error(e);
            }
        }

        loadTranslations();
    }, [appContext.state.archive, setTranslations])
    return <LabelsContext.Provider value={translations}>{children}</LabelsContext.Provider>;
}

export const useLabels = () => {
    const labels = useContext(LabelsContext);
    const callback = useCallback(
        (key: string): string => {
            return labels[key] || '';
        },
        [labels],
    );
    return callback;
}