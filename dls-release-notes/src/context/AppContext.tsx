
import { createContext, FunctionComponent, useEffect, useReducer, useRef, useState } from "react";
import { AppOptions, ArchiveResponseModel, ReleaseNoteResponseModel, TaxonomiesResponseModel } from "../models";
import memoizedRequest from "../utils/memoizedRequest";

const INITIAL_APP_STATE = {
    loading: false,
    archive: null,
    data: null,
    taxonomies: null,
    language: null
};

const INITIAL_APP_CONTEXT = {
    state: INITIAL_APP_STATE,
    actions: {},
    options: {
        archiveUrl: '',
    }
};

export interface AppContextModel {
    state: AppState;
    options: AppOptions;
    actions: {
        [methodName: string]: (url: string) => Promise<void>
    };
}

export const AppContext = createContext<AppContextModel>(INITIAL_APP_CONTEXT);

export interface AppState {
    loading: boolean;
    archive: ArchiveResponseModel | null;
    data: ReleaseNoteResponseModel | null;
    taxonomies: TaxonomiesResponseModel | null;
    language: string | null;
}

interface AppReducerActions {
    type: string;
    payload?: any;
}

const ACTIONS = {
    START_LOADING: 'START_LOADING',
    DONE_LOADING: 'DONE_LOADING',
    SET_DATA: 'SET_DATA',
    SET_ARCHIVE: 'SET_ARCHIVE',
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_TAXONOMIES: 'SET_TAXONOMIES',
    CLEAR_ALL: 'CLEAR_ALL',
};

const appContextReducer = (state: AppState, action: AppReducerActions): AppState => {
    switch (action.type) {
        case ACTIONS.START_LOADING:
            return {
                ...state,
                loading: true
            };
        case ACTIONS.DONE_LOADING:
            return {
                ...state,
                loading: false
            };
        case ACTIONS.SET_DATA:
            return {
                ...state,
                data: action.payload
            };
        case ACTIONS.SET_ARCHIVE:
            return {
                ...state,
                archive: action.payload
            };
        case ACTIONS.SET_LANGUAGE:
            if (action.payload === state.language) {
                return state;
            }
            const matchingLang = state.archive?.alternative_langauges.findIndex(({ id }) => id === action.payload);
            if (typeof matchingLang === "undefined" || matchingLang < -1) {
                return state;
            }
            return {
                ...state,
                language: action.payload
            };
        case ACTIONS.SET_TAXONOMIES:
            return {
                ...state,
                taxonomies: action.payload
            };

        case ACTIONS.CLEAR_ALL:
            return INITIAL_APP_STATE;
        default:
            return state;
    }
}

export const AppContextProvider: FunctionComponent<{ options: AppOptions }> = ({ options, children }) => {
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({
        data: false,
        archive: false,
        language: false,
        taxonomies: false
    });

    const [state, dispatch] = useReducer(appContextReducer, INITIAL_APP_STATE);

    // Unified loading state
    useEffect(() => {
        if (Object.keys(loading).find((key) => loading[key])) {
            dispatch({ type: ACTIONS.START_LOADING });
        } else {
            dispatch({ type: ACTIONS.DONE_LOADING });
        }
    }, [loading]);

    const actions = useRef({
        loadData: async (url: string): Promise<void> => {
            if (loading.data || url === state.data?.__self) return;
            setLoading({ ...loading, data: true });
            const data = await memoizedRequest(url);
            dispatch({ type: ACTIONS.SET_DATA, payload: data });
            setLoading({ ...loading, data: false });
        },
        loadArchive: async (url: string): Promise<void> => {
            if (loading.archive) return;
            setLoading({ ...loading, archive: true });
            const data = await memoizedRequest(url);
            dispatch({ type: ACTIONS.SET_ARCHIVE, payload: data });
            setLoading({ ...loading, archive: false });
        },
        switchLanguage: async (lang: string): Promise<void> => {
            if (loading.language) return;
            setLoading({ ...loading, language: true });
            dispatch({ type: ACTIONS.SET_LANGUAGE, payload: lang });
            setLoading({ ...loading, language: false });
        },
        loadTaxonomies: async (url: string): Promise<void> => {
            if (loading.taxonomies) return;
            setLoading({ ...loading, taxonomies: true });
            const data = await memoizedRequest(url);
            dispatch({ type: ACTIONS.SET_TAXONOMIES, payload: data });
            setLoading({ ...loading, taxonomies: false });
        }
    });


    useEffect(() => {
        if (state.archive?.taxonomies) {
            actions.current.loadTaxonomies(state.archive?.taxonomies);
        }
    }, [state.archive, actions]);


    useEffect(() => {
        actions.current.loadArchive(options.archiveUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.archiveUrl]);

    // Effects when archive changes
    useEffect(() => {
        if (!state.archive) {
            return;
        }
        if (!state.language) {
            dispatch({ type: ACTIONS.SET_LANGUAGE, payload: state.archive.language });
            return;
        }
        if (state.archive.language !== state.language) {
            const url = state.archive.alternative_langauges.find(({ id }) => id === state.language)?.url;
            if (url) {
                dispatch({ type: ACTIONS.CLEAR_ALL });
                actions.current.loadArchive(url);
            }
        }
    }, [state.archive, state.language]);

    // @ts-expect-error
    return <AppContext.Provider value={{ state, actions: actions.current, options }} displayName="App Main Context">
        {children}
    </AppContext.Provider>;
};