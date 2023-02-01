import { createContext, FunctionComponent } from "react";
import { ReleaseNoteResponseModel } from '../models';

export const ReleaseContext = createContext<ReleaseNoteResponseModel | null>(null);

export const ReleaseContextProvider: FunctionComponent<{ release: ReleaseNoteResponseModel }> = ({ release, children }) => {
    return <ReleaseContext.Provider value={release}>{children}</ReleaseContext.Provider>
}