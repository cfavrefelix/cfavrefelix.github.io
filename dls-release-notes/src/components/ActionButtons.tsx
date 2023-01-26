import { FunctionComponent, useCallback, useContext, useMemo, useRef } from "react";
import Button from 'carbon-react/lib/components/button';
import { ButtonWithForwardRef } from 'carbon-react/lib/components/button/button.component';
import { useLabels } from "../context/Labels.context";
import { HideOnPrint } from '../styles/print';
import { SidebarContext } from "../context/Sidebar.context";
import { FiltersContext } from "../context/Filters.context";
import styled from "styled-components";

const ButtonWrap = styled(HideOnPrint)`
    display: flex;
    justify-content: flex-end;
    button {
        flex: 1;
    }
    @media screen and (max-width: 390px) {
        flex-direction: column;
        button ~ button {
            margin: .5rem 0 0!important;
        }
    }
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
        justify-content: flex-end;
        button {
            flex: 0 0 auto;
        }
    }
`


export const ActionButtons: FunctionComponent = () => {
    const sidebarContext = useContext(SidebarContext);
    const { filters } = useContext(FiltersContext);
    const filtersButtonRef = useRef<HTMLButtonElement | undefined>(undefined);

    const t = useLabels();

    const printScreen = useCallback((ev: any) => {
        (ev as MouseEvent).preventDefault();
        window.print();
    }, []);

    // Filtered the filters into just the selected ones
    const selectedFilters = useMemo(() => {
        let selected = 0;
        Object.keys(filters)
            .forEach((key) => {
                const options = filters[key].options;
                const selectedOptions = Object.keys(options)
                    .map((key2) => options[key2])
                    .filter((option) => option && option.selected)
                    .map(({ id }) => id);

                if (selectedOptions.length > 0) {
                    selected += selectedOptions.length;
                }
            });
        return selected;
    }, [filters]);

    const openSidebar = () => {
        sidebarContext.open(filtersButtonRef.current);
    };

    return <ButtonWrap>
        <Button noWrap buttonType="secondary" iconType="print" type="button" onClick={printScreen}>{t('buttons.print')}</Button>
        <ButtonWithForwardRef noWrap buttonType="primary" iconType="filter" onClick={openSidebar} ref={filtersButtonRef}>
            {t('buttons.filters')} {selectedFilters > 0 && `(${selectedFilters})`}
        </ButtonWithForwardRef>
    </ButtonWrap>;
}