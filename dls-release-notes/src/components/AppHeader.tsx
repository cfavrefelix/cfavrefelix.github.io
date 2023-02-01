import { FunctionComponent, useContext } from "react";
import styled from 'styled-components';
import { AppContext } from "../context/AppContext";
import NavigationBar from "carbon-react/lib/components/navigation-bar";
import VerticalDivider from "carbon-react/lib/components/vertical-divider";

const AppHeaderImg = styled.img`
    margin-top: .2rem;
    height: 1.3rem;
    width: auto;
`;

const AppHeaderTitle = styled.span`
    font-weight: 700;
`;

export const AppHeader: FunctionComponent = () => {
    const { options } = useContext(AppContext);
    if (!options.showHeader) {
        return null;
    }
    return <NavigationBar navigationType="black" position="sticky" stickyPosition="top">
         <AppHeaderImg alt="Sage" src="/dls-release-notes/images/logo-image.svg"/>
        <VerticalDivider displayInline/>
        <AppHeaderTitle>{options.productName}</AppHeaderTitle>
    </NavigationBar>
}
