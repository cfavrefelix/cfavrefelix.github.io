import Typography from "carbon-react/lib/components/typography";
import {FunctionComponent, useContext } from "react";
import { useLabels } from "../context/Labels.context";
import { SidebarContext } from "../context/Sidebar.context";
import { TaxonomySelector } from './TaxonomySelector';
import Sidebar from "carbon-react/lib/components/sidebar/sidebar.component";
import Box from "carbon-react/lib/components/box";
import IconButton from "carbon-react/lib/components/icon-button";
import Icon from "carbon-react/lib/components/icon";


export const FiltersSidebar: FunctionComponent = () => {
    const sidebarContext = useContext(SidebarContext);
    const t = useLabels();

    // @ts-ignore
    return <Sidebar
        open={sidebarContext.isOpen}
        header={<Box display="flex" justifyContent="space-between">
                    <Typography mb={0} fontSize="20px" lineHeight="1.25" fontWeight="700" as="h2">{t('titles.filters')}</Typography>
                    <IconButton onAction={() => sidebarContext.close()}
                                data-element="close">
                        <Icon type="close" />
                    </IconButton>
                </Box>}>
        <TaxonomySelector />
    </Sidebar>
}
