import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const DefaultRoute: FunctionComponent = () => {
    const [shouldRedirect, setshouldRedirect] = useState(false);
    const { state, options } = useContext(AppContext);

    useEffect(() => {
        if (state.loading || !state.archive) {
            setshouldRedirect(true);
        }
    }, [state, setshouldRedirect])

    if (!shouldRedirect || !state.archive) {
        return null;
    }
    
    const language = state.archive.language;

    if (options.defaultToArchive) {
        return <Redirect to={`/archive/`} />;
    }

    const release = state.archive.releases[0].id;

    return <Redirect to={`/release/${language}/${release}`} />;
}