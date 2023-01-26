import { FunctionComponent } from "react";
import styled from "styled-components";

import Icon from 'carbon-react/lib/components/icon';
import IconButton from "carbon-react/lib/components/icon-button";

const MobileFiltersEle = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999999;
    background: var(--colorsUtilityMajor050);
`;

const ChildrenWrap = styled.div`
    padding: 0 1.5rem;
`;

export const MobileFilters: FunctionComponent<{ close: () => void }> = ({ close, children }) => {
    return <MobileFiltersEle>
        <IconButton onAction={() => close()}>
            <Icon type="close"/>
        </IconButton>
        <ChildrenWrap>
            {children}
        </ChildrenWrap>
    </MobileFiltersEle>
}