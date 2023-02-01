import Button from "carbon-react/lib/components/button";
import { FunctionComponent, useCallback, useContext, useEffect, useReducer } from "react";
import styled from "styled-components";
import { FiltersContext, filtersReducer } from "../context/Filters.context";
import { useLabels } from "../context/Labels.context";
import { SidebarContext } from "../context/Sidebar.context";
import { TaxonomyOptionSelector } from "./TaxonomyOptionSelector";

const ButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const TaxonomySelector: FunctionComponent = () => {
    const filtersContext = useContext(FiltersContext);
    const { close } = useContext(SidebarContext);

    const [state, dispatch] = useReducer(filtersReducer, {});

    const t = useLabels()

    useEffect(() => {
        // Copy filters to state
        dispatch({ type: 'SET', payload: filtersContext.filters });
    }, [filtersContext.filters, dispatch])

    const selectOption = useCallback(
        (key: string) => {
            return (option: string, type = 'TOGGLE') => {
                dispatch({ type, payload: { taxonomy: key, option: option } })
            }
        },
        [dispatch]
    );

    const clearAll = useCallback((id: string) => {
        dispatch({ type: 'CLEAR_SELECTED', payload: id });
    }, [dispatch]);

    const apply = () => {
        filtersContext.overwrite(state);
        close();
    }

    const reset = () => {
        filtersContext.clearAll();
        close();
    }

    return <>
        { Object.keys(state).map((key: string) => {
            const taxonomy = state[key];
            return <div key={taxonomy.id}>
                <TaxonomyOptionSelector
                    title={taxonomy.title}
                    options={taxonomy.options}
                    selectOption={selectOption(key)}
                    clearAll={() => clearAll(taxonomy.id)}
                />
            </div>
        })}

        <ButtonWrap>
            <Button buttonType="tertiary" onClick={reset}>{t('buttons.clear')}</Button>
            <Button buttonType="primary" onClick={apply}>{t('buttons.apply-filters')}</Button>
        </ButtonWrap>
    </>;
}