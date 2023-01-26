import { createContext, FunctionComponent, useContext, useEffect, useMemo, useReducer } from "react";
import { ReleaseNotePart, ReleaseNoteResponseModel } from "../models";

import { AppContext } from './AppContext';

export const FiltersContext = createContext<FiltersContextModel>({
    filters: {},
    toggleFilter: () => { },
    clearSelected: () => { },
    clearAll: () => { },
    overwrite: (state: FiltersState) => { },
    selected: {
        length: 0,
        shouldCheckFilters: false,
        filters: {}
    },
    displayFilters: false
});

export interface FiltersContextModel {
    filters: FiltersState,
    toggleFilter: (taxonomy: string, option: string) => void
    clearSelected: (taxonomy: string) => void
    clearAll: () => void,
    overwrite: (state: FiltersState) => void,
    selected: {
        length: number,
        shouldCheckFilters: boolean,
        filters: {
            [key: string]: string[];
        }
    },
    displayFilters: boolean
}

export interface FiltersState {
    [taxonomy: string]: TaxonomyState;
}

export interface TaxonomyState {
    title: string;
    id: string;
    pills: boolean;
    options: {
        [option: string]: OptionState
    }
}

export interface OptionState {
    selected: boolean,
    disabled: boolean,
    title: string,
    id: string
}


const getUsedTaxonomies = (parts: ReleaseNotePart[], existing: { [key: string]: Set<string> } = {}): { [key: string]: Set<string> } => {
    parts.forEach(part => {
        if (part.taxonomies && typeof part.taxonomies !== 'string') {
            Object.keys(part.taxonomies).forEach((taxonomy) => {
                const options: string[] = (part.taxonomies as { [key: string]: string[] })[taxonomy];
                options.forEach((option) => {
                    if (!existing[taxonomy]) {
                        existing[taxonomy] = new Set();
                    }
                    existing[taxonomy].add(option);
                });
            });
        }
        if (!!part.content_parts) {
            getUsedTaxonomies(part.content_parts, existing);
        }
    });
    return existing;
}

export const filtersReducer = (state: FiltersState, action: any): FiltersState => {
    switch (action.type) {
        case "SET_OPTIONS": {
            const { taxonomy, option } = action.payload;
            const newState = JSON.parse(JSON.stringify(state));

            Object.keys(newState[taxonomy].options).forEach((optionKey:string) => newState[taxonomy].options[optionKey].selected = option.includes(optionKey))

            return newState;
        }
        case "TOGGLE": {
            const { taxonomy, option } = action.payload;
            if (typeof state[taxonomy].options[option].selected !== 'boolean') {
                return state;
            }
            const copyOfFilters = JSON.parse(JSON.stringify(state));
            copyOfFilters[taxonomy].options[option].selected = !state[taxonomy].options[option].selected;
            return copyOfFilters;
        }
        case "CLEAR_ALL": {
            const newFiltersState: FiltersState = {};

            Object.keys(state).forEach((filterKey) => {
                const thisFilter = state[filterKey];
                const { options } = { ...thisFilter };

                Object.keys(options).forEach((optionKey: string) => {
                    options[optionKey].selected = false;
                });

                newFiltersState[filterKey] = {
                    ...thisFilter,
                    options
                };
            });

            return newFiltersState;
        }
        case "CLEAR_SELECTED": {
            const taxonomy = action.payload;
            const { options } = state[taxonomy];
            Object.keys(options).forEach((optionKey: string) => {
                options[optionKey].selected = false;
            });

            return {
                ...state,
                [taxonomy]: {
                    ...state[taxonomy],
                    options
                }
            };
        }
        case "CLEAR_ALL_SELECTED": {
            return Object.fromEntries(
                Object.keys(state).map((taxonomy) => {
                    const { options } = state[taxonomy];
                    Object.keys(options).forEach((optionKey: string) => {
                        options[optionKey].selected = false;
                    });
                    return [taxonomy, { ...state[taxonomy], options }]
                })
            );
        }
        case "DISABLE_UNUSED": {
            const usedTaxonomies = getUsedTaxonomies(action.payload);

            const newFiltersState: FiltersState = {};

            Object.keys(state).forEach((filterKey) => {
                const thisFilter = state[filterKey];
                const { options } = { ...thisFilter };

                Object.keys(options).forEach((optionKey: string) => {
                    options[optionKey].disabled = !Boolean(usedTaxonomies[filterKey]?.has(optionKey));
                });
                newFiltersState[filterKey] = {
                    ...thisFilter,
                    options
                };
            });

            return newFiltersState;
        }
        case "SET": {
            return action.payload;
        }
        default:
            return state;
    }
}

export const FiltersContextProvider: FunctionComponent<{ release?: ReleaseNoteResponseModel }> = ({ release, children }) => {
    const [filters, dispatch] = useReducer(filtersReducer, {});

    const displayFilters = useMemo<boolean>(() => {
        if (Object.keys(filters).length < 1) {
            return false;
        }
        const indexOfFirstFilterWithOptions = Object.keys(filters).findIndex((key) => {
            const { options } = filters[key];
            return Object.keys(options).length > 0
        });
        return indexOfFirstFilterWithOptions !== -1;
    }, [filters]);

    const appContext = useContext(AppContext);

    useEffect(() => {
        if (!appContext.state.taxonomies) {
            return;
        }
        const { taxonomies } = appContext.state.taxonomies;
        const newFiltersState: FiltersState = {};

        taxonomies.forEach((taxonomy) => {
            newFiltersState[taxonomy.id] = {
                title: taxonomy.title,
                id: taxonomy.id,
                pills: Boolean(taxonomy.pills),
                options: {}
            };
            taxonomy.options.forEach((option) => {
                newFiltersState[taxonomy.id].options[option.id] = {
                    title: option.title,
                    id: option.id,
                    selected: false,
                    disabled: false
                }
            });
        })
        dispatch({ type: 'SET', payload: newFiltersState });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appContext.state.taxonomies, dispatch]);


    useEffect(() => {
        if (!release) {
            return;
        }
        dispatch({ type: 'DISABLE_UNUSED', payload: release.content_parts });
    }, [dispatch, release]);

    const toggleFilter = (taxonomy: string, option: string): void => {
        dispatch({ type: 'TOGGLE', payload: { taxonomy, option } });
    };

    const clearSelected = (taxonomy: string) => {
        if (!taxonomy) {
            dispatch({ type: 'CLEAR_ALL_SELECTED' });
        } else {
            dispatch({ type: 'CLEAR_SELECTED', payload: taxonomy });
        }
    };

    const clearAll = () => {
        dispatch({ type: 'CLEAR_ALL' });
    }

    const overwrite = (state: FiltersState) => {
        dispatch({ type: 'SET', payload: state });
    }

    const selected = useMemo(() => {
        const selected: { [key: string]: string[] } = {};
        Object.keys(filters)
            .forEach((key) => {
                const options = filters[key].options;
                const selectedOptions = Object.keys(options)
                    .map((key2) => options[key2])
                    .filter((option) => option && option.selected)
                    .map(({ id }) => id);

                if (selectedOptions.length > 0) {
                    selected[key] = selectedOptions;
                }
            });
        const length = Object.keys(selected).reduce((prev, current) => prev + selected[current].length, 0);
        const shouldCheckFilters = Object.keys(selected).filter(key => key !== '_type').length > 0;
        return { length, shouldCheckFilters, filters: selected };
    }, [filters]);

    return <FiltersContext.Provider value={{ filters, toggleFilter, selected, clearSelected, clearAll, displayFilters, overwrite }}>
        {children}
    </FiltersContext.Provider>;
}