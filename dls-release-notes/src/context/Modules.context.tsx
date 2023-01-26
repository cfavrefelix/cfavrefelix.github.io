import { createContext, FunctionComponent, useContext, useMemo, useReducer } from "react";
import { AppContext } from "./AppContext";

export const ModuleContext = createContext<ModuleContextModel>({
    modules: [],
    addModule: () => { },
    clearModules: () => { },
    displayAnchorNav: true
});

interface ModuleContextModel {
    modules: ModuleModel[];
    addModule: (thisModule: ModuleModel) => void;
    clearModules: () => void;
    displayAnchorNav: boolean;
}

export interface ModuleModel {
    title: string;
    id: string;
    ref: React.MutableRefObject<HTMLElement | null>;
}

const reducer = (state: ModuleModel[], action: any): ModuleModel[] => {
    switch (action.type) {
        case 'ADD':
            // Replace any duplicates
            const duplicate = state.findIndex((item) => item.id === action.payload.id);
            if (duplicate > -1) {
                // Replace existing if already exists
                state[duplicate] = action.payload;
                return state;
            }
            return [
                ...state,
                action.payload
            ];
        case 'CLEAR':
            return [];
        default:
            return state;
    }
}

export const ModuleContextProvider: FunctionComponent = ({ children }) => {
    const [modules, dispatch] = useReducer(reducer, []);

    const { options } = useContext(AppContext);

    const displayAnchorNav = useMemo<boolean>(() => {
        if (options.alwaysDisplayAnchorNav) {
            return true;
        }
        if (modules.length > 1) {
            return true;
        }
        return false;
    }, [options, modules]);

    const addModule = useMemo(() => (thisModule: ModuleModel) => {
        dispatch({
            type: 'ADD',
            payload: thisModule
        });
    }, [dispatch]);

    const clearModules = useMemo(() => () => {
        dispatch({ type: 'CLEAR' });
    }, [dispatch]);

    return <ModuleContext.Provider value={{ modules, addModule, clearModules, displayAnchorNav }}>
        {children}
    </ModuleContext.Provider>
}