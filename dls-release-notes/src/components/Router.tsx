import { FunctionComponent } from "react";
import { HashRouter, MemoryRouter, BrowserRouter } from "react-router-dom";
import { RoutingStrategy } from "../models";

export const Router: FunctionComponent<{ router?: RoutingStrategy }> = ({ router, children }) => {
    switch (router) {
        case 'memory':
            return <MemoryRouter>{children}</MemoryRouter>;
        case 'browser':
            return <BrowserRouter>{children}</BrowserRouter>;
        case 'hash':
        default:
            return <HashRouter>{children}</HashRouter>;
    }
}