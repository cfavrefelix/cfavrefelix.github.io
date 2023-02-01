import {FunctionComponent, useMemo} from "react";
import styled from "styled-components";
import {OptionState} from "../context/Filters.context";
import {Checkbox} from "carbon-react/lib/components/checkbox";
import { MultiSelect, Option } from "carbon-react/lib/components/select";

const TaxonomyTitle = styled.legend`
    margin: 0 0 .5rem;
    font-size: var(--body-text-size, .875rem);
    font-weight: 600;
`;

const TaxonomyWrap = styled.fieldset`
    margin: 0 0 2rem;
    border: none;
    padding: 0;
`;

interface ComponentProps {
    title: string;
    options: { [option: string]: OptionState };
    selectOption: (optionId: string, actionType: 'SET_OPTIONS' | 'TOGGLE') => void;
    clearAll: () => void;
}

export const TaxonomyOptionSelector: FunctionComponent<ComponentProps> = ({ title, options, selectOption, clearAll }) => {
    const useDropdown = useMemo(() => Object.keys(options).length > 3, [options]);

    return <TaxonomyWrap>
        {useDropdown ?
            <>
                <TaxonomyTitle>{title}</TaxonomyTitle>
                <MultiSelect
                    onChange={(event) => selectOption(event.target.value, 'SET_OPTIONS')}
                    defaultValue={Object.values(options).filter(option => option.selected).map(option => option.id)}
                >
                    {Object.values(options).map(option => <Option key={option.id} text={option.title} value={option.id}/>)}
                </MultiSelect>
            </>
            :
            <>
                <TaxonomyTitle>{title}</TaxonomyTitle>
                {Object.values(options).map((option) => {
                    return <Checkbox
                        key={option.id}
                        value={option.id}
                        checked={option.selected}
                        label={option.title}
                        disabled={option.disabled}
                        onChange={(event) => selectOption(event.target.value, 'TOGGLE')}
                        mb="0.75rem"
                    />;
                })}
            </>
        }
    </TaxonomyWrap>;
}