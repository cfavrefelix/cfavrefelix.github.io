import { FunctionComponent, useContext } from "react";
import { Helmet } from "react-helmet";
import { AppContext } from "../context/AppContext";

export const SetTitle: FunctionComponent<{ title: string }> = ({ title }) => {
    const { options } = useContext(AppContext);

    if (!options.setPageTitle) {
        return null;
    }

    return <Helmet>
        <title>{title}</title>
    </Helmet>
}