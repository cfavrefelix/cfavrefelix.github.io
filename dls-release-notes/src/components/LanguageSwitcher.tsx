import { FunctionComponent, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const LanguageSwitcher: FunctionComponent = () => {
    const appContext = useContext(AppContext);
    const { language } = useParams<{ language: string, version: string }>();

    useEffect(() => {
        appContext.actions?.switchLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    return null;
}